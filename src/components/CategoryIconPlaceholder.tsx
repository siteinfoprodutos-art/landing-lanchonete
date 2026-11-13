import { IceCreamCone, Sandwich } from 'lucide-react';
import type { MenuCategoryKey } from '../types';

interface CategoryIconProps {
  category: MenuCategoryKey;
  className?: string;
}

export function PastelGlyph({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Golden crimped pastry shape */}
      <path d="M5 9.5L7.5 8L10 9.5L13 8L16 9.5L19 8L22 9.5L24.5 8L27 9.5L25.5 13L27 16L25.5 19L27 22.5L24.5 24L22 22.5L19 24L16 22.5L13 24L10 22.5L7.5 24L5 22.5L6.5 19L5 16L6.5 13L5 9.5Z" />
      <path d="M10.5 14.5C12.5 13.5 19.5 13.5 21.5 14.5" opacity="0.7" />
      <path d="M11 18.2C14 19 18 19 21 18.2" opacity="0.7" />
    </svg>
  );
}

export function CategoryIcon({ category, className = 'w-7 h-7' }: CategoryIconProps) {
  if (category === 'lanches') {
    return <Sandwich className={className} strokeWidth={2.1} />;
  }
  if (category === 'pasteis') {
    return <PastelGlyph className={className} />;
  }
  return <IceCreamCone className={className} strokeWidth={2.1} />;
}

interface CategoryIconPlaceholderProps {
  category: MenuCategoryKey;
  label?: string;
  darkSurface?: boolean;
}

/**
 * Placeholder visual reutilizável quando um item ainda não possui foto real.
 * Para substituir por foto, basta preencher o campo `imagem` no arquivo `src/data/menuData.ts`.
 */
export function CategoryIconPlaceholder({
  category,
  label,
  darkSurface = false,
}: CategoryIconPlaceholderProps) {
  const categoryName =
    category === 'lanches' ? 'Lanche' : category === 'pasteis' ? 'Pastel' : 'Sorvete';

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center p-4 text-center ${
        darkSurface
          ? 'bg-gradient-to-br from-[#243748] to-[#16232F]'
          : 'bg-gradient-to-br from-[#FFF4E6] via-[#FFF8EE] to-[#FFE9B0]/65'
      }`}
    >
      <div className="w-16 h-16 rounded-full bg-[#F7941D] text-white flex items-center justify-center shadow-warm transition-transform duration-300 group-hover:scale-110">
        <CategoryIcon category={category} className="w-8 h-8" />
      </div>
      <span
        className={`mt-2.5 text-[11px] font-semibold uppercase tracking-wider ${
          darkSurface ? 'text-[#FFC93C]/85' : 'text-[#1C2B39]/65'
        }`}
      >
        {label || categoryName}
      </span>
    </div>
  );
}
