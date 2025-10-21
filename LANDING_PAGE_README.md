# 🛍️ Landing Page SNKHOUSE.COM - Guia Completo

> Landing page performática para a loja online SNKHOUSE, criada em Next.js 14 com Tailwind CSS e Framer Motion.

---

## 📍 Status do Projeto

- **Versão Atual**: 0.6.0 (60% completo)
- **Última Atualização**: 18/10/2025
- **Tecnologias**: Next.js 14.2, React 18, Tailwind CSS, Framer Motion
- **Deploy Planejado**: `lp.snkhouse.com`

---

## 🚀 Quick Start

### 1. Instalar Dependências
```bash
npm install
```

### 2. Rodar Servidor de Desenvolvimento
```bash
npm run dev
```

### 3. Acessar Landing Page
```
http://localhost:3000/store
```
(ou porta alternativa se 3000 estiver em uso)

---

## 📂 Estrutura da Landing Page

### Componentes Principais (`src/components/store/`)

| Componente | Descrição | Status |
|------------|-----------|--------|
| `Header.jsx` | Navegação sticky + Menu mobile | ✅ Completo |
| `StoreHero.jsx` | Hero full-screen com parallax | ✅ Completo |
| `ProductCard.jsx` | Card reutilizável de produto | ✅ Completo |
| `FeaturedProducts.jsx` | Produtos em destaque (grid 3x2) | ✅ Completo |
| `Categories.jsx` | Grid de 5 categorias | ✅ Completo |
| `TravisScottSection.jsx` | Bento Grid Travis Scott | ✅ Completo |
| `StoreFooter.jsx` | Footer completo + Newsletter | ✅ Completo |

### Sections (16 planejadas)

1. ✅ **Header** - Navegação sticky
2. ✅ **Hero** - Banner principal
3. 🔲 **Brands Marquee** - Logos em movimento (pendente)
4. ✅ **Featured Products** - Produtos em destaque
5. ✅ **Travis Scott Collection** - Bento Grid
6. 🔲 **Best Sellers** - Carousel (pendente)
7. 🔲 **Air Jordan 1** - Grid de produtos (pendente)
8. 🔲 **Video/Gallery** - Showcase visual (pendente)
9. 🔲 **Air Jordan 4** - Grid de produtos (pendente)
10. 🔲 **Dunk Low** - Grid de produtos (pendente)
11. 🔲 **Yeezy** - Grid de produtos (pendente)
12. 🔲 **About** - História da SNKHOUSE (pendente)
13. 🔲 **Gallery Bento** - Grid assimétrico (pendente)
14. 🔲 **Testimonials** - Depoimentos (opcional)
15. 🔲 **Newsletter** - Captura de email (pendente)
16. ✅ **Footer** - Links + Social + Copyright

**Progresso**: 7/16 sections (43.75%)

---

## 🎨 Design System

### Paleta de Cores

```javascript
// Cores Principais
const colors = {
  'brand-yellow': '#FAB800',  // Amarelo SNKHOUSE
  'brand-black': '#0A0A0A',   // Preto SNKHOUSE
  'brand-gray': '#AEAEAE',    // Cinza secundário
}
```

### Tipografia

```javascript
// Fontes
const fonts = {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'Courier New', 'monospace'],
}

// Hierarquia de Tamanhos
text-6xl → Hero Principal (SNKHOUSE)
text-4xl → Section Headings
text-2xl → Subsection Headings
text-lg  → Body Text
text-sm  → Captions / Labels
```

### Animações

```javascript
// Framer Motion Variants
fadeInUp     → Fade in + slide up on scroll
staggerFade  → Children fade in sequentially
parallax     → Background parallax effect
scaleIn      → Scale up on hover
```

---

## 📦 Assets & Data

### Imagens (`public/images/`)

| Pasta | Quantidade | Tipo |
|-------|------------|------|
| `hero/` | 2 | Imagens Seedream para Hero |
| `gallery/` | 11 | Imagens Seedream para Gallery |
| `products/` | 41 | Fotos de produtos |
| `categories/` | 5 | Banners de categorias |
| `logo/` | 3 | Logo SNKHOUSE (black, white, full) |

**Total**: 62 imagens (+ 19 outras assets)

### Dados (`data/products.json`)

```json
{
  "products": [ /* 22 produtos mockados */ ],
  "categories": [ /* 5 categorias */ ]
}
```

#### Estrutura de Produto:
```json
{
  "id": 1,
  "name": "Nike Air Jordan 1 Retro High Dior",
  "slug": "nike-air-jordan-1-retro-high-dior",
  "price": 8500,
  "currency": "USD",
  "image": "/images/products/...",
  "category": "air-jordan-1",
  "tags": ["jordan-1", "dior", "luxury"],
  "featured": true,
  "bestSeller": true,
  "stock": "limited"
}
```

