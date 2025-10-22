# Correção V2 - Meta Pixel Event Duplication & Missing Events

## 🐛 Problemas Identificados (Screenshot do usuário)

1. **PageView ainda duplicado** - Múltiplos eventos PageView em sequência
2. **SubscribedButtonClick aparecendo** - Evento não desejado (pode ser plugin do Facebook)
3. **AddToCart não disparando** - Evento esperado não aparece
4. **InitiateCheckout não disparando** - Evento esperado não aparece

## 🔍 Causa Raiz - Sistema Antigo Conflitante

### Descoberta Critical: Dois Sistemas em Paralelo!

Encontramos dois sistemas de rastreamento rodando simultaneamente:

1. **Sistema ANTIGO** (SEM event_id):
   - `src/hooks/useMetaPixel.js` - Hook antigo usando `window.fbq()` direto
   - `src/components/HomePageTracking.jsx` - Componente usando o hook antigo
   - `src/app/page.jsx` - Importando e renderizando HomePageTracking

2. **Sistema NOVO** (COM event_id):
   - `src/components/MetaPixelEvents.jsx` - Funções trigger com event_id
   - `src/utils/metaPixelUtils.js` - trackPixelEvent com deduplicação

### Por que isso causava problemas?

```
Cliente abre homepage:
  → Sistema ANTIGO dispara: ViewContent (sem event_id) ❌
  → Sistema NOVO dispara: PageView (com event_id) ✅
  → Facebook não consegue deduplar (IDs diferentes)
  → Resultado: Múltiplos eventos duplicados no Events Manager
```

## ✅ Soluções Implementadas

### 1. Removido Sistema Antigo Completamente

**Arquivos deletados:**
- ❌ `src/hooks/useMetaPixel.js` (deletado)
- ❌ `src/components/HomePageTracking.jsx` (deletado)

**Arquivo modificado:**
- ✅ `src/app/page.jsx` - Removido import e uso de HomePageTracking

**Antes (page.jsx):**
```javascript
import HomePageTracking from '@/components/HomePageTracking'

export default function HomePage() {
  return (
    <main>
      <HomePageTracking /> // ❌ Sistema antigo
      <Header />
      ...
    </main>
  )
}
```

**Depois (page.jsx):**
```javascript
// HomePageTracking removido ✅

export default function HomePage() {
  return (
    <main>
      <Header />
      ...
    </main>
  )
}
```

### 2. Adicionado Logs de Debug Detalhados

**Arquivo modificado:** `src/components/MetaPixelEvents.jsx`

Adicionado try-catch e logs em:
- `triggerAddToCart()`
- `triggerInitiateCheckout()`

**Código atualizado:**
```javascript
export function triggerAddToCart(product, quantity = 1) {
  console.log('[DEBUG] triggerAddToCart called with:', { product: product?.name, quantity })

  if (!product) {
    console.error('[ERROR] triggerAddToCart: product is undefined or null')
    return
  }

  try {
    const eventData = {
      ...formatProductData(product),
      quantity,
    }

    console.log('[DEBUG] AddToCart eventData:', eventData)
    trackPixelEvent('AddToCart', eventData)
  } catch (error) {
    console.error('[ERROR] triggerAddToCart exception:', error)
  }
}

export function triggerInitiateCheckout(cartItems) {
  console.log('[DEBUG] triggerInitiateCheckout called with:', { itemCount: cartItems?.length })

  if (!cartItems || cartItems.length === 0) {
    console.error('[ERROR] triggerInitiateCheckout: cartItems is empty or undefined')
    return
  }

  try {
    const eventData = formatCartData(cartItems)
    console.log('[DEBUG] InitiateCheckout eventData:', eventData)
    trackPixelEvent('InitiateCheckout', eventData)
  } catch (error) {
    console.error('[ERROR] triggerInitiateCheckout exception:', error)
  }
}
```

## 📊 Resultado Esperado

### Antes das Correções:
```
Homepage:
  - PageView (sistema novo)
  - PageView (sistema antigo) ❌
  - ViewContent (sistema antigo) ❌

Adicionar ao carrinho:
  - AddToCart não disparado (conflito?) ❌

Checkout:
  - InitiateCheckout não disparado (conflito?) ❌
```

### Depois das Correções:
```
Homepage:
  - PageView 1x (apenas sistema novo) ✅

Produto:
  - PageView 1x ✅
  - ViewContent 1x ✅

Adicionar ao carrinho:
  - AddToCart 1x ✅
  Console: "[DEBUG] triggerAddToCart called with: { product: 'Nike...', quantity: 1 }"
  Console: "[DEBUG] AddToCart eventData: { content_ids: [...], ... }"
  Console: "Meta Pixel - AddToCart tracked: { eventId: 'AddToCart_...', ... }"

Checkout:
  - InitiateCheckout 1x ✅
  Console: "[DEBUG] triggerInitiateCheckout called with: { itemCount: 2 }"
  Console: "[DEBUG] InitiateCheckout eventData: { content_ids: [...], num_items: 2, ... }"
  Console: "Meta Pixel - InitiateCheckout tracked: { eventId: 'InitiateCheckout_...', ... }"
```

