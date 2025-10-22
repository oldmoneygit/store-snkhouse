/**
 * SNKHOUSE Widget - Chat com IA
 * Versão: 1.1.1 (Next.js)
 * - Botão amarelo com design SNKHOUSE
 * - Ícone idêntico ao widget (3 bolinhas)
 * - Animações de pulso e ping
 * - Chat embed com context awareness
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const iframeRef = useRef(null)
  const pathname = usePathname()
  const { cartItems } = useCart()

  // Extrair contexto da página
  const extractPageContext = () => {
    const context = {
      page: 'home',
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
    }

    // Detectar tipo de página
    if (pathname.startsWith('/product/')) {
      context.page = 'product'
      // Slug do produto
      context.productSlug = pathname.replace('/product/', '')
    } else if (pathname.startsWith('/collection/')) {
      context.page = 'collection'
      context.collectionSlug = pathname.replace('/collection/', '')
    } else if (pathname === '/carrito') {
      context.page = 'cart'
      context.cartItemsCount = cartItems?.length || 0
      const cartTotal = cartItems?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0
      context.cartTotal = cartTotal
    } else if (pathname === '/search') {
      context.page = 'search'
    } else if (pathname === '/favoritos') {
      context.page = 'wishlist'
    } else if (pathname === '/') {
      context.page = 'home'
    }

    return context
  }

  // Enviar contexto para o iframe
  const sendContextToWidget = (context) => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) {
      console.warn('⚠️ Widget iframe não encontrado')
      return
    }

    const message = {
      type: 'PAGE_CONTEXT',
      source: 'snkhouse',
      data: context,
    }

    console.log('📤 Enviando contexto para widget:', context)
    iframeRef.current.contentWindow.postMessage(
      message,
      'https://snkhouse-bot-widget.vercel.app'
    )
  }

  // Quando o iframe carregar, enviar contexto inicial
  const handleIframeLoad = () => {
    console.log('✅ Widget iframe carregado')
    const context = extractPageContext()
    sendContextToWidget(context)
  }

  // Quando a página mudar, atualizar contexto
  useEffect(() => {
    console.log('🔄 Página mudou, re-enviando contexto')
    const context = extractPageContext()
    // Aguardar um pouco para garantir que o iframe está pronto
    setTimeout(() => {
      sendContextToWidget(context)
    }, 500)
  }, [pathname, cartItems])

  // Toggle abrir/fechar
  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Botão flutuante - Design SNKHOUSE (Amarelo) */}
      <button
        onClick={toggleChat}
        className="snkhouse-widget-button"
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat de soporte'}
      >
        {/* Ícone de Chat (3 bolinhas - igual ao widget) */}
        <svg
          className={`snkhouse-widget-icon ${isOpen ? 'hidden' : ''}`}
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>

        {/* Ícone de Fechar (quando aberto) */}
        <svg
          className={`snkhouse-widget-icon ${!isOpen ? 'hidden' : ''}`}
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Chat iframe */}
      <div className={`snkhouse-widget-chat ${isOpen ? 'open' : ''}`}>
        <iframe
          ref={iframeRef}
          src="https://snkhouse-bot-widget.vercel.app/embed"
          className="snkhouse-widget-iframe"
          allow="clipboard-write"
          onLoad={handleIframeLoad}
          title="SNKHOUSE Chat de Soporte"
        />
      </div>

      <style jsx>{`
        /* Botão flutuante - Design SNKHOUSE */
        .snkhouse-widget-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          border: none;
          box-shadow: 0 4px 16px rgba(251, 191, 36, 0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 999999;
          animation: snkhouse-pulse 2s ease-in-out infinite;
        }

        .snkhouse-widget-button::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          animation: snkhouse-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          z-index: -1;
        }

        .snkhouse-widget-button:hover {
          transform: scale(1.15);
          box-shadow: 0 8px 24px rgba(251, 191, 36, 0.6);
          animation: none;
        }

        .snkhouse-widget-icon {
          color: #000000;
          transition: all 0.2s ease;
        }

        .snkhouse-widget-icon.hidden {
          display: none;
        }

        /* Chat iframe */
        .snkhouse-widget-chat {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 400px;
          height: 600px;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          background: white;
          overflow: hidden;
          display: none;
          transform: scale(0.9);
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 999998;
        }

        .snkhouse-widget-chat.open {
          display: block;
          transform: scale(1);
          opacity: 1;
        }

        .snkhouse-widget-iframe {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 16px;
        }

        /* Animações */
        @keyframes snkhouse-pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes snkhouse-ping {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          75%,
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .snkhouse-widget-chat {
            width: 100vw !important;
            height: 100vh !important;
            bottom: 0 !important;
            right: 0 !important;
            left: 0 !important;
            border-radius: 0 !important;
          }

          .snkhouse-widget-button {
            bottom: 20px !important;
            right: 20px !important;
          }
        }
      `}</style>
    </>
  )
}
