import { Clock, Instagram, MapPin, MessageCircle, Navigation, Phone, ShoppingBag } from 'lucide-react';
import type { SiteConfig } from '../types';
import { BrandLogo } from './BrandLogo';
import { PaintSplash, ParallaxLayer, SectionTransition } from './ParallaxLayer';
import { Reveal } from './Reveal';

interface ContactAndFooterSectionProps {
  site: SiteConfig;
  onOrderClick: () => void;
}

export function ContactAndFooterSection({ site, onOrderClick }: ContactAndFooterSectionProps) {
  const cleanPhone = site.telefone.replace(/\D/g, '');
  const telHref = `tel:${cleanPhone}`;
  const mapsQuery = encodeURIComponent(site.endereco);
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const mapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `Olá! Vim pelo site da ${site.nome} e gostaria de falar com vocês.`
  )}`;
  const igHandle = site.instagram.replace(/^@/, '');
  const igUrl = `https://instagram.com/${igHandle}`;
  const hasIfood = site.ifood && site.ifood !== '#';

  return (
    <div className="relative overflow-x-clip">
      {/* Smooth 120px divider White -> Cream + parallax */}
      <div className="relative z-20">
        <SectionTransition fromColor="#FFFFFF" toColor="#FFF4E6" variant="diagonal" />
        <ParallaxLayer
          speed={0.12}
          className="pointer-events-none absolute -top-10 -right-12 w-48 opacity-20 z-20"
        >
          <PaintSplash className="w-full h-auto" />
        </ParallaxLayer>
      </div>

      {/* Section 9: Contato e Localização */}
      <section
        id="contato"
        data-bg-theme="#FFF4E6"
        className="relative section-overlap bg-[#FFF4E6] py-24 md:py-[140px]"
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <Reveal>
            <div className="mb-10 md:mb-12">
              <p className="font-hand text-2xl text-[#F7941D] leading-none">
                Venha nos visitar ou peça de casa
              </p>
              <h2 className="mt-2 font-display uppercase text-[clamp(2rem,4vw,3.1rem)] leading-none text-[#1C2B39]">
                CONTATO E <span className="text-[#F7941D]">LOCALIZAÇÃO</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Map column */}
            <div className="lg:col-span-7">
              <Reveal className="h-full">
                <div className="h-full min-h-[320px] rounded-[20px] overflow-hidden bg-white p-2.5 shadow-warm border border-[#1C2B39]/8 transition-transform duration-200 hover:-translate-y-1">
                  <iframe
                    title={`Mapa de localização da ${site.nome}`}
                    src={mapsEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full min-h-[300px] rounded-[14px] border-0"
                  />
                </div>
              </Reveal>
            </div>

            {/* Info column */}
            <div className="lg:col-span-5">
              <Reveal delayMs={90} className="h-full">
                <div className="h-full rounded-[20px] bg-white p-7 sm:p-8 shadow-warm border border-[#1C2B39]/8 flex flex-col justify-between gap-8 transition-transform duration-200 hover:-translate-y-1">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-[#F7941D]/15 text-[#F7941D] flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C2B39]/60">
                          Endereço
                        </h3>
                        <p className="mt-1 text-base font-semibold text-[#1C2B39] leading-snug">
                          {site.endereco}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-[#F7941D]/15 text-[#F7941D] flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C2B39]/60">
                          Horário de funcionamento
                        </h3>
                        <p className="mt-1 text-base font-semibold text-[#1C2B39]">
                          {site.horarios}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-[#F7941D]/15 text-[#F7941D] flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C2B39]/60">
                          Telefone e Instagram
                        </h3>
                        <p className="mt-1 text-base font-semibold text-[#1C2B39] tabular-nums">
                          {site.telefone}
                        </p>
                        <a
                          href={igUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-medium text-[#F7941D] hover:underline"
                        >
                          <Instagram className="w-4 h-4" />
                          {site.instagram}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-[#1C2B39]/10 flex flex-wrap gap-3">
                    <a
                      href={mapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#F7941D] hover:bg-[#E8740C] text-white text-sm font-semibold shadow-sm transition-all duration-150 active:scale-[0.98] whitespace-nowrap min-h-[44px]"
                    >
                      <Navigation className="w-4 h-4" />
                      Como chegar
                    </a>
                    <a
                      href={telHref}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1C2B39] hover:bg-[#293d50] text-white text-sm font-semibold transition-all duration-150 active:scale-[0.98] whitespace-nowrap min-h-[44px]"
                    >
                      <Phone className="w-4 h-4 text-[#FFC93C]" />
                      Ligar
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Chamada Final em Faixa Laranja */}
      <section aria-label="Faça seu pedido agora" className="bg-[#FFF4E6] pb-24 md:pb-[120px]">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <Reveal>
            <div className="relative rounded-[28px] bg-[#F7941D] text-white p-8 sm:p-12 md:p-14 shadow-warm-lg overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#FFC93C]/30 blur-2xl motion-reduce:hidden"
              />
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div>
                  <p className="font-hand text-2xl sm:text-3xl text-[#1C2B39] leading-none">
                    Lanches, pastéis e sorvetes — {site.slogan}
                  </p>
                  <h2 className="mt-2 font-display uppercase text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[0.98] text-white text-balance">
                    BATEU A FOME? <span className="text-[#1C2B39]">CHAMA A GENTE!</span>
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  {hasIfood ? (
                    <a
                      href={site.ifood}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#1C2B39] hover:bg-[#FFF4E6] font-bold text-sm shadow-sm transition-all duration-150 active:scale-[0.98] whitespace-nowrap min-h-[48px]"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#F7941D]" />
                      Pedir no iFood
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={onOrderClick}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#1C2B39] hover:bg-[#FFF4E6] font-bold text-sm shadow-sm transition-all duration-150 active:scale-[0.98] whitespace-nowrap min-h-[48px] cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#F7941D]" />
                      Pedir agora
                    </button>
                  )}

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1C2B39] hover:bg-[#14202B] text-white font-bold text-sm shadow-sm transition-all duration-150 active:scale-[0.98] whitespace-nowrap min-h-[48px]"
                  >
                    <MessageCircle className="w-4 h-4 text-[#FFC93C]" />
                    Chamar no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Smooth 120px divider Cream -> Petrol Footer */}
      <SectionTransition fromColor="#FFF4E6" toColor="#1C2B39" variant="wave" />

      {/* Section 11: Rodapé */}
      <footer className="bg-[#1C2B39] text-white pt-14 pb-24 md:pb-12">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
            <div className="md:col-span-5 space-y-3">
              <BrandLogo site={site} variant="dark" size="md" />
              <p className="text-sm text-white/75 max-w-sm leading-relaxed">
                {site.slogan}. Lanches artesanais, pastéis crocantes e sorvetes geladinhos em{' '}
                {site.cidade}.
              </p>
            </div>

            <div className="md:col-span-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#FFC93C] mb-3">
                Navegação
              </h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <a href="#inicio" className="hover:text-[#F7941D] transition-colors">
                    Início
                  </a>
                </li>
                <li>
                  <a href="#cardapio" className="hover:text-[#F7941D] transition-colors">
                    Cardápio
                  </a>
                </li>
                <li>
                  <a href="#sobre" className="hover:text-[#F7941D] transition-colors">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#galeria" className="hover:text-[#F7941D] transition-colors">
                    Galeria
                  </a>
                </li>
                <li>
                  <a href="#contato" className="hover:text-[#F7941D] transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#FFC93C] mb-3">
                Atendimento &amp; Redes
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">{site.endereco}</p>
              <p className="mt-1 text-sm text-white/70">{site.horarios}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
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
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
            <p>
              © {new Date().getFullYear()} {site.nome}. Todos os direitos reservados.
            </p>
            <p>{site.cidade}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
