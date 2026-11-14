import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { SiteConfig } from '../types';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  site: SiteConfig;
  currentView: 'home' | 'cardapio';
  onNavigateHome: (sectionId?: string) => void;
  onNavigateCardapio: () => void;
  onOrderClick: () => void;
}

export function Header({
  site,
  currentView,
  onNavigateHome,
  onNavigateCardapio,
  onOrderClick,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hasCustomOrderLink = site.linkPedidos && site.linkPedidos !== '#';

  const navItems = [
    {
      label: 'Início',
      active: currentView === 'home',
      action: () => onNavigateHome('inicio'),
    },
    {
      label: 'Cardápio',
      active: currentView === 'cardapio',
      action: () => onNavigateCardapio(),
    },
    {
      label: 'Sobre',
      active: false,
      action: () => onNavigateHome('sobre-contato'),
    },
    {
      label: 'Contato',
      active: false,
      action: () => onNavigateHome('sobre-contato'),
    },
  ];

  return (
    <header
      className="fixed top-0 inset-x-0 z-40 bg-[#1C2B39] border-b-[3px] border-[#F7941D] shadow-[0_6px_20px_rgba(28,43,57,0.25)] transition-all duration-200"
    >
      <div
        className={`mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16 flex items-center justify-between gap-8 transition-[height] duration-200 ${
          scrolled ? 'h-[57px]' : 'h-[61px] md:h-[69px]'
        }`}
      >
        <button
          type="button"
          onClick={() => onNavigateHome('inicio')}
          aria-label={`${site.nome} — Ir para o início`}
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFC93C] rounded-lg cursor-pointer text-left"
        >
          <BrandLogo site={site} size="sm" variant="dark" />
        </button>

        <nav className="hidden md:flex items-center gap-7" aria-label="Navegação principal">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.action}
              className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 relative py-1 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFC93C] ${
                item.active
                  ? 'text-[#F7941D] after:w-full after:bg-[#F7941D]'
                  : 'text-white hover:text-[#FFC93C] after:w-0 hover:after:w-full after:bg-[#FFC93C]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {hasCustomOrderLink ? (
            <a
              href={site.linkPedidos}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2 rounded-[999px] bg-[#F7941D] hover:brightness-110 hover:shadow-[0_0_16px_rgba(247,148,29,0.55)] text-[#1C2B39] text-xs md:text-sm font-extrabold tracking-wider uppercase shadow-sm transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 min-h-[38px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC93C]"
            >
              PEDIR
            </a>
          ) : (
            <button
              type="button"
              onClick={onOrderClick}
              className="inline-flex items-center justify-center px-5 py-2 rounded-[999px] bg-[#F7941D] hover:brightness-110 hover:shadow-[0_0_16px_rgba(247,148,29,0.55)] text-[#1C2B39] text-xs md:text-sm font-extrabold tracking-wider uppercase shadow-sm transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 min-h-[38px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC93C]"
            >
              PEDIR
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFC93C]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#1C2B39] border-t border-white/10 px-5 py-4 shadow-[0_12px_28px_rgba(28,43,57,0.35)]">
          <nav className="flex flex-col gap-1" aria-label="Menu mobile">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  item.action();
                }}
                className={`py-3 px-3 rounded-xl text-base font-medium text-left transition-colors cursor-pointer ${
                  item.active
                    ? 'bg-[#F7941D]/20 text-[#F7941D]'
                    : 'text-white hover:bg-white/10 hover:text-[#FFC93C]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
