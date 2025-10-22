# Configuração do Meta Pixel (Facebook Pixel)

## 1. Obter o Pixel ID

1. Acesse o **Facebook Events Manager**: https://business.facebook.com/events_manager
2. Selecione seu Pixel ou crie um novo
3. Copie o **Pixel ID** (um número como `123456789012345`)

## 2. Configurar no Projeto

### Desenvolvimento Local:

1. Crie um arquivo `.env.local` na raiz do projeto:
```bash
NEXT_PUBLIC_META_PIXEL_ID=SEU_PIXEL_ID_AQUI
```

2. Reinicie o servidor de desenvolvimento:
```bash
npm run dev
```

### Produção (Vercel):

1. Vá no **Vercel Dashboard** → Seu Projeto → **Settings** → **Environment Variables**
2. Adicione:
   - **Name**: `NEXT_PUBLIC_META_PIXEL_ID`
   - **Value**: Seu Pixel ID
   - **Environment**: Production, Preview, Development
3. Clique em **Save**
4. Faça um novo deploy ou clique em **Redeploy**

## 3. Eventos Rastreados

### Automáticos:
- ✅ **PageView** - Rastreado em toda mudança de página
- ✅ **ViewContent** - Rastreado na homepage

### Disponíveis via Hook:

Use o hook `useMetaPixel` em componentes client-side:

```jsx
'use client'

import { useMetaPixel } from '@/hooks/useMetaPixel'

export default function MeuComponente() {
  const { trackViewContent, trackAddToCart, trackSearch } = useMetaPixel()

  const handleProductView = (product) => {
    trackViewContent(
      product.name,
      [product.id],
      product.price,
      'ARS'
    )
  }

  const handleAddToCart = (product) => {
    trackAddToCart(
      product.name,
      product.id,
      product.price,
      'ARS'
    )
  }

  const handleSearch = (searchQuery) => {
    trackSearch(searchQuery)
  }

  return (
    // Seu componente aqui
  )
}
```

### Eventos Disponíveis:

1. **trackViewContent(contentName, contentIds, value, currency)**
   - Quando usuário visualiza produto ou coleção

2. **trackAddToCart(contentName, contentId, value, currency)**
   - Quando usuário adiciona ao carrinho

3. **trackInitiateCheckout(value, currency, numItems)**
   - Quando usuário inicia checkout

4. **trackPurchase(value, currency, contentIds)**
   - Quando compra é finalizada

5. **trackSearch(searchString)**
   - Quando usuário faz busca

## 4. Testar Configuração

### Extensão Facebook Pixel Helper:

1. Instale a extensão: https://chrome.google.com/webstore (procure "Facebook Pixel Helper")
2. Acesse sua página
3. Clique no ícone da extensão
4. Deve mostrar:
   - ✅ PageView detectado
   - ✅ ViewContent detectado (na homepage)

### Console do Navegador:

Abra o DevTools (F12) e verifique os logs:
```
Meta Pixel - PageView tracked: /
Meta Pixel - ViewContent tracked: { content_name: 'Homepage...', ... }
```

## 5. Test Events no Facebook

1. Vá em **Facebook Events Manager** → **Test Events**
2. Copie o código de teste fornecido
3. Adicione temporariamente no `.env.local`:
```bash
NEXT_PUBLIC_META_PIXEL_TEST_CODE=TEST_CODE_AQUI
```
4. Navegue no site
5. Verifique eventos aparecendo em tempo real no Test Events

## 6. Verificar no Facebook

Após configurar, aguarde algumas horas e verifique:
- **Events Manager** → Seu Pixel → **Overview**
- Deve mostrar eventos sendo recebidos
- PageViews, ViewContent, etc.

## 7. Troubleshooting

### Pixel não aparece?
- Verifique se a variável de ambiente está configurada
- Limpe cache do navegador
- Verifique console do navegador por erros

### Eventos não aparecem no Facebook?
- Aguarde até 20 minutos para propagação
- Verifique se Pixel ID está correto
- Use Test Events para debug em tempo real

### Eventos duplicados?
- Verifique se não tem outro pixel instalado no WordPress
- Desabilite extensões de bloqueio de ads temporariamente

## 8. Próximos Passos

Para rastrear eventos nas páginas do WordPress (produtos, carrinho, checkout):
- Instale o plugin "PixelYourSite" no WordPress
- Use o mesmo Pixel ID
- Configure os eventos de WooCommerce

Dessa forma terá rastreamento completo:
- **Next.js** (homepage) → Meta Pixel via código
- **WordPress** (produtos, carrinho) → Meta Pixel via plugin