## 🧪 Como Testar

### 1. Fazer Deploy ou Rodar Localmente
```bash
npm run dev
# ou fazer deploy no Vercel
```

### 2. Abrir DevTools Console
F12 > Console tab

### 3. Testar Fluxo Completo

#### Teste 1: Homepage
1. Abrir homepage
2. **Verificar console:**
   ```
   Meta Pixel - PageView tracked: { eventId: "PageView_...", ... }
   ```
3. **Verificar Meta Events Manager:** 1 PageView apenas

#### Teste 2: Visualizar Produto
1. Clicar em qualquer produto
2. **Verificar console:**
   ```
   Meta Pixel - PageView tracked: { eventId: "PageView_...", ... }
   Meta Pixel - ViewContent tracked: { eventId: "ViewContent_...", ... }
   ```
3. **Verificar Meta Events Manager:** 1 PageView + 1 ViewContent

#### Teste 3: Adicionar ao Carrinho
1. Selecionar tamanho
2. Clicar "Agregar al carrito"
3. **Verificar console:**
   ```
   [DEBUG] triggerAddToCart called with: { product: "Nike Air Jordan...", quantity: 1 }
   [DEBUG] AddToCart eventData: { content_ids: [...], value: 299, currency: "USD", ... }
   Meta Pixel - AddToCart tracked: { eventId: "AddToCart_...", ... }
   ```
4. **Verificar Meta Events Manager:** 1 AddToCart

#### Teste 4: Iniciar Checkout
1. Ir para carrinho (/carrito)
2. Clicar "Proceder al checkout"
3. **Verificar console:**
   ```
   [DEBUG] triggerInitiateCheckout called with: { itemCount: 2 }
   [DEBUG] InitiateCheckout eventData: { content_ids: [...], num_items: 2, value: 598, ... }
   Meta Pixel - InitiateCheckout tracked: { eventId: "InitiateCheckout_...", ... }
   ```
4. **Verificar Meta Events Manager:** 1 InitiateCheckout

### 4. Verificar Meta Events Manager
1. https://business.facebook.com/events_manager2
2. Pixel: 1503220410800125
3. "Test Events" ou "Event History"
4. **Confirmar:**
   - ✅ Nenhum evento duplicado
   - ✅ Todos eventos têm event_id
   - ✅ AddToCart aparece quando adiciona produto
   - ✅ InitiateCheckout aparece quando inicia checkout

## 📝 Arquivos Modificados/Deletados

### Deletados (Sistema Antigo):
1. ❌ `src/hooks/useMetaPixel.js`
2. ❌ `src/components/HomePageTracking.jsx`

### Modificados:
1. ✅ `src/app/page.jsx` - Removido HomePageTracking
2. ✅ `src/components/MetaPixelEvents.jsx` - Adicionado debug logs

## 🚨 Sobre o SubscribedButtonClick

**Importante:** O evento `SubscribedButtonClick` que aparecia no screenshot NÃO está no nosso código.

Possíveis causas:
1. **Plugin do Facebook** - Tracking automático de botões de subscribe
2. **Extensão do browser** - Alguma extensão injetando eventos
3. **Outro script** - Algum outro pixel ou script na página

**Ação:** Após fazer deploy desta correção, verificar se `SubscribedButtonClick` ainda aparece. Se sim, investigar outros scripts na página.

## ⏰ Tempo de Processamento

**Aguarde 20-30 minutos** após deploy para que:
- Facebook processe eventos
- Deduplicação seja aplicada
- Events Manager mostre dados atualizados

## ✅ Checklist Final

- [x] Sistema antigo (useMetaPixel) removido
- [x] HomePageTracking deletado
- [x] page.jsx atualizado
- [x] Debug logs adicionados
- [x] Build bem-sucedido (659/659 páginas)
- [ ] Deploy no Vercel/produção
- [ ] Testar em produção com console aberto
- [ ] Verificar Meta Events Manager após 30 min
- [ ] Confirmar AddToCart dispara
- [ ] Confirmar InitiateCheckout dispara
- [ ] Confirmar PageView não duplica

---

**Data:** 2025-10-22
**Versão:** V2 - Fix Final
**Status:** ✅ Pronto para testar
**Build:** ✅ 659/659 páginas geradas com sucesso
