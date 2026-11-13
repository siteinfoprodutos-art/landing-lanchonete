import { useEffect, useRef, type ReactNode } from 'react';

interface ParallaxLayerProps {
  speed?: number;
  className?: string;
  children: ReactNode;
}

export function ParallaxLayer({ speed = 0.08, className = '', children }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) {
      el.style.transform = 'none';
      return;
    }

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      const translateY = Math.max(-72, Math.min(72, -centerOffset * speed));
      el.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform motion-reduce:!transform-none ${className}`}>
      {children}
    </div>
  );
}

export function PaintSplash({ className = '', color = '#F7941D' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 320 220" fill="none" aria-hidden="true" className={className}>
      <path
        d="M36 92C28 58 68 24 128 28C188 32 232 14 274 44C316 74 298 134 268 164C238 194 176 206 120 188C64 170 44 126 36 92Z"
        fill={color}
      />
      <circle cx="294" cy="36" r="10" fill="#FFC93C" />
      <circle cx="22" cy="148" r="7" fill={color} />
      <circle cx="272" cy="192" r="5" fill={color} />
    </svg>
  );
}

export function PastryCrumbs({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 180" fill="none" aria-hidden="true" className={className}>
      <path
        d="M34 48L58 36L64 62L38 68L34 48Z"
        fill="#F7941D"
        opacity="0.72"
      />
      <path
        d="M128 22L150 30L142 52L118 42L128 22Z"
        fill="#E8740C"
        opacity="0.58"
      />
      <path
        d="M84 96L108 84L114 110L86 116L84 96Z"
        fill="#FFC93C"
        opacity="0.85"
      />
      <path
        d="M166 114L192 106L186 132L160 130L166 114Z"
        fill="#F7941D"
        opacity="0.65"
      />
      <circle cx="52" cy="134" r="7" fill="#E8740C" opacity="0.5" />
      <circle cx="144" cy="82" r="5" fill="#F7941D" opacity="0.6" />
      <circle cx="96" cy="46" r="4" fill="#FFC93C" opacity="0.7" />
    </svg>
  );
}

export function SyrupDrops({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 220" fill="none" aria-hidden="true" className={className}>
      <path
        d="M44 26C44 26 70 64 70 86C70 100.359 58.3594 112 44 112C29.6406 112 18 100.359 18 86C18 64 44 26 44 26Z"
        fill="#F7941D"
        opacity="0.75"
      />
      <path
        d="M128 54C128 54 150 86 150 104C150 116.15 140.15 126 128 126C115.85 126 106 116.15 106 104C106 86 128 54 128 54Z"
        fill="#FFC93C"
        opacity="0.82"
      />
      <path
        d="M82 128C82 128 98 152 98 166C98 174.837 90.8366 182 82 182C73.1634 182 66 174.837 66 166C66 152 82 128 82 128Z"
        fill="#F7941D"
        opacity="0.65"
      />
      <circle cx="122" cy="176" r="7" fill="#FFC93C" opacity="0.7" />
    </svg>
  );
}

interface SectionTransitionProps {
  fromColor: string;
  toColor: string;
  variant?: 'wave' | 'torn' | 'diagonal';
}

export function SectionTransition({
  fromColor,
  toColor,
  variant = 'wave',
}: SectionTransitionProps) {
  return (
    <div
      aria-hidden="true"
      className="relative w-full h-[120px] pointer-events-none select-none overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${fromColor} 0%, ${toColor} 100%)`,
      }}
    >
      {variant === 'wave' && (
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 inset-x-0 w-full h-[84px]"
        >
          <path
            d="M0,48 C280,108 560,4 860,64 C1110,112 1300,24 1440,56 L1440,120 L0,120 Z"
            fill={toColor}
          />
        </svg>
      )}
      {variant === 'torn' && (
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 inset-x-0 w-full h-[76px]"
        >
          <path
            d="M0,64 L90,42 L180,72 L290,34 L410,68 L530,38 L660,76 L790,32 L920,70 L1050,40 L1180,74 L1310,36 L1440,62 L1440,120 L0,120 Z"
            fill={toColor}
          />
        </svg>
      )}
      {variant === 'diagonal' && (
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 inset-x-0 w-full h-[88px]"
        >
          <path d="M0,88 L1440,20 L1440,120 L0,120 Z" fill={toColor} />
        </svg>
      )}
    </div>
  );
}
