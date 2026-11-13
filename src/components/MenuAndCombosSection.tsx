import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Sparkles,
  X,
} from 'lucide-react';
import { CATEGORY_BLOCKS, COMBOS, MENU_TABS } from '../data/menuData';
import type { CategoryBlockConfig, MenuCategoryKey, MenuItem, SiteConfig } from '../types';
import { CategoryIcon, CategoryIconPlaceholder } from './CategoryIconPlaceholder';
import {
  PaintSplash,
  ParallaxLayer,
  PastryCrumbs,
  SectionTransition,
  SyrupDrops,
} from './ParallaxLayer';
import { Reveal } from './Reveal';
import { SiteFooter } from './SiteFooter';

interface MenuAndCombosSectionProps {
  site: SiteConfig;
  onScrollToSection?: (sectionId: string) => void;
  onNavigateHome: (sectionId?: string) => void;
  onNavigateCardapio: () => void;
}

function MenuItemCard({
  item,
  darkSurface,
  highlightColorClass,
  priceColorClass,
  cardClassName,
  failedImgs,
  onImgError,
}: {
  item: MenuItem;
  darkSurface: boolean;
  highlightColorClass: string;
  priceColorClass: string;
  cardClassName: string;
  failedImgs: Record<string, boolean>;
  onImgError: (id: string) => void;
}) {
  const showPhoto = Boolean(item.imagem) && !failedImgs[item.id];

  return (
    <article
      className={`group h-full flex flex-col rounded-[20px] overflow-hidden transition-transform duration-200 hover:-translate-y-1.5 ${cardClassName}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {showPhoto ? (
          <img
            src={item.imagem}
            alt={item.nome}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => onImgError(item.id)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <CategoryIconPlaceholder
            category={item.category}
            label={item.subgrupo || item.nome}
            darkSurface={darkSurface}
          />
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          {(item.destaque || item.subgrupo) && (
            <p className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${highlightColorClass}`}>
              {item.destaque || item.subgrupo}
            </p>
          )}
          <h4
            className={`text-lg font-bold leading-snug ${
              darkSurface ? 'text-[#FFF4E6]' : 'text-[#1C2B39]'
            }`}
          >
            {item.nome}
          </h4>
          <p
            className={`mt-1.5 text-sm leading-relaxed ${
              darkSurface ? 'text-[#FFF4E6]/75' : 'text-[#1C2B39]/75'
            }`}
          >
            {item.descricao}
          </p>
        </div>

        <div
          className={`pt-3 border-t flex items-center justify-between ${
            darkSurface ? 'border-white/12' : 'border-[#1C2B39]/10'
          }`}
        >
          <span
            className={`text-xs font-medium ${
              darkSurface ? 'text-[#FFF4E6]/60' : 'text-[#1C2B39]/60'
            }`}
          >
            Feito na hora
          </span>
          <span className={`text-lg font-bold tabular-nums ${priceColorClass}`}>
            {item.preco}
          </span>
        </div>
      </div>
    </article>
  );
}

