# Guia de Migração - SNKHOUSE Showroom

## 🎯 Objetivo

Este showroom Next.js foi desenvolvido para ser migrado e integrado ao site WordPress existente em **snkhouse.com**. O showroom funciona como uma página de demonstração dos produtos seedream (imagens melhoradas) e redireciona para o WooCommerce para finalização de compras.

## 📋 Status do Projeto

### ✅ Completamente Funcional

**Todas as páginas testadas e funcionando (200 OK):**
- ✅ Homepage com Hero, BestSellers, Categorias
- ✅ 14 Coleções de produtos
- ✅ Página de produto individual
- ✅ Carrinho de compras
- ✅ 8 Páginas institucionais
- ✅ Busca de produtos
- ✅ Navegação 100% local (sem redirects externos)

## 🗂️ Estrutura de Dados

### Produtos Seedream (Homepage Showcase)
- **IDs:** 53-85 (33 produtos com imagens otimizadas)
- **Característica:** `seedreamVersion: true`
- **Uso:** Exibidos APENAS na homepage em carrosséis
- **Imagens:** `/public/images/products/seedream-*.jpg`

### Produtos WooCommerce (Catálogo)
- **IDs:** 1-52, 86+ (620+ produtos)
- **Característica:** Links externos para WooCommerce
- **Uso:** Exibidos nas páginas de coleção
- **Redirecionamento:** Para `snkhouse.com/product/[slug]` ao clicar

## 📦 Coleções Disponíveis (16 total)

### Principais
1. `/collection/travis-scott` - Travis Scott (24 produtos)
2. `/collection/yeezy` - Adidas Yeezy (69 produtos)

### Air Jordan por Tipo
3. `/collection/jordan-low` - Air Jordan Low
4. `/collection/jordan-mid` - Air Jordan Mid
5. `/collection/jordan-high` - Air Jordan High
6. `/collection/air-jordan-1` - Air Jordan 1 (213 produtos)

### Air Jordan por Número
7. `/collection/air-jordan-2` - Air Jordan 2 (1 produto)
8. `/collection/air-jordan-3` - Air Jordan 3 (18 produtos)
9. `/collection/air-jordan-4` - Air Jordan 4 (46 produtos)
10. `/collection/air-jordan-5` - Air Jordan 5 (15 produtos)
11. `/collection/air-jordan-6` - Air Jordan 6 (7 produtos)
12. `/collection/air-jordan-11` - Air Jordan 11 (9 produtos)

### Outras
13. `/collection/air-force` - Air Force (16 produtos)
14. `/collection/air-force-1` - Air Force 1 (16 produtos)
15. `/collection/dunk-sb` - Dunk SB (214 produtos)
16. `/collection/dunk-low` - Dunk Low (214 produtos)

## 🎨 Assets e Otimizações

### Imagens Otimizadas
- **Formato:** WebP automático via Next.js
- **Cache:** 1 ano configurado
- **Seedream:** 33 imagens de alta qualidade
- **Banners:** 8 banners de coleção
- **Limpeza:** 87 imagens não utilizadas removidas

### Performance
- **Mobile-first:** Textos e componentes responsivos
- **Slow connections:** Animações desabilitadas em 2G/3G
- **Hero height:** 70vh mobile → 100vh desktop
- **Lazy loading:** Imagens carregadas sob demanda

## 📱 Páginas Disponíveis

### Homepage (`/`)
- Hero Section com imagem panorâmica
- BestSellers Carousel (32 produtos seedream)
- HowItWorks (COMPRA 1 LLEVA 2)
- Categories Grid (6 categorias)
- Travis Scott Section
- Dual Banner Section
- Air Jordan 1 Section
- Air Jordan 4 Section
- Dunk Low Section
- Yeezy Section
- Seedream Gallery
- Featured Products
- Customer Feedbacks
- Need Help Banner
- Footer

### Páginas Dinâmicas
- `/collection/[slug]` - 16 coleções
- `/product/[slug]` - Produtos individuais
- `/search?q=[termo]` - Busca

