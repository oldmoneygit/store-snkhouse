# Meta Pixel - Sistema de Deduplicação de Eventos

## 📋 Visão Geral

Implementamos um sistema avançado de rastreamento do Meta Pixel que combina **Pixel (browser-side)** e **Conversions API (server-side)** com deduplicação automática via `event_id`.

## 🎯 Problema Resolvido

**Antes:** Eventos duplicados aparecendo no Meta Events Manager
**Depois:** Eventos únicos com melhor qualidade de correspondência e deduplicação automática

## 🔧 Arquitetura da Solução

### 1. Cliente (Browser) - Pixel Tracking
- Captura parâmetros avançados: `fbc` (Facebook Click ID), `fbp` (Facebook Browser ID)
- Gera `event_id` único para cada evento
- Envia evento para o Pixel com `event_id`
- Simultaneamente envia para API server-side com mesmo `event_id`

### 2. Servidor (Next.js API Route) - Conversions API
- Recebe dados do cliente via `/api/meta-conversions`
- Adiciona dados server-side (IP, User Agent)
- Envia para Facebook Conversions API com mesmo `event_id`
- Facebook deduplica automaticamente eventos com `event_id` idêntico

## 📁 Arquivos Modificados/Criados

### Novos Arquivos
1. **`src/utils/metaPixelUtils.js`** (300+ linhas)
   - Funções de captura de parâmetros (fbc, fbp)
   - Geração de event_id único
   - Hashing SHA-256 para dados de usuário
   - Formatação de dados de produto/carrinho
   - Função principal `trackPixelEvent()`

2. **`src/components/MetaPixelEvents.jsx`**
   - Componente `ViewContent` (visualização de produto)
   - Funções trigger: `triggerAddToCart`, `triggerInitiateCheckout`, `triggerAddToWishlist`

3. **`src/app/api/meta-conversions/route.js`**
   - API Route para Conversions API
   - Envia eventos server-side para Facebook
   - Usa `META_CONVERSIONS_API_TOKEN` do .env

### Arquivos Modificados
1. **`src/components/MetaPixel.jsx`**
   - Inicializa parâmetros do Facebook no mount
   - PageView tracking com fbc/fbp

2. **`src/app/product/[slug]/page.jsx`**
   - Adicionado `<ViewContent product={product} />`

3. **`src/components/product/ProductInfo.jsx`**
   - `triggerAddToCart(product, quantity)` no botão adicionar ao carrinho

4. **`src/components/cart/CartSummary.jsx`**
   - `triggerInitiateCheckout(cartItems)` no botão de checkout

5. **`src/components/wishlist/WishlistButton.jsx`**
   - `triggerAddToWishlist(product)` ao adicionar favorito

## 🔑 Variáveis de Ambiente

### .env.local (ou .env)
```bash
# Meta Pixel ID
NEXT_PUBLIC_META_PIXEL_ID=1503220410800125

# Token de Acesso da Conversions API
META_CONVERSIONS_API_TOKEN=EAAROK9divmABP5fu1EfmxAZBpanynzTDm1eOwNW8QzWtym2zrcCV5e32IbHU728h4y
```

## 📊 Eventos Rastreados

### 1. PageView
- **Trigger:** Toda mudança de rota
- **Parâmetros:** fbc, fbp
- **Onde:** `MetaPixel.jsx` (useEffect com pathname)

### 2. ViewContent
- **Trigger:** Visualização de página de produto
- **Parâmetros:** content_ids, content_name, content_type, value, currency, fbc, fbp
- **Onde:** `product/[slug]/page.jsx`

### 3. AddToCart
- **Trigger:** Clicar em "Agregar al carrito"
- **Parâmetros:** content_ids, content_name, value, currency, quantity, fbc, fbp
- **Onde:** `ProductInfo.jsx` (botão addToCart)

### 4. InitiateCheckout
- **Trigger:** Clicar em "Proceder al checkout" no carrinho
- **Parâmetros:** content_ids, contents, num_items, value, currency, fbc, fbp
- **Onde:** `CartSummary.jsx` (botão checkout)

### 5. AddToWishlist
- **Trigger:** Adicionar produto aos favoritos
- **Parâmetros:** content_ids, content_name, value, currency, fbc, fbp
- **Onde:** `WishlistButton.jsx`