export function MenuAndCombosSection({
  site,
  onScrollToSection,
  onNavigateHome,
  onNavigateCardapio,
}: MenuAndCombosSectionProps) {
  const [activeTab, setActiveTab] = useState<MenuCategoryKey>('lanches');
  const [failedImgs, setFailedImgs] = useState<Record<string, boolean>>({});
  const [modalCategory, setModalCategory] = useState<CategoryBlockConfig | null>(null);

  useEffect(() => {
    const ids = CATEGORY_BLOCKS.map((b) => b.sectionId);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const matched = CATEGORY_BLOCKS.find((b) => b.sectionId === entry.target.id);
            if (matched) setActiveTab(matched.key);
          }
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0.05 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!modalCategory) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalCategory(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalCategory]);

  const handleTabClick = (key: MenuCategoryKey, sectionId: string) => {
    setActiveTab(key);
    if (onScrollToSection) {
      onScrollToSection(sectionId);
      return;
    }
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const buildOrderUrl = (itemLabel: string) => {
    if (site.linkPedidos && site.linkPedidos !== '#') {
      return site.linkPedidos;
    }
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
      `Olá! Quero pedir (${itemLabel}) na ${site.nome}.`
    )}`;
  };

  const markImgFailed = (id: string) => {
    setFailedImgs((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="relative overflow-x-clip">
      {/* Cabeçalho da tela de Cardápio + Abas com rolagem suave */}
      <section
        id="cardapio"
        data-bg-theme="#FFF4E6"
        className="relative bg-[#FFF4E6] pt-24 pb-10 md:pt-28 md:pb-14"
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <Reveal>
            <button
              type="button"
              onClick={() => onNavigateHome('inicio')}
              className="mb-6 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1C2B39]/75 hover:text-[#F7941D] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para a página inicial
            </button>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="font-hand text-2xl text-[#F7941D] leading-none">
                  Três especialidades com o mesmo carinho
                </p>
                <h1 className="mt-2 font-display uppercase text-[clamp(2.2rem,4.2vw,3.4rem)] leading-none text-[#1C2B39]">
                  NOSSO <span className="text-[#F7941D]">CARDÁPIO</span>
                </h1>
                <p className="mt-2.5 text-sm sm:text-base text-[#1C2B39]/75 max-w-xl">
                  Escolha sua categoria favorita abaixo e navegue pelos nossos lanches, pastéis e sorvetes feitos na hora.
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Navegar pelas categorias do cardápio"
                className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-[#1C2B39]/10 shadow-warm self-start md:self-auto"
              >
                {MENU_TABS.map((tab) => {
                  const active = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => handleTabClick(tab.key, tab.sectionId)}
                      className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 whitespace-nowrap shrink-0 min-h-[42px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1C2B39] ${
                        active
                          ? 'bg-[#F7941D] text-white shadow-sm'
                          : 'text-[#1C2B39]/80 hover:text-[#1C2B39] hover:bg-[#FFF4E6]'
                      }`}
                    >
                      <CategoryIcon category={tab.key} className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 Blocos de Destaque com mesmo tamanho, mesma estrutura e identidade própria */}
      {CATEGORY_BLOCKS.map((block, blockIdx) => {
        const isDark = block.theme === 'petrol';
        const isYellow = block.theme === 'yellow';
        const bgClass = isDark
          ? 'bg-[#1C2B39] text-[#FFF4E6]'
          : isYellow
            ? 'bg-[#FFE9B0] text-[#1C2B39]'
            : 'bg-[#FFF4E6] text-[#1C2B39]';

        const accentTextClass = isDark
          ? 'text-[#FFC93C]'
          : isYellow
            ? 'text-[#E8740C]'
            : 'text-[#F7941D]';

        const buttonClass = isDark
          ? 'bg-[#FFC93C] hover:bg-[#ffd566] text-[#1C2B39] shadow-warm-dark'
          : isYellow
            ? 'bg-[#E8740C] hover:bg-[#cf6206] text-white shadow-warm'
            : 'bg-[#F7941D] hover:bg-[#E8740C] text-white shadow-warm';

        const cardClass = isDark
          ? 'bg-white/[0.07] border border-white/12 shadow-warm-dark'
          : 'bg-white border border-[#1C2B39]/8 shadow-warm';

        const prevBgHex =
          blockIdx === 0 ? '#FFF4E6' : CATEGORY_BLOCKS[blockIdx - 1].bgHex;

        return (
          <div key={block.key} className="relative">
            {/* Divisor orgânico + degradê de 120px quando há troca de fundo */}
            {blockIdx > 0 && (
              <div className="relative z-20">
                <SectionTransition
                  fromColor={prevBgHex}
                  toColor={block.bgHex}
                  variant={blockIdx === 1 ? 'wave' : 'torn'}
                />

                {/* Elementos decorativos com parallax em velocidades diferentes costurando as duas seções */}
                {blockIdx === 1 && (
                  <>
                    <ParallaxLayer
                      speed={0.14}
                      className="pointer-events-none absolute -top-12 right-6 sm:right-16 w-28 sm:w-36 z-20"
                    >
                      <PastryCrumbs className="w-full h-auto" />
                    </ParallaxLayer>
                    <ParallaxLayer
                      speed={-0.1}
                      className="pointer-events-none absolute -bottom-14 -left-12 w-44 sm:w-56 opacity-25 z-20"
                    >
                      <PaintSplash className="w-full h-auto" />
                    </ParallaxLayer>
                  </>
                )}

                {blockIdx === 2 && (
                  <>
                    <ParallaxLayer
                      speed={0.16}
                      className="pointer-events-none absolute -top-14 left-6 sm:left-20 w-24 sm:w-32 z-20"
                    >
                      <SyrupDrops className="w-full h-auto" />
                    </ParallaxLayer>
                    <ParallaxLayer
                      speed={-0.12}
                      className="pointer-events-none absolute -bottom-16 -right-10 w-36 sm:w-48 opacity-40 z-20"
                    >
                      <PaintSplash className="w-full h-auto" color="#FFC93C" />
                    </ParallaxLayer>
                  </>
                )}
              </div>
            )}

            <section
              id={block.sectionId}
              data-bg-theme={block.bgHex}
              className={`relative ${bgClass} ${
                blockIdx > 0 ? 'section-overlap' : ''
              } py-24 md:py-[140px] scroll-mt-20`}
            >
              {/* Parallax decorativo sutil dentro do bloco */}
              <ParallaxLayer
                speed={blockIdx % 2 === 0 ? 0.1 : -0.1}
                className={`pointer-events-none absolute ${
                  blockIdx % 2 === 0 ? '-right-24 top-20' : '-left-24 top-24'
                } w-64 md:w-80 ${isDark ? 'opacity-[0.07]' : 'opacity-[0.11]'}`}
              >
                <PaintSplash
                  className="w-full h-auto"
                  color={isDark ? '#FFC93C' : '#F7941D'}
                />
              </ParallaxLayer>

              <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
                {/* Bloco de Destaque Principal (alterna imagem esquerda / direita / esquerda) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 md:mb-14">
                  {/* Imagem principal */}
                  <div
                    className={`lg:col-span-5 ${
                      block.layoutLado === 'right' ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <Reveal>
                      <div
                        className={`relative rounded-[20px] p-2.5 overflow-hidden ${
                          isDark
                            ? 'bg-white/10 border border-white/15 shadow-warm-dark'
                            : 'bg-white border border-[#1C2B39]/8 shadow-warm-lg'
                        }`}
                      >
                        <div className="relative aspect-[4/3] w-full rounded-[14px] overflow-hidden">
                          <img
                            src={block.imagemPrincipal}
                            alt={block.imagemAlt}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <div
                            className={`absolute top-3.5 left-3.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                              isDark
                                ? 'bg-[#FFC93C] text-[#1C2B39]'
                                : 'bg-[#1C2B39]/90 text-white'
                            }`}
                          >
                            <CategoryIcon category={block.key} className="w-3.5 h-3.5" />
                            <span>{block.seloImagem}</span>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  </div>

                  {/* Título grande, frase curta e botão "Ver tudo" */}
                  <div
                    className={`lg:col-span-7 ${
                      block.layoutLado === 'right' ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <Reveal delayMs={90}>
                      <p className={`font-hand text-2xl sm:text-3xl leading-none ${accentTextClass}`}>
                        {block.kicker}
                      </p>
                      <h3
                        className={`mt-2 font-display uppercase text-[clamp(2.3rem,4.5vw,3.6rem)] leading-[0.98] text-balance ${
                          isDark ? 'text-[#FFF4E6]' : 'text-[#1C2B39]'
                        }`}
                      >
                        {block.tituloInicio}{' '}
                        <span className={accentTextClass}>{block.tituloDestaque}</span>
                      </h3>
                      <p
                        className={`mt-4 text-sm sm:text-base leading-relaxed max-w-xl ${
                          isDark ? 'text-[#FFF4E6]/85' : 'text-[#1C2B39]/80'
                        }`}
                      >
                        {block.frase}
                      </p>

                      <div className="mt-7 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setModalCategory(block)}
                          className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm transition-all duration-150 active:scale-[0.98] whitespace-nowrap min-h-[46px] cursor-pointer ${buttonClass}`}
                        >
                          Ver tudo
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <a
                          href={buildOrderUrl(block.label)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-full font-semibold text-sm border transition-all duration-150 whitespace-nowrap min-h-[46px] ${
                            isDark
                              ? 'border-white/25 text-[#FFF4E6] hover:bg-white/10'
                              : 'border-[#1C2B39]/20 text-[#1C2B39] hover:bg-white/80'
                          }`}
                        >
                          <MessageCircle className="w-4 h-4" />
                          Pedir {block.label}
                        </a>
                      </div>
                    </Reveal>
                  </div>
                </div>

                {/* Grade padronizada de 6 itens por bloco */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {block.itensDestaque.map((item, idx) => (
                    <Reveal key={item.id} delayMs={idx * 90}>
                      <MenuItemCard
                        item={item}
                        darkSurface={isDark}
                        highlightColorClass={accentTextClass}
                        priceColorClass={accentTextClass}
                        cardClassName={cardClass}
                        failedImgs={failedImgs}
                        onImgError={markImgFailed}
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );
      })}

      {/* Transição suave Azul-Petróleo -> Creme antes dos Combos Mistos */}
      <div className="relative z-20">
        <SectionTransition fromColor="#1C2B39" toColor="#FFF4E6" variant="diagonal" />
        <ParallaxLayer
          speed={0.14}
          className="pointer-events-none absolute -top-12 right-10 w-28 sm:w-36 z-20"
        >
          <SyrupDrops className="w-full h-auto" />
        </ParallaxLayer>
      </div>

      {/* Section 4: Faixa de Combos Mistos (4 combos equilibrados) */}
      <section
        id="combos"
        data-bg-theme="#FFF4E6"
        className="relative section-overlap bg-[#FFF4E6] py-24 md:py-[140px]"
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <Reveal>
            <div className="relative rounded-[28px] bg-[#1C2B39] text-[#FFF4E6] p-6 sm:p-10 lg:p-12 shadow-warm-lg overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#F7941D]/20 blur-3xl motion-reduce:hidden"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#FFC93C]/12 blur-3xl motion-reduce:hidden"
              />

              <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                <div>
                  <p className="font-hand text-2xl text-[#FFC93C] leading-none">
                    Combos mistos para dividir ou aproveitar tudo
                  </p>
                  <h2 className="mt-2 font-display uppercase text-[clamp(2rem,4vw,3.1rem)] leading-none text-white">
                    NOSSOS MELHORES <span className="text-[#F7941D]">COMBOS</span>
                  </h2>
                </div>
                <p className="text-sm text-white/80 max-w-sm">
                  Combine lanche na chapa, pastel crocante e sorvete geladinho pagando menos.
                </p>
              </div>

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {COMBOS.map((combo, idx) => {
                  const showComboPhoto = Boolean(combo.imagem) && !failedImgs[combo.id];
                  return (
                    <Reveal key={combo.id} delayMs={idx * 90}>
                      <article className="group h-full flex flex-col rounded-[20px] bg-white/[0.07] border border-white/12 overflow-hidden shadow-warm-dark transition-transform duration-200 hover:-translate-y-1.5">
                        <div className="aspect-[4/3] w-full bg-[#14202B] overflow-hidden">
                          {showComboPhoto ? (
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
                              label="Combo Especial"
                              darkSurface
                            />
                          )}
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                              {combo.nome}
                            </h3>
                            <p className="mt-1.5 text-xs sm:text-sm text-white/75 leading-relaxed">
                              {combo.itens}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-white/12 flex items-center justify-between gap-2">
                            <div className="flex flex-col">
                              {combo.precoAntigo && (
                                <span className="text-xs text-white/50 line-through tabular-nums">
                                  {combo.precoAntigo}
                                </span>
                              )}
                              <span className="text-lg sm:text-xl font-bold text-[#FFC93C] tabular-nums">
                                {combo.preco}
                              </span>
                            </div>

                            <a
                              href={buildOrderUrl(combo.nome)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[#F7941D] hover:bg-[#E8740C] text-white text-xs font-semibold transition-all duration-150 active:scale-[0.98] whitespace-nowrap min-h-[40px]"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              Pedir
                            </a>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Modal "Ver tudo" por Categoria */}
      {modalCategory && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Cardápio completo de ${modalCategory.label}`}
          onClick={() => setModalCategory(null)}
          className="fixed inset-0 z-50 bg-[#1C2B39]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-[24px] bg-[#FFF4E6] text-[#1C2B39] p-6 sm:p-8 shadow-warm-lg border border-[#F7941D]/20 relative"
          >
            <button
              type="button"
              onClick={() => setModalCategory(null)}
              aria-label="Fechar cardápio completo"
              className="sticky top-0 float-right w-10 h-10 rounded-full bg-[#1C2B39] text-white hover:bg-[#F7941D] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pr-12">
              <p className="font-hand text-2xl text-[#F7941D] leading-none">
                {modalCategory.kicker}
              </p>
              <h3 className="mt-1 font-display uppercase text-3xl sm:text-4xl text-[#1C2B39] leading-none">
                {modalCategory.tituloInicio}{' '}
                <span className="text-[#F7941D]">{modalCategory.tituloDestaque}</span>
              </h3>
              <p className="mt-2 text-sm text-[#1C2B39]/75">{modalCategory.frase}</p>
            </div>

            {modalCategory.key === 'pasteis' ? (
              <div className="mt-6 space-y-6">
                {(['Salgados', 'Doces'] as const).map((grupo) => (
                  <div key={grupo}>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8740C] mb-3">
                      Pastéis {grupo}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {modalCategory.todosItens
                        .filter((item) => item.subgrupo === grupo)
                        .map((item) => (
                          <div
                            key={item.id}
                            className="rounded-[20px] bg-white p-4 border border-[#1C2B39]/8 shadow-warm flex items-center gap-3.5"
                          >
                            <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-[#FFF4E6]">
                              {item.imagem && !failedImgs[item.id] ? (
                                <img
                                  src={item.imagem}
                                  alt={item.nome}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-[#F7941D] text-white flex items-center justify-center">
                                  <CategoryIcon category="pasteis" className="w-6 h-6" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline justify-between gap-2">
                                <h5 className="font-bold text-sm text-[#1C2B39] truncate">
                                  {item.nome}
                                </h5>
                                <span className="font-bold text-sm text-[#E8740C] tabular-nums shrink-0">
                                  {item.preco}
                                </span>
                              </div>
                              <p className="mt-0.5 text-xs text-[#1C2B39]/75 line-clamp-2">
                                {item.descricao}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {modalCategory.todosItens.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[20px] bg-white p-4 border border-[#1C2B39]/8 shadow-warm flex items-center gap-3.5"
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-[#FFF4E6]">
                      {item.imagem && !failedImgs[item.id] ? (
                        <img
                          src={item.imagem}
                          alt={item.nome}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#F7941D] text-white flex items-center justify-center">
                          <CategoryIcon category={item.category} className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <h5 className="font-bold text-sm text-[#1C2B39] truncate">
                          {item.nome}
                        </h5>
                        <span className="font-bold text-sm text-[#F7941D] tabular-nums shrink-0">
                          {item.preco}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-[#1C2B39]/75 line-clamp-2">
                        {item.descricao}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-7 pt-5 border-t border-[#1C2B39]/12 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[#1C2B39]/70">
                Preços sujeitos a alteração no delivery. Peça direto pelo WhatsApp!
              </span>
              <a
                href={buildOrderUrl(`Cardápio de ${modalCategory.label}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#F7941D] hover:bg-[#E8740C] text-white text-sm font-bold shadow-warm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Pedir {modalCategory.label}
              </a>
            </div>
          </div>
        </div>
      )}
      <SiteFooter
        site={site}
        onNavigateHome={onNavigateHome}
        onNavigateCardapio={onNavigateCardapio}
      />
    </div>
  );
}