---

## 🔗 Integração WooCommerce

Todos os componentes redirecionam corretamente para a loja WooCommerce:

### URLs de Produtos
```javascript
// ProductCard.jsx
const woocommerceUrl = `https://snkhouse.com/product/${product.slug}`
```

### URLs de Categorias
```javascript
// Categories.jsx
const categoryUrl = category.woocommerceUrl
// Ex: https://snkhouse.com/categoria/air-jordan-1
```

### Outros Links
```
Loja Completa → https://snkhouse.com/loja
Carrinho      → https://snkhouse.com/carrito
```

---

## 🎯 Performance Targets

| Métrica | Objetivo | Status |
|---------|----------|--------|
| **Lighthouse Score** | 95+ | 🔄 A testar |
| **LCP** (Largest Contentful Paint) | < 2.5s | 🔄 A otimizar |
| **FID** (First Input Delay) | < 100ms | ✅ OK |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 🔄 A verificar |
| **TTI** (Time to Interactive) | < 3.5s | 🔄 A otimizar |

### Otimizações Aplicadas
- ✅ `next/image` para todas as imagens
- ✅ Animações GPU-accelerated (transform, opacity)
- ✅ Code splitting automático (Next.js)
- 🔲 Lazy loading de sections pesadas (pendente)
- 🔲 WebP conversion (pendente)

---

## 📱 Responsividade

### Breakpoints (Tailwind)
```javascript
sm:   640px  // Mobile landscape
md:   768px  // Tablet portrait
lg:  1024px  // Tablet landscape
xl:  1280px  // Desktop
2xl: 1536px  // Large desktop
```

### Grid Layouts
```
Mobile   (< 768px):  1 coluna
Tablet   (768-1024): 2 colunas
Desktop  (> 1024px): 3-4 colunas
```

### Navigation
- **Desktop**: Horizontal menu
- **Mobile**: Hamburger menu (slide-in lateral)

---

## 🧩 Como Adicionar Novas Sections

### Exemplo: Criar "BestSellers" Section

1. **Criar Componente**:
```bash
touch src/components/store/BestSellers.jsx
```

2. **Implementar**:
```jsx
'use client'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import productsData from '../../../data/products.json'

const BestSellers = () => {
  const bestSellers = productsData.products.filter(p => p.bestSeller)

  return (
    <section className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12">
          Los más <span className="text-brand-yellow">vendidos</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSellers
```

3. **Adicionar à Página**:
```jsx
// src/app/store/page.jsx
import BestSellers from '@/components/store/BestSellers'

export default function StorePage() {
  return (
    <main>
      {/* ... outras sections ... */}
      <BestSellers />
      {/* ... */}
    </main>
  )
}
```

---

## 🛠 Comandos Úteis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento (port 3000)
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # ESLint

# Verificar erros TypeScript (se usar TS)
npx tsc --noEmit

# Análise de bundle
npm run build --analyze
```

---

## 📋 Checklist de Deploy

Antes de fazer deploy para `lp.snkhouse.com`:

- [ ] Implementar todas as 16 sections
- [ ] Otimizar todas as imagens (WebP)
- [ ] Lighthouse audit (95+ em todas as métricas)
- [ ] Testar em devices reais (iOS, Android)
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] SEO metadata completo
- [ ] Open Graph images
- [ ] Sitemap.xml
- [ ] robots.txt
- [ ] Analytics (Google Analytics / Plausible)
- [ ] Error monitoring (Sentry)
- [ ] Configurar DNS `lp.snkhouse.com`
- [ ] SSL/HTTPS
- [ ] Configurar redirects (se necessário)

---

## 🐛 Troubleshooting

### Imagens não carregam
```javascript
// next.config.js - Adicionar domínio permitido
images: {
  domains: ['snkhouse.com'],
}
```

### Erro "Module not found"
```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Porta 3000 em uso
```bash
# Usar porta específica
PORT=3001 npm run dev
```

---

## 📚 Recursos e Referências

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [21st.dev Components](https://21st.dev/community/components)
- [LANDING_PAGE_PLAN.md](./LANDING_PAGE_PLAN.md) - Planejamento completo

---

## 👨‍💻 Desenvolvimento

### Branch Strategy
- `main` → Produção (showroom Palermo)
- `feature/landing-page` → Landing page da loja

### Commits
- ✅ Usar commits descritivos
- ✅ Prefixos: `feat:`, `fix:`, `style:`, `refactor:`
- ✅ Exemplo: `feat: add BestSellers section`

---

**Mantido por**: Você + Claude
**Versão**: 0.6.0
**Licença**: Privado - SNKHOUSE
