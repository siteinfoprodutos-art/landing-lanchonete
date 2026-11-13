import { useState } from 'react';
import {
  ArrowRight,
  Award,
  BadgePercent,
  Bike,
  Clock,
  Instagram,
  Leaf,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { HOME_COMBOS, HOME_HIGHLIGHTS } from '../data/menuData';
import type { HomeHighlightItem, SiteConfig } from '../types';
import { CategoryIconPlaceholder } from './CategoryIconPlaceholder';
import {
  PaintSplash,
  ParallaxLayer,
  PastryCrumbs,
  SectionTransition,
  SyrupDrops,
} from './ParallaxLayer';
import { Reveal } from './Reveal';
import { SiteFooter } from './SiteFooter';

interface HomeSectionsProps {
  site: SiteConfig;
  onOrderClick: () => void;
  onNavigateHome: (sectionId?: string) => void;
  onNavigateCardapio: () => void;
}

const DIFFERENTIALS = [
  {
    icon: Leaf,
    title: 'Ingredientes frescos',
    desc: 'Selecionados todo dia.',
  },
  {
    icon: Bike,
    title: 'Entrega rápida',
    desc: 'Quente ou bem gelado.',
  },
  {
    icon: Award,
    title: 'Sabor artesanal',
    desc: 'Tudo feito na hora.',
  },
  {
    icon: BadgePercent,
    title: 'Preço justo',
    desc: 'Combos que valem muito.',
  },
];

function getCategoryBadgeClass(category: HomeHighlightItem['category']) {
  if (category === 'lanches') return 'bg-[#F7941D] text-white';
  if (category === 'pasteis') return 'bg-[#FFC93C] text-[#1C2B39]';
  return 'bg-[#1C2B39] text-[#FFF4E6]';
}

export function HomeSections({
  site,
  onOrderClick,
  onNavigateHome,
  onNavigateCardapio,
}: HomeSectionsProps) {
  const [failedImgs, setFailedImgs] = useState<Record<string, boolean>>({});

  const markImgFailed = (id: string) => {
    setFailedImgs((prev) => ({ ...prev, [id]: true }));
  };

  const buildComboUrl = (comboName: string) => {
    if (site.linkPedidos && site.linkPedidos !== '#') {
      return site.linkPedidos;
    }
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
      `Olá! Quero pedir o combo "${comboName}" da ${site.nome}.`
    )}`;
  };

  const cleanPhone = site.telefone.replace(/\D/g, '');
  const telHref = `tel:${cleanPhone}`;
  const mapsQuery = encodeURIComponent(site.endereco);
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const mapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `Olá! Vim pelo site da ${site.nome} e gostaria de fazer um pedido.`
  )}`;
  const igHandle = site.instagram.replace(/^@/, '');
  const igUrl = `https://instagram.com/${igHandle}`;
  const hasIfood = site.ifood && site.ifood !== '#';

  return (
    <div className="relative overflow-x-clip">
      {/* b. Faixa de diferenciais compacta (4 ícones em uma linha, rolável no celular) */}
      <section
        aria-label="Nossos diferenciais"
        data-bg-theme="#FFF4E6"
        className="relative bg-[#FFF4E6] pt-8 pb-4 md:pt-12 md:pb-6"
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <Reveal>
            <div className="rounded-[20px] bg-white/90 border border-[#F7941D]/20 px-4 py-4 sm:px-7 sm:py-5 shadow-warm">
              <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-5 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {DIFFERENTIALS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-center gap-3 shrink-0 min-w-[210px] sm:min-w-[220px] lg:min-w-0 snap-start"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#F7941D]/15 text-[#F7941D] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-[#1C2B39] whitespace-nowrap">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#1C2B39]/70 whitespace-nowrap">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* c. NOSSOS DESTAQUES — 6 cards misturando Lanche, Pastel, Sorvete alternados */}
      <section
        id="destaques"
        data-bg-theme="#FFF4E6"
        className="relative bg-[#FFF4E6] py-20 md:py-[120px]"
      >
        <ParallaxLayer
          speed={0.1}
          className="pointer-events-none absolute -right-24 top-16 w-64 md:w-80 opacity-[0.1]"
        >
          <PaintSplash className="w-full h-auto" />
        </ParallaxLayer>

        <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12">
              <div>
                <p className="font-hand text-2xl text-[#F7941D] leading-none">
                  Lanches, pastéis e sorvetes feitos na hora
                </p>
                <h2 className="mt-2 font-display uppercase text-[clamp(2.2rem,4.2vw,3.3rem)] leading-none text-[#1C2B39]">
                  NOSSOS <span className="text-[#F7941D]">DESTAQUES</span>
                </h2>
              </div>
              <p className="text-sm text-[#1C2B39]/75 max-w-md">
                Uma amostra do que sai a todo momento da nossa chapa, fritadeira e sorveteria.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOME_HIGHLIGHTS.map((item, idx) => {
              const showPhoto = Boolean(item.imagem) && !failedImgs[item.id];
              return (
                <Reveal key={item.id} delayMs={idx * 90}>
                  <article className="group h-full flex flex-col rounded-[20px] bg-white border border-[#1C2B39]/8 overflow-hidden shadow-warm transition-transform duration-200 hover:-translate-y-1.5">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      {showPhoto ? (
                        <img
                          src={item.imagem}
                          alt={item.nome}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          onError={() => markImgFailed(item.id)}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <CategoryIconPlaceholder
                          category={item.category}
                          label={item.etiqueta}
                        />
                      )}
                      <span
                        className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm ${getCategoryBadgeClass(
                          item.category
                        )}`}
                      >
                        {item.etiqueta}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-[#1C2B39] leading-snug">
                          {item.nome}
                        </h3>
                        <p className="mt-1 text-sm text-[#1C2B39]/75 line-clamp-1">
                          {item.descricao}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#1C2B39]/10 flex items-center justify-between">
                        <span className="text-sm font-bold text-[#F7941D] tabular-nums">
                          {item.precoApartir}
                        </span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal delayMs={120}>
            <div className="mt-10 md:mt-12 flex justify-center">
              <button
                type="button"
                onClick={onNavigateCardapio}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#F7941D] hover:bg-[#E8740C] text-white font-bold text-sm sm:text-base shadow-warm transition-all duration-150 active:scale-[0.98] whitespace-nowrap cursor-pointer"
              >
                Ver cardápio completo
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Transição suave Creme -> Azul-Petróleo */}
      <div className="relative z-20">
        <SectionTransition fromColor="#FFF4E6" toColor="#1C2B39" variant="wave" />
        <ParallaxLayer
          speed={0.14}
          className="pointer-events-none absolute -top-12 right-8 sm:right-20 w-24 sm:w-32 z-20"
        >
          <SyrupDrops className="w-full h-auto" />
        </ParallaxLayer>
      </div>

      {/* d. Faixa de Combos Misto (azul-petróleo) com 3 combos */}
      <section
        id="combos-home"
        data-bg-theme="#1C2B39"
        className="relative section-overlap bg-[#1C2B39] text-[#FFF4E6] py-20 md:py-[120px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#F7941D]/15 blur-3xl motion-reduce:hidden"
        />

        <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12">
              <div>
                <p className="font-hand text-2xl text-[#FFC93C] leading-none">
                  Economize combinando sabores
                </p>
                <h2 className="mt-2 font-display uppercase text-[clamp(2rem,4vw,3.1rem)] leading-none text-white">
                  COMBOS <span className="text-[#F7941D]">MISTOS</span>
                </h2>
              </div>
              <p className="text-sm text-white/80 max-w-sm">
                Opções pensadas para matar a fome com lanche, pastel ou sobremesa gelada.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOME_COMBOS.map((combo, idx) => {
              const showPhoto = Boolean(combo.imagem) && !failedImgs[combo.id];
              return (
                <Reveal key={combo.id} delayMs={idx * 90}>
                  <article className="group h-full flex flex-col rounded-[20px] bg-white/[0.07] border border-white/12 overflow-hidden shadow-warm-dark transition-transform duration-200 hover:-translate-y-1.5">
                    <div className="aspect-[4/3] w-full bg-[#14202B] overflow-hidden">
                      {showPhoto ? (
                        <img
                          src={combo.imagem}
                          alt={combo.nome}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          onError={() => markImgFailed(combo.id)}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <CategoryIconPlaceholder
                          category={combo.categoryIcon}
                          label={combo.nome}
                          darkSurface
                        />
                      )}
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-white leading-snug">
                          {combo.nome}
                        </h3>
                        <p className="mt-1.5 text-sm text-white/75 leading-relaxed">
                          {combo.itens}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/12 flex items-center justify-between gap-3">
                        <div className="flex flex-col">
                          {combo.precoAntigo && (
                            <span className="text-xs text-white/50 line-through tabular-nums">
                              {combo.precoAntigo}
                            </span>
                          )}
                          <span className="text-xl font-bold text-[#FFC93C] tabular-nums">
                            {combo.preco}
                          </span>
                        </div>

                        <a
                          href={buildComboUrl(combo.nome)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#F7941D] hover:bg-[#E8740C] text-white text-xs sm:text-sm font-semibold transition-all duration-150 active:scale-[0.98] whitespace-nowrap min-h-[42px]"
                        >
                          <Sparkles className="w-4 h-4" />
                          Pedir combo
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transição suave Azul-Petróleo -> Creme */}
      <div className="relative z-20">
        <SectionTransition fromColor="#1C2B39" toColor="#FFF4E6" variant="torn" />
        <ParallaxLayer
          speed={-0.12}
          className="pointer-events-none absolute -top-10 left-8 sm:left-20 w-24 sm:w-32 z-20"
        >
          <PastryCrumbs className="w-full h-auto" />
        </ParallaxLayer>
      </div>

      {/* e. Seção única "Sobre + Contato" */}
      <section
        id="sobre-contato"
        data-bg-theme="#FFF4E6"
        className="relative section-overlap bg-[#FFF4E6] py-20 md:py-[120px]"
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* À esquerda: parágrafo curto + horários */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-[20px] bg-white p-7 sm:p-8 shadow-warm border border-[#1C2B39]/8">
              <Reveal>
                <div>
                  <p className="font-hand text-2xl text-[#F7941D] leading-none">
                    Feito na hora para você
                  </p>
                  <h2 className="mt-2 font-display uppercase text-[clamp(2rem,3.6vw,2.9rem)] leading-none text-[#1C2B39]">
                    SOBRE A <span className="text-[#F7941D]">{site.nome}</span>
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-[#1C2B39]/80 leading-relaxed">
                    Reunimos lanches na chapa, pastéis crocantes recheados de ponta a ponta e
                    sorvetes cremosos preparados no capricho para você curtir no balcão ou receber
                    em casa em {site.cidade}.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#1C2B39]/10 space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#F7941D]/15 text-[#F7941D] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C2B39]/60">
                        Horário de funcionamento
                      </h3>
                      <p className="mt-0.5 text-sm sm:text-base font-semibold text-[#1C2B39]">
                        {site.horarios}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#F7941D]/15 text-[#F7941D] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C2B39]/60">
                        Telefone e Instagram
                      </h3>
                      <p className="mt-0.5 text-sm sm:text-base font-semibold text-[#1C2B39] tabular-nums">
                        {site.telefone}
                      </p>
                      <a
                        href={igUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#F7941D] hover:underline"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                        {site.instagram}
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* À direita: mapa, endereço e botões Como chegar, WhatsApp e Ligar */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-[20px] bg-white p-5 sm:p-7 shadow-warm border border-[#1C2B39]/8 gap-5">
              <Reveal delayMs={90} className="flex-1 flex flex-col gap-5">
                <div className="w-full h-[240px] sm:h-[280px] rounded-[14px] overflow-hidden bg-[#FFF4E6]">
                  <iframe
                    title={`Mapa de localização da ${site.nome}`}
                    src={mapsEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full border-0"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F7941D]/15 text-[#F7941D] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C2B39]/60">
                      Onde estamos
                    </h3>
                    <p className="mt-0.5 text-sm sm:text-base font-semibold text-[#1C2B39]">
                      {site.endereco}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href={mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#F7941D] hover:bg-[#E8740C] text-white text-sm font-semibold shadow-sm transition-all duration-150 active:scale-[0.98] whitespace-nowrap min-h-[44px]"
                  >
                    <Navigation className="w-4 h-4" />
                    Como chegar
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#25D366] hover:brightness-105 text-white text-sm font-semibold shadow-sm transition-all duration-150 active:scale-[0.98] whitespace-nowrap min-h-[44px]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <a
                    href={telHref}
                    className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#1C2B39] hover:bg-[#293d50] text-white text-sm font-semibold transition-all duration-150 active:scale-[0.98] whitespace-nowrap min-h-[44px]"
                  >
                    <Phone className="w-4 h-4 text-[#FFC93C]" />
                    Ligar
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* f. Chamada final em faixa laranja */}
      <section aria-label="Faça seu pedido agora" className="bg-[#FFF4E6] pb-20 md:pb-[120px]">
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

      {/* g. Rodapé enxuto */}
      <SiteFooter
        site={site}
        onNavigateHome={onNavigateHome}
        onNavigateCardapio={onNavigateCardapio}
      />
    </div>
  );
}