### Páginas Estáticas
- `/carrito` - Carrinho de compras
- `/contactanos` - Contato
- `/guia-de-tallas` - Guia de tamanhos (BR/ARG 35-45)
- `/preguntas-frecuentes` - FAQ
- `/politica-de-cambios-y-devoluciones` - Política de trocas
- `/politica-de-seguridad-y-privacidad` - Política de privacidade
- `/plazo-de-entrega` - Prazo de entrega
- `/seguimiento-de-pedido` - Rastreamento

## 🔧 Configuração para Export WordPress

### next.config.js
```javascript
const isWordPressExport = process.env.NEXT_PUBLIC_WP_EXPORT === 'true'

module.exports = {
  output: isWordPressExport ? 'export' : undefined,
  basePath: isWordPressExport ? '/showroom' : '',
  trailingSlash: true,
  images: {
    loader: isWordPressExport ? 'custom' : undefined,
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  }
}
```

### Build para WordPress
```bash
# 1. Configurar variável de ambiente
NEXT_PUBLIC_WP_EXPORT=true npm run build

# 2. Conteúdo será gerado em /out
# 3. Upload para WordPress em /wp-content/showroom/
```

## 🔗 Integração com WooCommerce

### Produtos Seedream (Homepage)
- **Exibição:** Apenas na homepage
- **Clique:** Redireciona para `/product/[slug]` (local)
- **Página do produto:** Mostra galeria e botão para WooCommerce

### Produtos WooCommerce (Coleções)
- **Exibição:** Páginas de coleção
- **Clique:** Redireciona diretamente para `snkhouse.com/product/[slug]`
- **Não usa:** Imagens locais (imagens do WooCommerce via URL)

### Fluxo de Compra
```
Homepage → Produto Seedream (local) → WooCommerce (externo)
         ↓
Collection → Produto WooCommerce (direto ao externo)
```

## 📊 Dados do Sistema

### Arquivo Principal
**`data/products.json`**
- 653 produtos total
- 16 categorias configuradas
- Estrutura: products[], categories[]

### Componentes Principais
```
src/
├── app/
│   ├── page.jsx (Homepage)
│   ├── collection/[slug]/page.jsx
│   ├── product/[slug]/page.jsx
│   └── [páginas estáticas]/page.jsx
├── components/
│   ├── store/ (componentes da loja)
│   ├── product/ (página de produto)
│   ├── collection/ (página de coleção)
│   └── cart/ (carrinho)
└── utils/
    ├── getCollectionData.js (lógica de coleções)
    └── getProductBySlug.js (busca produtos)
```

## 🚀 Deploy

### Desenvolvimento Local
```bash
npm run dev
# http://localhost:3000
```

### Build para Produção WordPress
```bash
# 1. Ativar modo export
export NEXT_PUBLIC_WP_EXPORT=true  # Linux/Mac
set NEXT_PUBLIC_WP_EXPORT=true     # Windows

# 2. Build
npm run build

# 3. Arquivos em /out pronto para upload
```

### Upload para WordPress
1. Fazer build com `NEXT_PUBLIC_WP_EXPORT=true`
2. Upload da pasta `/out` para `/wp-content/showroom/`
3. Criar página WordPress que aponta para `/showroom/index.html`
4. Configurar rewrite rules para URLs limpas (opcional)

## ⚙️ Meta Pixel & Analytics

### Configurado
- Meta Pixel ID: 1724528428093370
- Eventos: PageView, ViewContent, AddToCart
- Components: HomePageTracking, MetaPixel

## 🎯 Próximos Passos para Produção

1. ✅ **Testes locais concluídos**
2. ⏳ **Build para WordPress** (`NEXT_PUBLIC_WP_EXPORT=true npm run build`)
3. ⏳ **Upload para servidor WordPress**
4. ⏳ **Configurar redirects** (se necessário)
5. ⏳ **Testar em produção**
6. ⏳ **Configurar cache** (Cloudflare/servidor)

## 📞 Suporte

- Todas as páginas testadas e funcionando
- Navegação 100% local
- Imagens otimizadas (WebP)
- Performance otimizada para mobile
- Pronto para migração!

---

**Desenvolvido com Next.js 14.2.33 + React 18**
**Status: ✅ PRONTO PARA MIGRAÇÃO**
