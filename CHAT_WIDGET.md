# SNKHOUSE Widget - Chat com IA

## 📋 Visão Geral

Widget de chat flutuante com Inteligência Artificial para suporte ao cliente em tempo real. O agente de IA ajuda os clientes com dúvidas sobre produtos, tamanhos, disponibilidade, preços, e processo de compra.

## ✨ Características

### 🎨 Design
- **Botão amarelo flutuante** com gradiente SNKHOUSE (#fbbf24 → #f59e0b)
- **Ícone de 3 bolinhas** idêntico ao do widget de chat
- **Animações chamativas**: pulso contínuo + efeito ping
- **Responsivo**: Fullscreen em mobile, popup em desktop
- **Posição**: Canto inferior direito (configurável)

### 🤖 Funcionalidades
- **Chat embed**: Iframe do widget hospedado em Vercel
- **Context Awareness**: Envia contexto da página para o bot
- **Toggle suave**: Animação de abertura/fechamento
- **Performance otimizada**: Preconnect + DNS prefetch

### 🧠 Context Awareness

O widget detecta automaticamente o contexto da página e envia para o agente de IA:

#### Homepage (`/`)
```javascript
{
  page: 'home',
  timestamp: '2025-10-22T...',
  url: 'https://snkhouseargentina.com/'
}
```

#### Página de Produto (`/product/[slug]`)
```javascript
{
  page: 'product',
  productSlug: 'nike-air-jordan-1-retro-high-x-travis-scott',
  timestamp: '2025-10-22T...',
  url: 'https://snkhouseargentina.com/product/...'
}
```

#### Página de Coleção (`/collection/[slug]`)
```javascript
{
  page: 'collection',
  collectionSlug: 'travis-scott',
  timestamp: '2025-10-22T...',
  url: 'https://snkhouseargentina.com/collection/travis-scott'
}
```

#### Carrinho (`/carrito`)
```javascript
{
  page: 'cart',
  cartItemsCount: 3,
  cartTotal: 248140.14,
  timestamp: '2025-10-22T...',
  url: 'https://snkhouseargentina.com/carrito'
}
```

#### Outras Páginas
- `/search` → `{ page: 'search' }`
- `/favoritos` → `{ page: 'wishlist' }`

## 📁 Estrutura de Arquivos

### Componente Principal
**`src/components/ChatWidget.jsx`**
- Componente React Client-side
- Gerencia estado aberto/fechado
- Extrai contexto da página
- Comunica com iframe via postMessage
- Estilos CSS-in-JS integrados

### Integração no Layout
**`src/app/layout.js`**
- Import do ChatWidget
- Renderizado dentro de ClientProviders
- Preconnect para otimização

## 🎯 Como Funciona

### 1. Botão Flutuante
```jsx
<button className="snkhouse-widget-button">
  {/* Ícone de chat ou X */}
</button>
```
- Posição fixa no canto inferior direito
- Gradiente amarelo SNKHOUSE
- Animações de pulso e ping
- Hover: aumenta e intensifica sombra

### 2. Iframe do Chat
```jsx
<div className="snkhouse-widget-chat">
  <iframe src="https://snkhouse-bot-widget.vercel.app/embed" />
</div>
```
- Escondido por padrão (`display: none`)
- Abre com animação scale + opacity
- Fullscreen em mobile
- 400x600px em desktop

### 3. Comunicação com o Widget
```javascript
iframe.contentWindow.postMessage({
  type: 'PAGE_CONTEXT',
  source: 'snkhouse',
  data: {
    page: 'product',
    productSlug: '...',
    timestamp: '...'
  }
}, 'https://snkhouse-bot-widget.vercel.app')
```

### 4. Context Awareness
- **Detecta tipo de página**: usePathname do Next.js
- **Extrai dados do carrinho**: useCart hook
- **Envia para o widget**: postMessage quando iframe carrega
- **Atualiza em mudanças**: useEffect monitora pathname e cartItems

## 🚀 Implementação

### Passo 1: Componente Criado
✅ `src/components/ChatWidget.jsx` - Componente completo com:
- Estado para toggle
- Context awareness
- Comunicação iframe
- Estilos e animações

### Passo 2: Integração no Layout
✅ `src/app/layout.js` - Adicionado:
- Import do ChatWidget
- Renderizado no body
- Preconnect para performance

### Passo 3: Build e Deploy
✅ Build bem-sucedido (659/659 páginas)
✅ Pronto para deploy

## 🧪 Como Testar

### 1. Rodar Localmente
```bash
npm run dev
```
Abrir: http://localhost:3000

### 2. Verificar Botão
- ✅ Botão amarelo aparece no canto inferior direito
- ✅ Animação de pulso contínua
- ✅ Hover aumenta o botão

### 3. Abrir Chat
1. Clicar no botão
2. Chat abre com animação suave
3. Iframe carrega widget do Vercel

### 4. Verificar Context Awareness
**Console do Browser (F12):**
```
🚀 SNKHOUSE Widget Context Awareness - Iniciando
✅ Widget iframe carregado
📤 Enviando contexto para widget: { page: "home", ... }
```

**Mudar de página:**
```
🔄 Página mudou, re-enviando contexto
📤 Enviando contexto: { page: "product", productSlug: "...", ... }
```

### 5. Testar Mobile
- Redimensionar janela para < 768px
- Chat deve ocupar tela inteira
- Botão permanece visível

## 🎨 Customização

### Posição do Botão
**Arquivo:** `src/components/ChatWidget.jsx`

**Mudar para esquerda:**
```css
.snkhouse-widget-button {
  bottom: 20px;
  left: 20px;  /* Era right */
}

.snkhouse-widget-chat {
  bottom: 90px;
  left: 20px;  /* Era right */
}
```

### Tamanho do Chat (Desktop)
```css
.snkhouse-widget-chat {
  width: 400px;  /* Ajustar */
  height: 600px; /* Ajustar */
}
```

### Cores do Botão
```css
background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
/* Gradiente amarelo SNKHOUSE */
```

### Desabilitar Animações
Remover ou comentar:
```css
animation: snkhouse-pulse 2s ease-in-out infinite;
```

## 📊 Performance

### Otimizações Implementadas
1. **Preconnect**: DNS lookup antecipado
   ```html
   <link rel="preconnect" href="https://snkhouse-bot-widget.vercel.app" />
   ```

2. **Client-side only**: Componente 'use client'
3. **Lazy loading**: Iframe só carrega quando necessário
4. **CSS-in-JS**: Estilos inline, sem CSS extra

### Métricas Esperadas
- **First Load**: +0 ms (client-side)
- **Bundle size**: ~3-4 KB
- **Iframe load**: ~500-800 ms
- **Total impact**: Mínimo

## 🔧 Troubleshooting

### Botão não aparece
1. Verificar que build foi bem-sucedido
2. Verificar console do browser por erros
3. Confirmar que está em modo client-side

### Iframe não carrega
1. Verificar URL: https://snkhouse-bot-widget.vercel.app/embed
2. Verificar CORS permitido
3. Testar URL diretamente no browser

### Context não está sendo enviado
1. Abrir console (F12)
2. Procurar logs: "📤 Enviando contexto..."
3. Verificar se iframe está carregado antes
4. Verificar se useCart está funcionando

### Mobile não abre fullscreen
1. Verificar media query @media (max-width: 768px)
2. Verificar CSS !important aplicado
3. Testar em dispositivo real ou DevTools mobile

## 🆘 Suporte

### Logs de Debug
O componente emite logs úteis no console:
- ✅ Iframe carregado
- 📤 Contexto enviado
- 🔄 Página mudou
- ⚠️ Avisos (iframe não encontrado)

### Verificar Estado
No console do browser:
```javascript
// Verificar se componente está renderizado
document.querySelector('.snkhouse-widget-button')

// Verificar iframe
document.querySelector('.snkhouse-widget-iframe')

// Estado do chat
document.querySelector('.snkhouse-widget-chat').style.display
```

## 📝 Changelog

### Versão 1.1.1 (2025-10-22)
- ✅ Implementação completa Next.js/React
- ✅ Context awareness funcional
- ✅ Design amarelo SNKHOUSE
- ✅ Animações de pulso e ping
- ✅ Responsivo mobile
- ✅ Performance otimizada

## 🎯 Próximos Passos

1. **Deploy**: Fazer deploy no Vercel
2. **Testar produção**: Verificar funcionamento completo
3. **Monitorar**: Acompanhar uso e feedback
4. **Otimizar**: Ajustar contexto baseado em uso real

---

**URL do Widget:** https://snkhouse-bot-widget.vercel.app/embed
**Versão:** 1.1.1
**Data:** 2025-10-22
**Status:** ✅ Implementado e testado
