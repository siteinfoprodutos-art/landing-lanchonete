import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, MessageCircle, ShoppingBag } from 'lucide-react';
import type { HeroCfg, SiteConfig } from '../types';
import { BrandLogo } from './BrandLogo';

interface HeroScrollCanvasProps {
  site: SiteConfig;
  cfg: HeroCfg;
  onOrderClick: () => void;
}

type Mode = 'desktop' | 'mobile';

interface DebugInfo {
  mode: Mode;
  dir: string;
  fallbackActive: boolean;
  frameIndex: number;
  totalFrames: number;
  progress: number;
  loaded: number;
  errors: number;
}

function getFrameUrl(dir: string, oneBasedIndex: number): string {
  const padded = String(oneBasedIndex).padStart(3, '0');
  const cleanDir = dir.endsWith('/') ? dir : `${dir}/`;
  return `${cleanDir}frame_${padded}.webp`;
}

function loadSingleImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

function samplePixel4x4(img: HTMLImageElement): string | null {
  try {
    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = 8;
    sampleCanvas.height = 8;
    const sctx = sampleCanvas.getContext('2d', { willReadFrequently: true });
    if (!sctx) return null;
    sctx.drawImage(img, 0, 0);
    const data = sctx.getImageData(4, 4, 1, 1).data;
    if (data[3] === 0) return null;
    return `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
  } catch {
    return null;
  }
}

const MOBILE_MEDIA_QUERY = '(max-width: 639px) and (orientation: portrait)';

export function HeroScrollCanvas({ site, cfg, onOrderClick }: HeroScrollCanvasProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const topBandRef = useRef<HTMLDivElement>(null);
  const bottomBandRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window !== 'undefined' && window.matchMedia(MOBILE_MEDIA_QUERY).matches) {
      return 'mobile';
    }
    return 'desktop';
  });

  const [heroBgColor, setHeroBgColor] = useState<string>('#FFF4E6');
  const [ready, setReady] = useState(false);
  const [loadPct, setLoadPct] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState<0 | 1 | 2 | 3>(0);

  const isDebug = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('debug') === '1';
  }, []);

  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    mode: 'desktop',
    dir: cfg.desktop.dir,
    fallbackActive: false,
    frameIndex: 1,
    totalFrames: cfg.desktop.total,
    progress: 0,
    loaded: 0,
    errors: 0,
  });

  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const totalRef = useRef<number>(cfg.desktop.total);
  const activeDrawModeRef = useRef<'fit-box' | 'fit-tall'>(
    mode === 'mobile' ? cfg.mobile.mode : cfg.desktop.mode
  );
  const [activeDrawMode, setActiveDrawMode] = useState<'fit-box' | 'fit-tall'>(
    mode === 'mobile' ? cfg.mobile.mode : cfg.desktop.mode
  );
  const currentFrameRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);
  const smoothProgressRef = useRef<number>(0);
  const lastUiProgressRef = useRef<number>(-1);
  const lastStageRef = useRef<0 | 1 | 2 | 3>(0);

  // Listen to mobile portrait matchMedia changes cleanly
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_MEDIA_QUERY);
    const updateMode = () => {
      setMode(mql.matches ? 'mobile' : 'desktop');
    };
    updateMode();
    mql.addEventListener('change', updateMode);
    return () => mql.removeEventListener('change', updateMode);
  }, []);

  // Draw a given image in "fit-box" (desktop) or "fit-tall" (mobile 9:16) mode with single uniform scale
  const drawFrame = useCallback((img: HTMLImageElement | null) => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage || !img || !img.naturalWidth) return;

    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (cw === 0 || ch === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(cw * dpr);
    const targetH = Math.round(ch * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, ch);

    if (activeDrawModeRef.current === 'fit-tall') {
      // Mobile (9:16): altura igual a 78% do stage, alinhado logo abaixo do header e centralizado
      const stageH = stage.clientHeight || ch;
      const targetTallH = stageH * 0.78;
      const scale = Math.min(targetTallH / img.naturalHeight, cw / img.naturalWidth);
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      const drawX = (cw - drawW) / 2;
      const drawY = 0;
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    } else {
      // Desktop ("fit-box"): largura máxima 92%, área vertical entre 24% (ou logo abaixo do título) e 96%
      const boxW = cw * 0.92;
      const topRect = topBandRef.current?.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const titleBottomInStage = topRect ? topRect.bottom - stageRect.top + 8 : 0;
      const boxTop = Math.max(ch * 0.24, Math.min(ch * 0.42, titleBottomInStage));
      const boxBottom = ch * 0.96;
      const boxH = Math.max(120, boxBottom - boxTop);
      const scale = Math.min(boxW / img.naturalWidth, boxH / img.naturalHeight);
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      const drawX = (cw - drawW) / 2;
      const drawY = boxTop + (boxH - drawH) / 2;
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }
  }, []);

  // Preload active sequence with Promise.allSettled, 90% or 8s unlock, and draw frame 1 immediately
  useEffect(() => {
    let cancelled = false;
    setReady(false);
    setLoadPct(0);

    const activeSeq = mode === 'mobile' ? cfg.mobile : cfg.desktop;

    const runLoad = async () => {
      let chosenDir = activeSeq.dir;
      let chosenTotal = activeSeq.total;
      let chosenMode = activeSeq.mode;
      let fallbackActive = false;

      // Probe frame 1; if mobile folder isn't populated, seamlessly fall back to desktop frames
      let firstImg: HTMLImageElement | null = null;
      try {
        firstImg = await loadSingleImage(getFrameUrl(chosenDir, 1));
      } catch {
        if (mode === 'mobile' && chosenDir !== cfg.desktop.dir) {
          fallbackActive = true;
          chosenDir = cfg.desktop.dir;
          chosenTotal = cfg.desktop.total;
          chosenMode = cfg.desktop.mode;
          try {
            firstImg = await loadSingleImage(getFrameUrl(chosenDir, 1));
          } catch {
            firstImg = null;
          }
        }
      }

      if (cancelled) return;

      totalRef.current = chosenTotal;
      activeDrawModeRef.current = chosenMode;
      setActiveDrawMode(chosenMode);
      const frameList: (HTMLImageElement | null)[] = new Array(chosenTotal).fill(null);
      framesRef.current = frameList;

      let loadedCount = 0;
      let errorCount = 0;

      if (firstImg) {
        const sampled = samplePixel4x4(firstImg);
        if (sampled) {
          setHeroBgColor(sampled);
        }
        frameList[0] = firstImg;
        loadedCount = 1;
        setLoadPct(Math.round((loadedCount / chosenTotal) * 100));
        window.requestAnimationFrame(() => {
          if (!cancelled) drawFrame(firstImg);
        });
      } else {
        errorCount = 1;
      }

      if (isDebug) {
        setDebugInfo((prev) => ({
          ...prev,
          mode,
          dir: chosenDir,
          fallbackActive,
          totalFrames: chosenTotal,
          loaded: loadedCount,
          errors: errorCount,
        }));
      }

      const timeoutId = window.setTimeout(() => {
        if (!cancelled) setReady(true);
      }, 8000);

      const tasks: Promise<void>[] = [];
      for (let i = 2; i <= chosenTotal; i++) {
        const idx = i - 1;
        const url = getFrameUrl(chosenDir, i);
        tasks.push(
          loadSingleImage(url)
            .then((img) => {
              if (cancelled) return;
              frameList[idx] = img;
              loadedCount += 1;
            })
            .catch(() => {
              if (cancelled) return;
              errorCount += 1;
            })
            .finally(() => {
              if (cancelled) return;
              const pct = Math.round(((loadedCount + errorCount) / chosenTotal) * 100);
              setLoadPct(pct);
              if (loadedCount / chosenTotal >= 0.9) {
                setReady(true);
              }
              if (isDebug) {
                setDebugInfo((prev) => ({
                  ...prev,
                  loaded: loadedCount,
                  errors: errorCount,
                }));
              }
            })
        );
      }

      await Promise.allSettled(tasks);
      window.clearTimeout(timeoutId);
      if (!cancelled) {
        setReady(true);
        const currentIdx = Math.min(
          chosenTotal - 1,
          Math.max(0, Math.round(smoothProgressRef.current * (chosenTotal - 1)))
        );
        const targetImg = frameList[currentIdx] || frameList.find(Boolean) || null;
        drawFrame(targetImg);
      }
    };

    runLoad();

    return () => {
      cancelled = true;
    };
  }, [mode, cfg.desktop, cfg.mobile, drawFrame, isDebug]);

  // Handle resize redraw
  useEffect(() => {
    const onResize = () => {
      const idx = currentFrameRef.current;
      const img = framesRef.current[idx] || framesRef.current.find(Boolean) || null;
      drawFrame(img);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, [drawFrame]);

  // Redraw when draw mode or stage layout settles
  useEffect(() => {
    const idx = currentFrameRef.current;
    const img = framesRef.current[idx] || framesRef.current.find(Boolean) || null;
    if (img) {
      window.requestAnimationFrame(() => drawFrame(img));
    }
  }, [activeDrawMode, drawFrame]);

  // Scroll + requestAnimationFrame lerp loop (0.12), redrawing only when frame index changes
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;

    const computeScrollTarget = () => {
      const hero = heroRef.current;
      if (!hero) return 0;
      const rect = hero.getBoundingClientRect();
      const maxScroll = Math.max(1, hero.offsetHeight - window.innerHeight);
      return Math.max(0, Math.min(1, -rect.top / maxScroll));
    };

    const tick = () => {
      targetProgressRef.current = computeScrollTarget();
      const diff = targetProgressRef.current - smoothProgressRef.current;

      if (prefersReduced || Math.abs(diff) < 0.0005) {
        smoothProgressRef.current = targetProgressRef.current;
      } else {
        smoothProgressRef.current += diff * 0.12;
      }

      const p = smoothProgressRef.current;
      const total = totalRef.current || 1;
      const nextFrameIdx = Math.min(total - 1, Math.max(0, Math.round(p * (total - 1))));

      if (nextFrameIdx !== currentFrameRef.current) {
        currentFrameRef.current = nextFrameIdx;
        // Find exact loaded frame or closest available loaded frame
        let img = framesRef.current[nextFrameIdx];
        if (!img) {
          for (let offset = 1; offset < total; offset++) {
            if (nextFrameIdx - offset >= 0 && framesRef.current[nextFrameIdx - offset]) {
              img = framesRef.current[nextFrameIdx - offset];
              break;
            }
            if (nextFrameIdx + offset < total && framesRef.current[nextFrameIdx + offset]) {
              img = framesRef.current[nextFrameIdx + offset];
              break;
            }
          }
        }
        drawFrame(img);
      }

      const nextStage: 0 | 1 | 2 | 3 =
        p < 0.25 ? 0 : p < 0.5 ? 1 : p < 0.75 ? 2 : 3;

      if (nextStage !== lastStageRef.current) {
        lastStageRef.current = nextStage;
        setActiveStage(nextStage);
      }

      if (Math.abs(p - lastUiProgressRef.current) >= 0.004) {
        lastUiProgressRef.current = p;
        setScrollProgress(p);
        if (isDebug) {
          setDebugInfo((prev) => ({
            ...prev,
            frameIndex: nextFrameIdx + 1,
            progress: p,
          }));
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [drawFrame, isDebug]);

  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `Olá! Vim pelo site da ${site.nome} e gostaria de fazer um pedido.`
  )}`;

  const hasIfoodLink = site.ifood && site.ifood !== '#';
  const endFadeOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.9) / 0.1));

  return (
    <section
      id="inicio"
      ref={heroRef}
      data-bg-theme={heroBgColor}
      aria-label="Apresentação da lanchonete"
      className="relative h-[500vh]"
      style={{ backgroundColor: heroBgColor }}
    >
      {/* Sticky Stage — 100svh, zero overflow/transform/filter on ancestors */}
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] w-full flex flex-col justify-between select-none"
        style={{ backgroundColor: heroBgColor }}
      >
        {/* Subtle warm sunlight radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_54%,rgba(247,148,29,0.12),transparent_58%)]"
        />

        {/* Thin orange progress bar */}
        <div
          aria-hidden="true"
          className="absolute top-14 md:top-[72px] inset-x-0 h-[3px] bg-[#1C2B39]/10 z-30"
        >
          <div
            className="h-full bg-[#F7941D] origin-left will-change-transform transition-transform duration-75"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>

        {/* Canvas Layer (desktop: full stage fit-box; mobile: 78% height below header fit-tall) */}
        <canvas
          ref={canvasRef}
          aria-label="Animação de lanche artesanal, pastel crocante e sorvete"
          className={`pointer-events-none z-10 w-full ${
            activeDrawMode === 'fit-tall'
              ? 'hero-canvas-mask-mobile absolute inset-x-0 top-14 h-[78%]'
              : 'hero-canvas-mask absolute inset-0 h-full'
          }`}
        />

        {/* Smooth fade to cream in the final 10% of hero scroll */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#FFF4E6] z-[25] motion-reduce:hidden"
          style={{ opacity: endFadeOpacity }}
        />

        {/* DESKTOP ONLY: Upper Title Band */}
        {activeDrawMode !== 'fit-tall' && (
          <div
            ref={topBandRef}
            className="relative z-20 pt-16 md:pt-[84px] px-5 sm:px-10 lg:px-16 max-w-[1200px] w-full mx-auto text-left pointer-events-none"
          >
            <div className="relative min-h-[88px] md:min-h-[116px] flex flex-col justify-start">
            {/* Stage 0: 0 - 25% */}
            <div
              aria-hidden={activeStage !== 0}
              className={`transition-all duration-350 ease-out motion-reduce:transition-none ${
                activeStage === 0
                  ? 'opacity-100 translate-y-0 blur-0'
                  : 'opacity-0 -translate-y-3 blur-[4px] pointer-events-none absolute inset-x-0 top-0'
              }`}
            >
              <h1 className="font-display uppercase leading-[0.95] tracking-wide text-[#1C2B39] text-[clamp(2.3rem,5.2vw,4.25rem)] text-balance">
                SABOR QUE <span className="text-[#F7941D]">FAZ A DIFERENÇA.</span>
              </h1>
              <p className="mt-1.5 text-sm md:text-base text-[#1C2B39]/80 font-medium max-w-xl">
                {site.slogan} — lanches artesanais, pastéis crocantes e sorvetes geladinhos em{' '}
                {site.cidade}.
              </p>
            </div>

            {/* Stage 1: 25 - 50% */}
            <div
              aria-hidden={activeStage !== 1}
              className={`transition-all duration-350 ease-out motion-reduce:transition-none ${
                activeStage === 1
                  ? 'opacity-100 translate-y-0 blur-0'
                  : 'opacity-0 translate-y-3 blur-[4px] pointer-events-none absolute inset-x-0 top-0'
              }`}
            >
              <h2 className="font-display uppercase leading-[0.95] tracking-wide text-[#1C2B39] text-[clamp(2.25rem,5vw,4rem)] text-balance">
                PASTÉIS GRANDES <span className="text-[#F7941D]">E CROCANTES</span>
              </h2>
              <p className="mt-1.5 text-sm md:text-base text-[#1C2B39]/80 font-medium max-w-xl">
                Massa sequinha frita na hora e recheio generoso de ponta a ponta.
              </p>
            </div>

            {/* Stage 2: 50 - 75% */}
            <div
              aria-hidden={activeStage !== 2}
              className={`transition-all duration-350 ease-out motion-reduce:transition-none ${
                activeStage === 2
                  ? 'opacity-100 translate-y-0 blur-0'
                  : 'opacity-0 translate-y-3 blur-[4px] pointer-events-none absolute inset-x-0 top-0'
              }`}
            >
              <h2 className="font-display uppercase leading-[0.95] tracking-wide text-[#1C2B39] text-[clamp(2.25rem,5vw,4rem)] text-balance">
                LANCHES <span className="text-[#F7941D]">ARTESANAIS</span>
              </h2>
              <p className="mt-1.5 text-sm md:text-base text-[#1C2B39]/80 font-medium max-w-xl">
                Blend suculento selado na chapa, queijo derretido e pão brioche macio.
              </p>
            </div>

            {/* Stage 3: 75 - 100% */}
            <div
              aria-hidden={activeStage !== 3}
              className={`transition-all duration-350 ease-out motion-reduce:transition-none ${
                activeStage === 3
                  ? 'opacity-100 translate-y-0 blur-0'
                  : 'opacity-0 translate-y-3 blur-[4px] pointer-events-none absolute inset-x-0 top-0'
              }`}
            >
              <div className="flex flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="font-display uppercase leading-[0.95] tracking-wide text-[#1C2B39] text-[clamp(2.25rem,5vw,4rem)] text-balance">
                    SORVETES <span className="text-[#F7941D]">GELADINHOS</span>
                  </h2>
                  <p className="mt-1.5 text-sm md:text-base text-[#1C2B39]/80 font-medium">
                    Casquinhas trufadas e taças cremosas para fechar o pedido.
                  </p>
                </div>

                {/* Desktop CTAs at 75-100% */}
                <div
                  className={`flex items-center gap-3 ${
                    activeStage === 3 ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                >
                  {hasIfoodLink ? (
                    <a
                      href={site.ifood}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F7941D] hover:bg-[#E8740C] text-white font-semibold text-sm shadow-warm transition-all duration-150 active:scale-[0.98] whitespace-nowrap"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Pedir no iFood
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={onOrderClick}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F7941D] hover:bg-[#E8740C] text-white font-semibold text-sm shadow-warm transition-all duration-150 active:scale-[0.98] whitespace-nowrap cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Pedir no iFood
                    </button>
                  )}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1C2B39] hover:bg-[#293d50] text-white font-semibold text-sm shadow-sm transition-all duration-150 active:scale-[0.98] whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-[#FFC93C]" />
                    Falar no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
          </div>
        )}

        {/* DESKTOP ONLY: Bottom Scroll Indicator */}
        {activeDrawMode !== 'fit-tall' && (
          <div
            ref={bottomBandRef}
            className="relative z-20 pb-[68px] md:pb-6 px-5 sm:px-10 lg:px-16 max-w-[1200px] w-full mx-auto flex flex-col items-center justify-end"
          >
            <div
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-sm border border-[#1C2B39]/10 text-xs font-medium text-[#1C2B39] shadow-sm transition-all duration-300 pointer-events-none ${
                scrollProgress > 0.05 ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              <span>Role para explorar</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#F7941D] animate-bounce motion-reduce:animate-none" />
            </div>
          </div>
        )}

        {/* MOBILE ONLY: Scroll indicator floating cleanly above the 22% bottom panel */}
        {activeDrawMode === 'fit-tall' && (
          <div
            className={`absolute bottom-[calc(22%+8px)] left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-sm border border-[#1C2B39]/10 text-xs font-medium text-[#1C2B39] shadow-sm transition-all duration-300 pointer-events-none whitespace-nowrap ${
              scrollProgress > 0.05 ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}
          >
            <span>Role para explorar</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#F7941D] animate-bounce motion-reduce:animate-none" />
          </div>
        )}

        {/* MOBILE ONLY: Bottom 22% translucent cream blurred text panel (no text over food) */}
        {activeDrawMode === 'fit-tall' && (
          <div className="absolute inset-x-0 bottom-0 h-[22%] min-h-[158px] z-20 flex flex-col justify-end pointer-events-none">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-t-[26px] hero-mobile-panel-bg"
            />

            <div className="relative z-10 px-5 pr-[76px] pb-[64px] pt-4">
              <div
                key={activeStage}
                className="animate-hero-stage-in motion-reduce:animate-none"
              >
                {activeStage === 0 && (
                  <>
                    <h1 className="font-display uppercase leading-[0.96] tracking-wide text-[#1C2B39] text-[clamp(1.4rem,5.4vw,1.85rem)]">
                      SABOR QUE <span className="text-[#F7941D]">FAZ A DIFERENÇA.</span>
                    </h1>
                    <p className="mt-1 text-xs font-medium text-[#1C2B39]/85 leading-snug">
                      {site.slogan}
                    </p>
                  </>
                )}

                {activeStage === 1 && (
                  <>
                    <h2 className="font-display uppercase leading-[0.96] tracking-wide text-[#1C2B39] text-[clamp(1.4rem,5.4vw,1.85rem)]">
                      PASTÉIS GRANDES <span className="text-[#F7941D]">E CROCANTES</span>
                    </h2>
                    <p className="mt-1 text-xs font-medium text-[#1C2B39]/85 leading-snug">
                      Massa sequinha e crocante frita na hora.
                    </p>
                  </>
                )}

                {activeStage === 2 && (
                  <>
                    <h2 className="font-display uppercase leading-[0.96] tracking-wide text-[#1C2B39] text-[clamp(1.4rem,5.4vw,1.85rem)]">
                      LANCHES <span className="text-[#F7941D]">ARTESANAIS</span>
                    </h2>
                    <p className="mt-1 text-xs font-medium text-[#1C2B39]/85 leading-snug">
                      Blend suculento na chapa, queijo derretido e pão brioche.
                    </p>
                  </>
                )}

                {activeStage === 3 && (
                  <>
                    <h2 className="font-display uppercase leading-[0.96] tracking-wide text-[#1C2B39] text-[clamp(1.35rem,5.2vw,1.75rem)]">
                      SORVETES <span className="text-[#F7941D]">GELADINHOS</span>
                    </h2>
                    <div className="mt-2 flex items-center gap-2 pointer-events-auto">
                      {hasIfoodLink ? (
                        <a
                          href={site.ifood}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#F7941D] hover:bg-[#E8740C] text-white font-semibold text-[11px] sm:text-xs shadow-warm whitespace-nowrap min-h-[38px]"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Pedir no iFood
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={onOrderClick}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#F7941D] hover:bg-[#E8740C] text-white font-semibold text-[11px] sm:text-xs shadow-warm whitespace-nowrap min-h-[38px] cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Pedir no iFood
                        </button>
                      )}
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#1C2B39] hover:bg-[#293d50] text-white font-semibold text-[11px] sm:text-xs shadow-sm whitespace-nowrap min-h-[38px]"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#FFC93C]" />
                        Falar no WhatsApp
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Preloader overlay with orange progress bar (releases at 90% or 8s) */}
        {!ready && (
          <div
            role="status"
            aria-live="polite"
            className="absolute inset-0 z-30 backdrop-blur-sm flex flex-col items-center justify-center px-6"
            style={{ backgroundColor: heroBgColor }}
          >
            <BrandLogo site={site} size="lg" />
            <p className="mt-4 text-sm font-medium text-[#1C2B39]/75">
              Preparando a chapa e os ingredientes... {loadPct}%
            </p>
            <div className="mt-3 w-56 h-2 rounded-full bg-[#1C2B39]/10 overflow-hidden">
              <div
                className="h-full bg-[#F7941D] rounded-full transition-all duration-150"
                style={{ width: `${Math.max(8, loadPct)}%` }}
              />
            </div>
          </div>
        )}

        {/* Debug panel when ?debug=1 */}
        {isDebug && (
          <div className="fixed top-20 right-4 z-50 rounded-xl bg-[#1C2B39]/92 text-white p-3.5 text-xs font-mono tabular-nums shadow-warm-lg border border-white/15 max-w-[260px]">
            <div className="font-bold text-[#FFC93C] mb-1.5">HERO DEBUG (?debug=1)</div>
            <div>modo: {debugInfo.mode}</div>
            <div>
              pasta: {debugInfo.dir}
              {debugInfo.fallbackActive ? ' (fallback)' : ''}
            </div>
            <div>
              frame: {debugInfo.frameIndex} / {debugInfo.totalFrames}
            </div>
            <div>progresso: {(debugInfo.progress * 100).toFixed(1)}%</div>
            <div>
              carregados: {debugInfo.loaded} / {debugInfo.totalFrames}
            </div>
            <div>erros: {debugInfo.errors}</div>
          </div>
        )}
      </div>
    </section>
  );
}
