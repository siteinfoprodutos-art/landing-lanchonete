import type { SiteConfig } from '../types';

interface BrandLogoProps {
  site: SiteConfig;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export function BrandLogo({ site, variant = 'light', size = 'md' }: BrandLogoProps) {
  if (site.logo && site.logo.trim() !== '') {
    return (
      <img
        src={site.logo}
        alt={site.nome}
        className={
          size === 'sm'
            ? 'h-8 w-auto object-contain'
            : size === 'lg'
              ? 'h-12 w-auto object-contain'
              : 'h-9 w-auto object-contain'
        }
      />
    );
  }

  const words = site.nome.trim().split(/\s+/);
  const lastWord = words.length > 1 ? words.pop() : '';
  const firstPart = words.join(' ');

  const textSize =
    size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl' : 'text-2xl';
  const iconSize = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
  const mainTextColor = variant === 'dark' ? 'text-white' : 'text-[#1C2B39]';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none">
      <span
        className={`${iconSize} rounded-xl bg-[#F7941D] text-white inline-flex items-center justify-center shadow-sm`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 28 28" className="w-5 h-5" fill="none">
          <path
            d="M5 12.5C5 8.5 9 6 14 6C19 6 23 8.5 23 12.5H5Z"
            fill="currentColor"
          />
          <circle cx="10.5" cy="9.2" r="0.8" fill="#FFF4E6" />
          <circle cx="14" cy="8.2" r="0.8" fill="#FFF4E6" />
          <circle cx="17.5" cy="9.5" r="0.8" fill="#FFF4E6" />
          <path
            d="M4.5 15C5.6 14.3 6.8 15.7 8 15C9.2 14.3 10.4 15.7 11.6 15C12.8 14.3 14 15.7 15.2 15C16.4 14.3 17.6 15.7 18.8 15C20 14.3 21.2 15.7 23.5 15"
            stroke="#FFC93C"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
          <rect x="4.5" y="16.8" width="19" height="2.8" rx="1.4" fill="#1C2B39" />
          <path
            d="M5.5 21H22.5C22.5 22.8 21 23.8 19 23.8H9C7 23.8 5.5 22.8 5.5 21Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className={`font-display tracking-wide leading-none ${textSize} ${mainTextColor}`}>
        {firstPart ? `${firstPart} ` : ''}
        <span className="text-[#F7941D]">{lastWord || site.nome}</span>
      </span>
    </span>
  );
}
