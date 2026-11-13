import { useEffect, useState } from 'react';
import { MessageCircle, Phone, ShoppingBag, X } from 'lucide-react';
import type { SiteConfig } from '../types';

interface FloatingActionsProps {
  site: SiteConfig;
  orderModalOpen: boolean;
  onOpenOrderModal: () => void;
  onCloseOrderModal: () => void;
}

export function FloatingActions({
  site,
  orderModalOpen,
  onOpenOrderModal,
  onCloseOrderModal,
}: FloatingActionsProps) {
  const [showBubble, setShowBubble] = useState(false);

  // Show "Fale com a gente" speech bubble after 4 seconds
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowBubble(true);
    }, 4000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!orderModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseOrderModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [orderModalOpen, onCloseOrderModal]);

  const cleanPhone = site.telefone.replace(/\D/g, '');
  const telHref = `tel:${cleanPhone}`;
  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `Olá! Vim pelo site da ${site.nome} e quero fazer um pedido.`
  )}`;
  const hasCustomOrderLink = site.linkPedidos && site.linkPedidos !== '#';
  const hasIfoodLink = site.ifood && site.ifood !== '#';

  return (
    <>
      {/* Floating Green WhatsApp Button with pulse rings, 2s blink, and 4s bubble */}
      <div className="fixed bottom-[68px] md:bottom-6 right-4 md:right-6 z-40 flex items-center gap-3">
        {showBubble && (
          <div className="relative bg-white text-[#1C2B39] text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-2xl shadow-warm-lg border border-[#1C2B39]/10 flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap hover:text-[#F7941D] transition-colors"
            >
              Fale com a gente
            </a>
            <button
              type="button"
              onClick={() => setShowBubble(false)}
              aria-label="Fechar aviso"
              className="text-[#1C2B39]/45 hover:text-[#1C2B39] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:brightness-105 transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C2B39]"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#25D366] animate-wa-ring"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#25D366] animate-wa-ring-delay"
          />
          <MessageCircle className="relative z-10 w-7 h-7 animate-wa-blink" />
        </a>
      </div>

      {/* Mobile Fixed Bottom Bar (<= 56px height to respect 15% mobile sticky cap) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 h-14 bg-white/95 backdrop-blur-md border-t border-[#1C2B39]/12 px-4 flex items-center gap-3 shadow-lg">
        {hasCustomOrderLink ? (
          <a
            href={site.linkPedidos}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-11 rounded-full bg-[#F7941D] hover:bg-[#E8740C] text-white font-bold text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            Pedir
          </a>
        ) : (
          <button
            type="button"
            onClick={onOpenOrderModal}
            className="flex-1 h-11 rounded-full bg-[#F7941D] hover:bg-[#E8740C] text-white font-bold text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            Pedir
          </button>
        )}

        <a
          href={telHref}
          className="flex-1 h-11 rounded-full bg-[#1C2B39] text-white font-bold text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Phone className="w-4 h-4 text-[#FFC93C]" />
          Ligar
        </a>
      </div>

      {/* Quick Order Channel Modal (used when linkPedidos/ifood are placeholder '#') */}
      {orderModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Escolha como fazer seu pedido"
          onClick={onCloseOrderModal}
          className="fixed inset-0 z-50 bg-[#1C2B39]/75 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-[#FFF4E6] p-6 sm:p-8 shadow-warm-lg border border-[#F7941D]/20 relative"
          >
            <button
              type="button"
              onClick={onCloseOrderModal}
              aria-label="Fechar janela de pedido"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-[#1C2B39] hover:bg-[#F7941D] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <p className="font-hand text-2xl text-[#F7941D] leading-none">
              Entrega rápida em {site.cidade}
            </p>
            <h3 className="mt-2 font-display uppercase text-3xl text-[#1C2B39] leading-none">
              COMO QUER <span className="text-[#F7941D]">PEDIR?</span>
            </h3>
            <p className="mt-2 text-sm text-[#1C2B39]/75">
              Escolha o canal de sua preferência. Atendimento: {site.horarios}.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onCloseOrderModal}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#25D366] hover:brightness-105 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-sm transition-all min-h-[48px]"
              >
                <MessageCircle className="w-5 h-5" />
                Pedir pelo WhatsApp
              </a>

              {hasIfoodLink && (
                <a
                  href={site.ifood}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onCloseOrderModal}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#F7941D] hover:bg-[#E8740C] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-sm transition-all min-h-[48px]"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Pedir pelo iFood
                </a>
              )}

              <a
                href={telHref}
                onClick={onCloseOrderModal}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#1C2B39] hover:bg-[#293d50] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-sm transition-all min-h-[48px]"
              >
                <Phone className="w-5 h-5 text-[#FFC93C]" />
                Ligar: {site.telefone}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
