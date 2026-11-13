import { Instagram, MessageCircle } from 'lucide-react';
import type { SiteConfig } from '../types';
import { BrandLogo } from './BrandLogo';
import { SectionTransition } from './ParallaxLayer';

interface SiteFooterProps {
  site: SiteConfig;
  onNavigateHome: (sectionId?: string) => void;
  onNavigateCardapio: () => void;
}

export function SiteFooter({
  site,
  onNavigateHome,
  onNavigateCardapio,
}: SiteFooterProps) {
  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `Olá! Vim pelo site da ${site.nome} e gostaria de falar com vocês.`
  )}`;
  const igHandle = site.instagram.replace(/^@/, '');
  const igUrl = `https://instagram.com/${igHandle}`;

  return (
    <>
      <SectionTransition fromColor="#FFF4E6" toColor="#1C2B39" variant="wave" />

      <footer className="bg-[#1C2B39] text-white pt-12 pb-24 md:pb-10">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-8 border-b border-white/10">
            <div className="space-y-2.5 max-w-sm">
              <BrandLogo site={site} variant="dark" size="md" />
              <p className="text-sm text-white/75 leading-relaxed">
                {site.slogan}. Lanches, pastéis e sorvetes feitos na hora em {site.cidade}.
              </p>
            </div>

            <nav aria-label="Links do rodapé" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
              <button
                type="button"
                onClick={() => onNavigateHome('inicio')}
                className="hover:text-[#F7941D] transition-colors cursor-pointer"
              >
                Início
              </button>
              <button
                type="button"
                onClick={onNavigateCardapio}
                className="hover:text-[#F7941D] transition-colors cursor-pointer"
              >
                Cardápio
              </button>
              <button
                type="button"
                onClick={() => onNavigateHome('sobre-contato')}
                className="hover:text-[#F7941D] transition-colors cursor-pointer"
              >
                Sobre &amp; Contato
              </button>
            </nav>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={igUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-[#F7941D] text-xs font-semibold transition-colors"
              >
                <Instagram className="w-4 h-4" />
                {site.instagram}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-[#25D366] text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/60">
            <p>
              © {new Date().getFullYear()} {site.nome}. Todos os direitos reservados.
            </p>
            <p>
              {site.horarios} · {site.cidade}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