## 🔄 Fluxo de Deduplicação

```
1. Usuário realiza ação (ex: adiciona produto ao carrinho)
   ↓
2. trackPixelEvent() é chamado
   ↓
3. Gera event_id único: "AddToCart_1234567890_abc123"
   ↓
4. SIMULTANEAMENTE:
   ├─→ Envia para Pixel (browser):
   │   fbq('track', 'AddToCart', {...}, { eventID: "AddToCart_1234567890_abc123" })
   │
   └─→ POST para /api/meta-conversions:
       { eventName, eventData, eventId: "AddToCart_1234567890_abc123", fbc, fbp, ... }
       ↓
       API Route envia para Facebook Conversions API:
       { event_name, event_id: "AddToCart_1234567890_abc123", user_data, custom_data }
   ↓
5. Facebook recebe 2 eventos com MESMO event_id
   ↓
6. Facebook DEDUPLICA automaticamente (mantém apenas 1)
   ↓
7. Meta Events Manager mostra evento ÚNICO ✅
```

## ✅ Como Verificar se Está Funcionando

### 1. Console do Browser (DevTools)
Após realizar uma ação (ex: visualizar produto), você deve ver:
```
Meta Pixel - ViewContent tracked: {
  eventId: "ViewContent_1234567890_abc123",
  content_ids: ["product-slug"],
  fbc: "fb.1.1234567890.AbCdEf...",
  fbp: "fb.1.1234567890.987654321",
  ...
}

Conversions API - ViewContent sent successfully: {
  eventId: "ViewContent_1234567890_abc123",
  eventsReceived: 1,
  fbtrace_id: "xyz..."
}
```

### 2. Meta Events Manager
1. Acesse: https://business.facebook.com/events_manager2
2. Selecione o Pixel 1503220410800125
3. Vá em "Test Events" ou "Event History"
4. Realize ações no site (adicionar ao carrinho, etc)
5. Verifique que cada evento aparece APENAS UMA VEZ
6. Clique no evento e verifique:
   - ✅ `event_id` presente
   - ✅ `fbc` e `fbp` capturados
   - ✅ "Deduplication" status mostrando que evento foi dedupado

### 3. Network Tab (DevTools)
Verifique requisições:
- **Para o Pixel:** `https://www.facebook.com/tr/` (GET/POST)
- **Para sua API:** `POST /api/meta-conversions` (Status 200)
- **Da sua API para Facebook:** Verifique logs do servidor

## 📈 Benefícios Esperados

Segundo a recomendação do Facebook, implementar estes parâmetros avançados resulta em:

✅ **+598% de aumento** em conversões adicionais relatadas
✅ **Melhor qualidade de correspondência** (Match Quality Score)
✅ **Eliminação de eventos duplicados**
✅ **Dados mais precisos** para otimização de campanhas
✅ **Rastreamento confiável** mesmo com bloqueadores de anúncios (via server-side)

## 🛠️ Troubleshooting

### Eventos ainda duplicados?
1. Verifique que `META_CONVERSIONS_API_TOKEN` está configurado em `.env.local`
2. Verifique logs do console para confirmar que `event_id` está sendo gerado
3. Verifique que a API route está respondendo corretamente (Network tab)
4. Aguarde 20-30 minutos para que Facebook processe deduplicação

### Token expirado?
1. Acesse Meta Business Suite > Configurações de Eventos
2. Gere novo token de acesso
3. Atualize `META_CONVERSIONS_API_TOKEN` em `.env.local`
4. Reinicie o servidor Next.js

### Eventos não aparecem no Events Manager?
1. Verifique que Pixel ID está correto: `1503220410800125`
2. Confirme que o domínio está autorizado no Pixel
3. Verifique console do browser por erros do `fbq`
4. Use "Test Events" no Events Manager para debug em tempo real

## 📚 Referências

- [Facebook Conversions API Documentation](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Event Deduplication](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events)
- [Advanced Matching](https://developers.facebook.com/docs/meta-pixel/advanced/advanced-matching)
- [Meta Events Manager](https://business.facebook.com/events_manager2)

---

**Última atualização:** 2025-10-22
**Status:** ✅ Implementado e testado
