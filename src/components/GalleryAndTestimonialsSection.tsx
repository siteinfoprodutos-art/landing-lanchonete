import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, X, ZoomIn } from 'lucide-react';
import { DEPOIMENTOS, GALERIA_FOTOS } from '../data/menuData';
import type { SiteConfig } from '../types';
import {
  PaintSplash,
  ParallaxLayer,
  SectionTransition,
  SyrupDrops,
} from './ParallaxLayer';
import { Reveal } from './Reveal';

interface GalleryAndTestimonialsSectionProps {
  site: SiteConfig;
}

export function GalleryAndTestimonialsSection({ site }: GalleryAndTestimonialsSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % GALERIA_FOTOS.length
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + GALERIA_FOTOS.length) % GALERIA_FOTOS.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex]);

  const activePhoto = selectedIndex !== null ? GALERIA_FOTOS[selectedIndex] : null;

  return (
    <div className="relative overflow-x-clip">
      {/* Smooth 120px divider White -> Cream + parallax */}
      <div className="relative z-20">
        <SectionTransition fromColor="#FFFFFF" toColor="#FFF4E6" variant="torn" />
        <ParallaxLayer
          speed={0.15}
          className="pointer-events-none absolute -top-12 left-6 sm:left-16 w-24 sm:w-32 z-20"
        >
          <SyrupDrops className="w-full h-auto" />
        </ParallaxLayer>
      </div>

      {/* Section 7: Galeria (2 fotos de cada categoria) */}
      <section
        id="galeria"
        data-bg-theme="#FFF4E6"
        className="relative section-overlap bg-[#FFF4E6] py-24 md:py-[140px]"
      >
        <ParallaxLayer
          speed={-0.1}
          className="pointer-events-none absolute -right-20 top-20 w-72 opacity-[0.1]"
        >
          <PaintSplash className="w-full h-auto" />
        </ParallaxLayer>

        <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12">
              <div>
                <p className="font-hand text-2xl text-[#F7941D] leading-none">
                  Lanches, pastéis e sorvetes de perto
                </p>
                <h2 className="mt-2 font-display uppercase text-[clamp(2rem,4vw,3.1rem)] leading-none text-[#1C2B39]">
                  GALERIA DE <span className="text-[#F7941D]">SABORES</span>
                </h2>
              </div>
              <p className="text-sm text-[#1C2B39]/75">
                Toque em qualquer foto para ampliar e conferir os detalhes.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {GALERIA_FOTOS.map((foto, idx) => (
              <Reveal key={foto.id} delayMs={idx * 90}>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  aria-label={`Ampliar foto: ${foto.titulo}`}
                  className="group relative w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-white shadow-warm cursor-pointer text-left transition-transform duration-200 hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7941D]"
                >
                  <img
                    src={foto.imagem}
                    alt={foto.titulo}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C2B39]/80 via-[#1C2B39]/15 to-transparent opacity-85 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3.5 sm:p-5">
                    <span className="self-end w-9 h-9 rounded-full bg-white/90 text-[#1C2B39] flex items-center justify-center shadow-sm">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#FFC93C]">
                        {foto.categoria}
                      </span>
                      <p className="text-sm sm:text-base font-bold text-white leading-snug">
                        {foto.titulo}
                      </p>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Smooth 120px divider Cream -> White */}
      <SectionTransition fromColor="#FFF4E6" toColor="#FFFFFF" variant="wave" />

      {/* Section 8: Depoimentos (1 de pastel, 1 de lanche, 1 de sorvete) */}
      <section
        data-bg-theme="#FFF4E6"
        className="relative section-overlap bg-white py-24 md:py-[140px]"
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="font-hand text-2xl text-[#F7941D] leading-none">
                Quem prova recomenda
              </p>
              <h2 className="mt-2 font-display uppercase text-[clamp(2rem,4vw,3.1rem)] leading-none text-[#1C2B39]">
                CLIENTES <span className="text-[#F7941D]">SATISFEITOS</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#1C2B39]/75">
                Avaliações reais de quem pede lanches, pastéis e sorvetes toda semana em {site.cidade}.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {DEPOIMENTOS.map((dep, idx) => (
              <Reveal key={dep.id} delayMs={idx * 90}>
                <article className="h-full rounded-[20px] bg-[#FFF4E6]/80 border border-[#1C2B39]/8 p-7 shadow-warm flex flex-col justify-between gap-6 transition-transform duration-200 hover:-translate-y-1.5">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div
                        className="flex items-center gap-1 text-[#FFC93C]"
                        aria-label={`${dep.estrelas} de 5 estrelas`}
                      >
                        {Array.from({ length: dep.estrelas }).map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#FFC93C] text-[#FFC93C]" />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#F7941D]">
                        {dep.produto}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-[#1C2B39]/85 leading-relaxed">
                      “{dep.comentario}”
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1C2B39]/10">
                    <div className="font-bold text-sm text-[#1C2B39]">{dep.nome}</div>
                    <div className="text-xs text-[#1C2B39]/65">
                      {dep.bairro} · {site.cidade}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Gallery Zoom */}
      {activePhoto && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.titulo}
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-50 bg-[#1C2B39]/88 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full rounded-[24px] bg-[#FFF4E6] p-3 sm:p-4 shadow-warm-lg"
          >
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Fechar ampliação"
              className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-[#1C2B39] text-white hover:bg-[#F7941D] flex items-center justify-center shadow-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white">
              <img
                src={activePhoto.imagem}
                alt={activePhoto.titulo}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="pt-3 px-2 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#F7941D]">
                  {activePhoto.categoria}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#1C2B39]">
                  {activePhoto.titulo}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex(
                      (selectedIndex - 1 + GALERIA_FOTOS.length) % GALERIA_FOTOS.length
                    )
                  }
                  aria-label="Foto anterior"
                  className="w-11 h-11 rounded-full bg-white border border-[#1C2B39]/15 text-[#1C2B39] hover:bg-[#F7941D] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex((selectedIndex + 1) % GALERIA_FOTOS.length)
                  }
                  aria-label="Próxima foto"
                  className="w-11 h-11 rounded-full bg-white border border-[#1C2B39]/15 text-[#1C2B39] hover:bg-[#F7941D] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
