/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Lenis from 'lenis';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FloatingActions } from './components/FloatingActions';
import { Header } from './components/Header';
import { HeroScrollCanvas } from './components/HeroScrollCanvas';
import { HomeSections } from './components/HomeSections';
import { MenuAndCombosSection } from './components/MenuAndCombosSection';
import type { HeroCfg, SiteConfig } from './types';

// ============================================================================
// CONFIGURAÇÃO DO CLIENTE — EDITE APENAS ESTE BLOCO PARA PERSONALIZAR O SITE
// ============================================================================
export const SITE: SiteConfig = {
  nome: 'Sabor da Hora',
  slogan: 'Sabor de verdade, feito na hora',
  logo: '',
  cidade: 'Caieiras-SP',
  telefone: '(00) 00000-0000',
  whatsapp: '5500000000000',
  instagram: '@sabordahora',
  ifood: '#',
  linkPedidos: '#',
  endereco: 'Rua Exemplo, 123, Centro, Caieiras-SP',
  horarios: 'Seg a Dom, 11h às 23h',
};

export const CFG: HeroCfg = {
  desktop: { dir: '/frames/', total: 95, mode: 'fit-box' },
  mobile: { dir: '/frames_mobile/', total: 79, mode: 'fit-tall' },
};
// ============================================================================

type PageView = 'home' | 'cardapio';

function getInitialView(): PageView {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash;
    if (hash.startsWith('#cardapio')) return 'cardapio';
  }
  return 'home';
}

export default function App() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [view, setView] = useState<PageView>(getInitialView);
  const lenisRef = useRef<Lenis | null>(null);
  const pendingScrollTargetRef = useRef<string | null>(null);

  useEffect(() => {
    document.title = `${SITE.nome} — ${SITE.slogan}`;
  }, []);

  // Sincroniza botão voltar/avançar do navegador via hash
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      setView(hash.startsWith('#cardapio') ? 'cardapio' : 'home');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Scroll suave em toda a página via Lenis (respeitando prefers-reduced-motion)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.1,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Fundo da página animado: interpola suavemente conforme a seção em foco
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) {
      document.body.style.backgroundColor = '#FFF4E6';
      return;
    }

    const themedSections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-bg-theme]')
    );
    if (themedSections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const color = entry.target.getAttribute('data-bg-theme');
            if (color) {
              document.body.style.backgroundColor = color;
            }
          }
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0.05 }
    );

    themedSections.forEach((sec) => observer.observe(sec));
    return () => {
      observer.disconnect();
      document.body.style.backgroundColor = '#FFF4E6';
    };
  }, [view]);

  const scrollToElementOrTop = useCallback((sectionId?: string) => {
    const scrollNow = () => {
      if (!sectionId || sectionId === 'inicio' || sectionId === 'top') {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: false });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
      const target = document.getElementById(sectionId);
      if (!target) return;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: -68 });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollNow);
    });
  }, []);

  // Executa scroll pendente após troca de tela (Home <-> Cardápio)
  useEffect(() => {
    const pending = pendingScrollTargetRef.current;
    if (pending !== null) {
      pendingScrollTargetRef.current = null;
      scrollToElementOrTop(pending);
    }
  }, [view, scrollToElementOrTop]);

  const handleNavigateHome = useCallback(
    (sectionId?: string) => {
      const targetId = sectionId || 'inicio';
      if (window.location.hash !== `#${targetId}`) {
        window.history.replaceState(null, '', targetId === 'inicio' ? '#inicio' : `#${targetId}`);
      }
      if (view !== 'home') {
        pendingScrollTargetRef.current = targetId;
        setView('home');
      } else {
        scrollToElementOrTop(targetId);
      }
    },
    [view, scrollToElementOrTop]
  );

  const handleNavigateCardapio = useCallback(() => {
    if (window.location.hash !== '#cardapio') {
      window.history.replaceState(null, '', '#cardapio');
    }
    if (view !== 'cardapio') {
      pendingScrollTargetRef.current = 'top';
      setView('cardapio');
    } else {
      scrollToElementOrTop('top');
    }
  }, [view, scrollToElementOrTop]);

  const handleOrderClick = () => {
    setOrderModalOpen(true);
  };

  return (
    <div className="relative min-h-screen text-[#1C2B39]">
      {/* Textura sutil de grão quente */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 bg-warm-grain opacity-[0.025]"
      />

      <Header
        site={SITE}
        currentView={view}
        onNavigateHome={handleNavigateHome}
        onNavigateCardapio={handleNavigateCardapio}
        onOrderClick={handleOrderClick}
      />

      {/* Nenhum ancestral do HeroScrollCanvas possui overflow:hidden, transform ou filter */}
      <main>
        {view === 'home' ? (
          <>
            <HeroScrollCanvas site={SITE} cfg={CFG} onOrderClick={handleOrderClick} />
            <HomeSections
              site={SITE}
              onOrderClick={handleOrderClick}
              onNavigateHome={handleNavigateHome}
              onNavigateCardapio={handleNavigateCardapio}
            />
          </>
        ) : (
          <MenuAndCombosSection
            site={SITE}
            onScrollToSection={(id) => scrollToElementOrTop(id)}
            onNavigateHome={handleNavigateHome}
            onNavigateCardapio={handleNavigateCardapio}
          />
        )}
      </main>

      <FloatingActions
        site={SITE}
        orderModalOpen={orderModalOpen}
        onOpenOrderModal={() => setOrderModalOpen(true)}
        onCloseOrderModal={() => setOrderModalOpen(false)}
      />
    </div>
  );
}
