# Correção de Duplicação de Eventos Meta Pixel

## 🐛 Problema Identificado

Eventos do Meta Pixel aparecendo duplicados no Meta Events Manager:
- PageView enviado 2x
- ViewContent enviado 2x
- Outros eventos potencialmente duplicados

## 🔍 Causa Raiz Identificada

### 1. PageView Duplicado
**Problema:** Duas chamadas independentes de PageView:
- `MetaPixelScript.jsx` linha 22: `fbq('track', 'PageView')` hardcoded (SEM event_id)
- `MetaPixel.jsx` linha 33: `window.fbq('track', 'PageView', eventData)` (SEM event_id)

**Resultado:** Facebook recebia 2 PageViews diferentes sem event_id para deduplar.

### 2. ViewContent Disparado Múltiplas Vezes
**Problema:** Componente `ViewContent` renderizava múltiplas vezes devido a:
- Re-renders do React
- Mudanças no objeto `product` (nova referência)
- StrictMode do React (desenvolvimento)

**Resultado:** Mesmo produto disparava ViewContent várias vezes.

### 3. Conversions API Bloqueando Execução
**Problema:** `trackPixelEvent()` aguardava resposta da API com `await`:
```javascript
await sendToConversionsAPI(...)
```

**Resultado:** Possível bloqueio ou timeout causando comportamento inesperado.

## ✅ Soluções Implementadas

### 1. Remover PageView Duplicado do MetaPixelScript
**Arquivo:** `src/components/MetaPixelScript.jsx`

**Antes:**
```javascript
fbq('init', '${pixelId}');
fbq('track', 'PageView'); // ❌ Duplicado!
```

**Depois:**
```javascript
fbq('init', '${pixelId}');
// PageView será rastreado via MetaPixel.jsx com event_id
```

### 2. Usar trackPixelEvent com event_id no MetaPixel
**Arquivo:** `src/components/MetaPixel.jsx`

**Antes:**
```javascript
// Track PageView com parâmetros avançados
window.fbq('track', 'PageView', eventData) // ❌ Sem event_id
```

**Depois:**
```javascript
// Usar trackPixelEvent para garantir event_id e deduplicação
trackPixelEvent('PageView', {}) // ✅ Com event_id único
```

### 3. Proteção contra Disparo Múltiplo no ViewContent
**Arquivo:** `src/components/MetaPixelEvents.jsx`

**Antes:**
```javascript
export function ViewContent({ product }) {
  useEffect(() => {
    if (!product) return
    const eventData = formatProductData(product)
    trackPixelEvent('ViewContent', eventData) // ❌ Pode disparar múltiplas vezes
  }, [product])
  return null
}
```

**Depois:**
```javascript
export function ViewContent({ product }) {
  useEffect(() => {
    if (!product) return

    // ✅ Garantir que dispara apenas UMA vez por produto
    const productId = product.id || product.slug
    const tracked = sessionStorage.getItem(`viewcontent_${productId}`)

    if (!tracked) {
      const eventData = formatProductData(product)
      trackPixelEvent('ViewContent', eventData)

      // Marcar como rastreado nesta sessão
      sessionStorage.setItem(`viewcontent_${productId}`, Date.now().toString())
    }
  }, [product])
  return null
}
```

### 4. Conversions API em Background (Fire-and-Forget)
**Arquivo:** `src/utils/metaPixelUtils.js`

**Antes:**
```javascript
// Aguardar resposta da API (bloqueante)
await sendToConversionsAPI(eventName, fullEventData, eventId, { fbc, fbp })
```

**Depois:**
```javascript
// ✅ Não aguardar resposta (fire-and-forget) para não bloquear
sendToConversionsAPI(eventName, fullEventData, eventId, { fbc, fbp }).catch(err => {
  console.warn('Conversions API failed (non-blocking):', err)
})
```

## 📊 Resultado Esperado

### Antes (Comportamento com Duplicação)
```
Usuário visualiza produto:
  → PageView enviado 2x (MetaPixelScript + MetaPixel)
  → ViewContent enviado 2x+ (múltiplos renders)
  → Meta Events Manager mostra 4+ eventos ❌
```

### Depois (Comportamento Correto)
```
Usuário visualiza produto:
  → PageView enviado 1x com event_id único
  → ViewContent enviado 1x com event_id único
  → Conversions API recebe mesmos eventos com mesmos event_ids
  → Facebook deduplica automaticamente
  → Meta Events Manager mostra 2 eventos ÚNICOS ✅
```

## 🧪 Como Testar

### 1. Limpar Cache e Sessão
```bash
# No DevTools Console
sessionStorage.clear()
# Recarregar página
```

### 2. Abrir Meta Events Manager
1. Acesse: https://business.facebook.com/events_manager2
2. Selecione Pixel: 1503220410800125
3. Vá em "Test Events"

### 3. Testar Fluxo
```
1. Abrir homepage → Deve registrar 1 PageView
2. Clicar em produto → Deve registrar 1 PageView + 1 ViewContent
3. Adicionar ao carrinho → Deve registrar 1 AddToCart
4. Ir para carrinho → Deve registrar 1 PageView
5. Clicar em checkout → Deve registrar 1 InitiateCheckout
```

### 4. Verificar no Console do Browser
Cada evento deve mostrar:
```javascript
Meta Pixel - ViewContent tracked: {
  eventId: "ViewContent_1234567890_abc123", // ✅ event_id presente
  content_ids: ["product-slug"],
  fbc: "fb.1.1234567890.AbCdEf...",
  fbp: "fb.1.1234567890.987654321",
  ...
}
```

### 5. Verificar Deduplicação no Meta Events Manager
Para cada evento:
1. Clique no evento
2. Verifique aba "Details"
3. Confirme:
   - ✅ `event_id` presente
   - ✅ `fbc` e `fbp` presentes
   - ✅ "Event Source" mostrando deduplicação (browser + server)

## 📝 Arquivos Modificados

1. ✅ `src/components/MetaPixelScript.jsx` - Removido PageView duplicado
2. ✅ `src/components/MetaPixel.jsx` - Usando trackPixelEvent com event_id
3. ✅ `src/components/MetaPixelEvents.jsx` - Proteção contra disparo múltiplo
4. ✅ `src/utils/metaPixelUtils.js` - Conversions API em background

## 🎯 Checklist de Verificação

- [x] Remover PageView duplicado do MetaPixelScript
- [x] MetaPixel usar trackPixelEvent com event_id
- [x] Proteção contra ViewContent múltiplo
- [x] Conversions API não bloquear execução
- [x] Build bem-sucedido (659 páginas)
- [ ] Testar em produção
- [ ] Verificar Meta Events Manager (20-30 min após deploy)
- [ ] Confirmar ausência de duplicações

## 🚨 Notas Importantes

1. **SessionStorage para ViewContent:** Eventos ViewContent do mesmo produto só serão rastreados UMA vez por sessão do navegador. Para testar novamente, use `sessionStorage.clear()` no console.

2. **Tempo de Processamento:** Facebook pode levar 20-30 minutos para processar e deduplar eventos. Aguarde este tempo antes de verificar resultados finais.

3. **Test Events:** Use modo "Test Events" no Meta Events Manager para debugging em tempo real.

4. **Conversions API Token:** Certifique-se de que `META_CONVERSIONS_API_TOKEN` está configurado corretamente em `.env.local`.

---

**Data:** 2025-10-22
**Status:** ✅ Correções Implementadas
**Build:** ✅ Bem-sucedido (659/659 páginas)
**Próximo Passo:** Testar em produção e verificar Meta Events Manager
