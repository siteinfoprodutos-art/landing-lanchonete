import { CheckCircle2, Flame, MessageCircle, ShoppingBag, Smartphone } from 'lucide-react';
import { SOBRE_CONTEUDO } from '../data/menuData';
import type { SiteConfig } from '../types';
import {
  PaintSplash,
  ParallaxLayer,
  PastryCrumbs,
  SectionTransition,
} from './ParallaxLayer';
import { Reveal } from './Reveal';

interface AboutAndStepsSectionProps {
  site: SiteConfig;
}

const STEPS = [
  {
    numero: '01',
    icon: ShoppingBag,
    titulo: 'Escolha seus favoritos',
    descricao:
      'Monte seu pedido escolhendo entre lanches artesanais, pastéis salgados ou doces, sorvetes cremosos e nossos combos mistos.',
  },
  {
    numero: '02',
    icon: Smartphone,
    titulo: 'Peça como preferir',
    descricao:
      'Envie seu pedido em poucos cliques pelo WhatsApp, peça pelo iFood ou ligue diretamente para o nosso balcão.',
  },
  {
    numero: '03',
    icon: Flame,
    titulo: 'Receba no ponto certo',
    descricao:
      'Preparamos cada item na hora — quentinho e crocante ou bem gelado — para você retirar ou receber rápido em casa.',
  },
];

export function AboutAndStepsSection({ site }: AboutAndStepsSectionProps) {
  return (
    <div className="relative overflow-x-clip">
      {/* Section 5: Sobre Nós */}
      <section
        id="sobre"
        data-bg-theme="#FFF4E6"
        className="relative bg-[#FFF4E6] py-24 md:py-[140px]"
      >
        <ParallaxLayer
          speed={0.11}
          className="pointer-events-none absolute -left-20 top-10 w-64 md:w-80 opacity-[0.1]"
        >
          <PaintSplash className="w-full h-auto" />
        </ParallaxLayer>

        <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Photo column */}
            <div className="lg:col-span-6">
              <Reveal className="h-full">
                <div className="relative h-full min-h-[300px] rounded-[20px] overflow-hidden shadow-warm-lg bg-white p-2.5 transition-transform duration-200 hover:-translate-y-1">
                  <img
                    src={SOBRE_CONTEUDO.imagem}
                    alt={`Cozinha artesanal da ${site.nome}`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-[#1C2B39]/90 backdrop-blur-sm text-white px-4 py-3 flex items-center justify-between gap-3">
                    <span className="font-hand text-xl sm:text-2xl text-[#FFC93C] leading-none">
                      {SOBRE_CONTEUDO.assinatura}
                    </span>
                    <span className="text-xs font-medium text-white/80 whitespace-nowrap">
                      {site.cidade}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Story column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <Reveal delayMs={90}>
                <p className="font-hand text-2xl text-[#F7941D] leading-none">
                  Nossa história
                </p>
                <h2 className="mt-2 font-display uppercase text-[clamp(2rem,3.8vw,3rem)] leading-[1.02] text-[#1C2B39] text-balance">
                  SOBRE A <span className="text-[#F7941D]">{site.nome}</span>
                </h2>
                <h3 className="mt-3 text-lg sm:text-xl font-semibold text-[#1C2B39]">
                  {SOBRE_CONTEUDO.titulo}
                </h3>

                <div className="mt-4 space-y-3 text-sm sm:text-base text-[#1C2B39]/80 leading-relaxed">
                  {SOBRE_CONTEUDO.paragrafos.map((texto, idx) => (
                    <p key={idx}>{texto}</p>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-[#1C2B39]">
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F7941D]" />
                    Atendimento: {site.horarios}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F7941D]" />
                    Retirada no balcão e delivery
                  </span>
                </div>

                <div className="mt-8 pt-6 border-t border-[#1C2B39]/12 grid grid-cols-3 gap-4">
                  {SOBRE_CONTEUDO.destaques.map((stat) => (
                    <div key={stat.legenda}>
                      <div className="font-display text-2xl sm:text-3xl text-[#F7941D] tabular-nums">
                        {stat.valor}
                      </div>
                      <div className="mt-0.5 text-xs text-[#1C2B39]/75 leading-snug">
                        {stat.legenda}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Smooth 120px gradient + SVG wave + parallax crumbs bridging Sobre -> Como Pedir */}
      <div className="relative z-20">
        <SectionTransition fromColor="#FFF4E6" toColor="#FFFFFF" variant="wave" />
        <ParallaxLayer
          speed={-0.13}
          className="pointer-events-none absolute -top-10 right-8 sm:right-20 w-24 sm:w-32 z-20"
        >
          <PastryCrumbs className="w-full h-auto" />
        </ParallaxLayer>
      </div>

      {/* Section 6: Como Pedir (3 passos gerais) */}
      <section
        id="como-pedir"
        data-bg-theme="#FFF4E6"
        className="relative section-overlap bg-white py-24 md:py-[140px]"
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="font-hand text-2xl text-[#F7941D] leading-none">
                Simples, rápido e sem complicação
              </p>
              <h2 className="mt-2 font-display uppercase text-[clamp(2rem,4vw,3.1rem)] leading-none text-[#1C2B39]">
                COMO <span className="text-[#F7941D]">PEDIR</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#1C2B39]/75">
                Em apenas três passos você garante seu lanche, pastel ou sorvete sem sair de casa.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.numero} delayMs={idx * 90}>
                  <div className="h-full rounded-[20px] bg-[#FFF4E6]/75 border border-[#F7941D]/15 p-7 shadow-warm flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1.5">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-[#F7941D] text-white flex items-center justify-center shadow-sm">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="font-display text-3xl text-[#1C2B39]/20 tabular-nums">
                          {step.numero}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#1C2B39]">{step.titulo}</h3>
                      <p className="mt-2 text-sm text-[#1C2B39]/75 leading-relaxed">
                        {step.descricao}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delayMs={180}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                  `Olá! Gostaria de fazer um pedido na ${site.nome}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F7941D] hover:bg-[#E8740C] text-white font-semibold text-sm shadow-warm transition-all duration-150 active:scale-[0.98] whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                Pedir pelo WhatsApp
              </a>
              {site.ifood && site.ifood !== '#' && (
                <a
                  href={site.ifood}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1C2B39] hover:bg-[#293d50] text-white font-semibold text-sm transition-all duration-150 active:scale-[0.98] whitespace-nowrap"
                >
                  <ShoppingBag className="w-4 h-4 text-[#FFC93C]" />
                  Pedir pelo iFood
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
