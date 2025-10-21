# 🚀 LANDING PAGE SNKHOUSE.COM - PLANEJAMENTO COMPLETO

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Especificações Técnicas](#especificações-técnicas)
3. [Arquitetura de Sections](#arquitetura-de-sections)
4. [Identidade Visual](#identidade-visual)
5. [Componentes 21st.dev Selecionados](#componentes-21stdev-selecionados)
6. [Sistema de Animações](#sistema-de-animações)
7. [Estratégia de Responsividade](#estratégia-de-responsividade)
8. [Integração com WooCommerce](#integração-com-woocommerce)
9. [Performance & SEO](#performance--seo)
10. [Roadmap de Implementação](#roadmap-de-implementação)

---

## 🎯 Visão Geral

### Objetivo
Criar uma landing page performática e moderna em **Next.js 15** que serve como vitrine principal da SNKHOUSE, replicando fielmente a página atual do WordPress/Elementor, porém com:
- ⚡ Performance superior (100% Lighthouse)
- 📱 Responsividade impecável
- ✨ Animações e micro-interações avançadas
- 🎨 Identidade visual aprimorada
- 🔗 Integração perfeita com WooCommerce

### URLs
- **Landing Page (Nova)**: `lp.snkhouse.com`
- **Loja WooCommerce (Atual)**: `snkhouse.com`
- **Redirects**: Todos os produtos redirecionam para `snkhouse.com/product/{slug}`

### Comportamento
A landing page funciona como **vitrine de entrada**, onde o cliente:
1. Navega pelas categorias e produtos em destaque
2. Clica em qualquer produto/categoria
3. É redirecionado para a loja WooCommerce completa

---

## 🛠 Especificações Técnicas

### Stack
```typescript
{
  "framework": "Next.js 15",
  "styling": "Tailwind CSS + Framer Motion",
  "components": "shadcn/ui + 21st.dev adaptados",
  "fonts": "Geist Sans + Geist Mono",
  "animations": "Framer Motion + GSAP (se necessário)",
  "images": "Next/Image (otimizado)",
  "deployment": "Vercel",
  "subdomain": "lp.snkhouse.com"
}
```

### Estrutura de Pastas
```
src/
├── app/
│   ├── layout.tsx (Root layout)
│   ├── page.tsx (Landing page)
│   └── globals.css
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── Categories.tsx
│   │   ├── TravisScott.tsx
│   │   ├── BestSellers.tsx
│   │   ├── AirJordan1.tsx
│   │   ├── AirJordan4.tsx
│   │   ├── DunkLow.tsx
│   │   ├── Yeezy.tsx
│   │   ├── About.tsx
│   │   ├── Gallery.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Newsletter.tsx
│   │   └── Footer.tsx
│   ├── ui/ (shadcn components)
│   ├── motion/ (animações reutilizáveis)
│   └── products/
│       ├── ProductCard.tsx
│       ├── ProductCarousel.tsx
│       └── ProductGrid.tsx
├── lib/
│   ├── utils.ts
│   ├── animations.ts
│   └── woocommerce.ts (helpers de redirect)
├── public/
│   └── images/
│       ├── hero/
│       ├── products/
│       ├── categories/
│       └── seedream/ (imagens geradas)
└── types/
    └── product.ts
```

---

## 📐 Arquitetura de Sections

### Overview (16 Sections Estimadas)

| # | Section | Descrição | Componente 21st.dev | Animação |
|---|---------|-----------|---------------------|----------|
| 1 | **Header/Navbar** | Logo + Menu + Carrinho + Search | Custom Dock Menu | Slide Down |
| 2 | **Hero** | Banner principal full-screen | Pulse Fit Hero (adaptado) | Parallax + Fade |
| 3 | **Brands Marquee** | Logos de marcas em movimento | Custom Marquee | Infinite Scroll |
| 4 | **Featured Products** | 4-6 produtos em destaque | Product Card 3 | Stagger Fade |
| 5 | **Travis Scott x Jordan** | Section exclusiva categoria | Bento Monochrome 1 | Reveal on Scroll |
| 6 | **Los más vendidos** | Best sellers carousel | Product Card 2 | Carousel + Hover |
| 7 | **Air Jordan 1** | Categoria AJ1 | Product Grid | Grid Fade In |
| 8 | **Video/Image Showcase** | Vídeo ou imagem Seedream | Custom Fullwidth | Video Autoplay |
| 9 | **Air Jordan 4** | Categoria AJ4 | Product Grid | Grid Fade In |
| 10 | **Dunk Low** | Categoria Dunk | Product Grid | Grid Fade In |
| 11 | **Adidas Yeezy** | Categoria Yeezy | Product Grid | Grid Fade In |
| 12 | **About/Story** | História da SNKHOUSE | Team Section 1 (adaptado) | Text Reveal |
| 13 | **Gallery Bento** | Grid de imagens exclusivas | Bento Monochrome | Hover Expand |
| 14 | **Testimonials** | Depoimentos de clientes | Custom Carousel | Fade Carousel |
| 15 | **Newsletter** | Captura de email | Custom Form | Slide Up |
| 16 | **Footer** | Links + Social + Copyright | Footer Component | Fade In |

---

## 🎨 Identidade Visual

### Paleta de Cores

#### Cores Primárias (da SNKHOUSE atual)
```css
--snk-yellow: #FAB800;      /* Amarelo principal */
--snk-black: #0A0A0A;       /* Preto principal */
--snk-white: #FFFFFF;       /* Branco principal */
```

#### Cores Secundárias (a extrair da página atual)
```css
--snk-gray-dark: #1A1A1A;   /* Backgrounds escuros */
--snk-gray-medium: #333333; /* Textos secundários */
--snk-gray-light: #F5F5F5;  /* Backgrounds claros */
--snk-red: #DC2626;         /* Destaques/Promoções */
```

#### Gradientes
```css
--gradient-hero: linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%);
--gradient-yellow: linear-gradient(135deg, #FAB800 0%, #FFD700 100%);
--gradient-overlay: linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.9) 100%);
```

### Tipografia

#### Fontes Principais
```typescript
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

// Hierarquia
const typography = {
  h1: 'text-6xl md:text-8xl font-bold tracking-tight',
  h2: 'text-4xl md:text-6xl font-bold tracking-tight',
  h3: 'text-3xl md:text-4xl font-semibold',
  h4: 'text-2xl md:text-3xl font-semibold',
  body: 'text-base md:text-lg',
  small: 'text-sm md:text-base',
  caption: 'text-xs md:text-sm font-mono uppercase tracking-wide'
};
```

#### Manter do WordPress
- **Fonte de títulos**: Verificar na página atual (provavelmente Montserrat ou similar)
- **Fonte de corpo**: Verificar na página atual (provavelmente Open Sans ou similar)
- **Peso de fontes**: Bold para CTAs, Regular para textos

### Estilo de Botões

#### Primário (CTA Principal)
```tsx
<button className="
  bg-snk-yellow text-snk-black
  px-8 py-4 rounded-full
  font-bold uppercase tracking-wide
  hover:bg-yellow-500 hover:scale-105
  transition-all duration-300
  shadow-lg hover:shadow-2xl
">
  Comprar Agora
</button>
```

#### Secundário
```tsx
<button className="
  bg-transparent border-2 border-snk-white text-snk-white
  px-8 py-4 rounded-full
  font-bold uppercase tracking-wide
  hover:bg-snk-white hover:text-snk-black
  transition-all duration-300
">
  Ver Mais
</button>
```

#### Ghost (Links)
```tsx
<button className="
  text-snk-white underline underline-offset-4
  hover:text-snk-yellow
  transition-colors duration-300
">
  Ver Todos →
</button>
```

### Cards de Produto

#### Estilo Base (manter similar ao WordPress)
```tsx
interface ProductCardStyle {
  aspectRatio: '1:1' | '3:4';
  borderRadius: '0.75rem'; // rounded-xl
  shadow: 'hover:shadow-2xl';
  overlay: 'gradient-overlay on hover';
  transition: 'transform 300ms ease-out';
  hoverScale: 1.05;
}
```

---

## 🎭 Componentes 21st.dev Selecionados

### 1. Hero Section - Pulse Fit Hero (Adaptado)
**Referência**: `dhileepkumargm/pulse-fit-hero`
**Adaptações**:
- Substituir conteúdo fitness por sneakers
- Manter animação de pulso no CTA
- Background: imagem Seedream full-screen
- Overlay escuro com gradiente
- Logo centralizada ou top-left
- Heading: "SNEAKERS EXCLUSIVOS" + subheading
- CTA: "Explorar Coleção"

**Código Base** (a ser adaptado):
```tsx
<section className="relative h-screen w-full overflow-hidden">
  <Image
    src="/images/seedream/hero-1.jpg"
    fill
    className="object-cover"
    priority
  />
  <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
  <div className="relative z-10 flex flex-col items-center justify-center h-full">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-8xl font-bold text-white mb-4"
    >
      SNKHOUSE
    </motion.h1>
    <motion.p className="text-2xl text-snk-yellow mb-8">
      Sneakers Exclusivos para Colecionadores
    </motion.p>
    <PulseButton />
  </div>
</section>
```

---

### 2. Product Cards - Product Card 3
**Referência**: `ravikatiyar/product-card-3`
**Uso**: Featured Products, Best Sellers
**Adaptações**:
- Cores SNKHOUSE (amarelo/preto)
- Botão "Comprar" redireciona para WooCommerce
- Hover effect com scale + shadow
- Badge de "Novo" ou "Destaque"

---

### 3. Product Cards - Product Card 2
**Referência**: `ravikatiyar/product-card-2`
**Uso**: Categorias específicas (AJ1, AJ4, Dunk, Yeezy)
**Adaptações**:
- Layout mais compacto
- Quick view on hover
- Preço em destaque

---

### 4. Bento Grid - Bento Monochrome
**Referência**: `reapollo/bento-monochrome`
**Uso**: Gallery de imagens exclusivas, Travis Scott section
**Adaptações**:
- Grid assimétrico
- Imagens Seedream
- Hover effect com zoom
- Alguns cards com texto overlay

**Estrutura**:
```tsx
<div className="grid grid-cols-4 grid-rows-3 gap-4 h-screen p-4">
  <div className="col-span-2 row-span-2 bg-cover" style={{backgroundImage: 'url(...)'}} />
  <div className="col-span-2 row-span-1 bg-cover" style={{backgroundImage: 'url(...)'}} />
  <div className="col-span-1 row-span-1 bg-cover" style={{backgroundImage: 'url(...)'}} />
  {/* ... mais cards */}
</div>
```

---

### 5. Footer - Footer Component
**Referência**: `ravikatiyar/footer`
**Adaptações**:
- Logo SNKHOUSE
- Links: Sobre, Contato, Termos, Privacidade
- Social: Instagram, WhatsApp, TikTok
- Copyright
- Newsletter signup inline

---

### 6. Navigation - Dock Menu
**Referência**: `uimix/dock`
**Uso**: Header/Navigation fixo
**Adaptações**:
- Ícones minimalistas
- Logo left, menu center, cart/search right
- Sticky on scroll
- Backdrop blur

**Estrutura**:
```tsx
<header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg">
  <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
    <Logo />
    <Menu items={['Inicio', 'Categorías', 'Sobre', 'Contato']} />
    <Actions cart search />
  </nav>
</header>
```

---

### 7. Theme Toggle (Opcional)
**Referência**: `arunachalam0606/vertical-theme-wipe-toggle`
**Uso**: Se quiser dark/light mode (opcional)
**Nota**: SNKHOUSE é predominantemente dark, mas pode ser útil para acessibilidade

---

### 8. Team Section (Adaptado para About)
**Referência**: `ravikatiyar/team-section-1`
**Uso**: Section "Sobre a SNKHOUSE"
**Adaptações**:
- Em vez de team, mostrar "Nossa História"
- Founder/Story
- Valores: Autenticidade, Exclusividade, Paixão

---

## 🎬 Sistema de Animações

### Princípios
1. **Smooth & Subtle**: Animações suaves que não distraem
2. **Purpose-Driven**: Cada animação guia o olhar do usuário
3. **Performance First**: 60fps, GPU-accelerated (transform, opacity)
4. **Progressive**: Funciona sem JS (graceful degradation)

### Biblioteca de Animações

#### 1. Scroll-Based Animations (Framer Motion)
```tsx
// src/lib/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
  viewport: { once: true, amount: 0.3 }
};

export const staggerContainer = {
  initial: {},
  whileInView: {},
  transition: { staggerChildren: 0.1 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: 'easeOut' },
  viewport: { once: true }
};
```

#### 2. Hover Animations
```tsx
// Product Card Hover
export const productHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};

// Button Hover
export const buttonHover = {
  scale: 1.05,
  boxShadow: '0 10px 40px rgba(250, 184, 0, 0.3)'
};
```

#### 3. Page Transitions
```tsx
// Layout transitions
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};
```

#### 4. Parallax (Hero Background)
```tsx
import { useScroll, useTransform } from 'framer-motion';

const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 500], [0, 150]);

<motion.div style={{ y }} />
```

#### 5. Infinite Marquee (Brands)
```tsx
// Marquee de logos
export const marqueeAnimation = {
  animate: {
    x: ['0%', '-100%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 20,
        ease: 'linear'
      }
    }
  }
};
```

### Timing Functions
```css
/* Tailwind config */
theme: {
  transitionTimingFunction: {
    'snk-ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'snk-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
}
```

---

## 📱 Estratégia de Responsividade

### Breakpoints
```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet portrait
  lg: '1024px',  // Tablet landscape
  xl: '1280px',  // Desktop
  '2xl': '1536px' // Large desktop
};
```

### Mobile-First Approach

#### Grid Layouts
```tsx
// Desktop: 4 colunas | Tablet: 2 colunas | Mobile: 1 coluna
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
```

#### Typography Scaling
```tsx
// Headings escalam automaticamente
<h1 className="text-4xl md:text-6xl xl:text-8xl">
```

#### Navigation
- **Desktop**: Horizontal menu
- **Tablet**: Horizontal menu compacto
- **Mobile**: Hamburger menu (drawer lateral)

#### Product Cards
- **Desktop**: Hover effects + quick view
- **Mobile**: Tap para detalhes, swipe gestures

### Imagens Responsivas
```tsx
<Image
  src="/products/jordan-1.jpg"
  alt="Air Jordan 1"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
  width={800}
  height={800}
  className="object-cover"
/>
```

### Touch Interactions (Mobile)
- Swipe horizontal em carousels
- Pull-to-refresh (se aplicável)
- Haptic feedback em botões (iOS/Android)
- Botões com min-height 44px (touch target)

---

## 🔗 Integração com WooCommerce

### Fluxo de Redirecionamento

#### 1. Links de Produtos
```tsx
// components/products/ProductCard.tsx
interface ProductCardProps {
  slug: string; // Ex: "neckface-x-nike-sb-dunk-low-halloween"
  // ... outros props
}

const ProductCard = ({ slug, ...props }) => {
  const woocommerceUrl = `https://snkhouse.com/product/${slug}`;

  return (
    <a href={woocommerceUrl} className="block">
      {/* Card content */}
    </a>
  );
};
```

#### 2. Links de Categorias
```tsx
const categoryLinks = {
  'travis-scott': 'https://snkhouse.com/categoria/travis-scott',
  'air-jordan-1': 'https://snkhouse.com/categoria/air-jordan-1',
  'air-jordan-4': 'https://snkhouse.com/categoria/air-jordan-4',
  'dunk-low': 'https://snkhouse.com/categoria/dunk-low',
  'yeezy': 'https://snkhouse.com/categoria/adidas-yeezy'
};
```

#### 3. Botões CTA
```tsx
// "Ver Todos" -> Loja completa
<a href="https://snkhouse.com/loja">Ver Todos os Produtos</a>

// "Comprar Agora" -> Produto específico
<a href={`https://snkhouse.com/product/${slug}`}>Comprar Agora</a>
```

### Data Fetching (Opcional)

Se quiser buscar produtos reais do WooCommerce (via API):

```typescript
// lib/woocommerce.ts
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: "https://snkhouse.com",
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3"
});

export async function getFeaturedProducts() {
  const response = await api.get("products", {
    featured: true,
    per_page: 8
  });
  return response.data;
}
```

**Nota**: Se não quiser integrar a API agora, pode usar produtos **mockados** com dados estáticos e só fazer os redirects funcionarem.

---

## ⚡ Performance & SEO

### Performance Targets
- **Lighthouse Score**: 95+ em todas as métricas
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTI** (Time to Interactive): < 3.5s

### Otimizações

#### 1. Imagens
```tsx
// Next/Image com otimização automática
<Image
  src="/products/jordan-1.jpg"
  alt="Air Jordan 1"
  width={800}
  height={800}
  quality={85} // Balanço entre qualidade e tamanho
  loading="lazy" // Lazy load por padrão
  placeholder="blur" // Blur placeholder
  blurDataURL="data:image/..." // Gerado automaticamente
/>
```

#### 2. Fonts
```typescript
// app/layout.tsx - Preload fonts
import { GeistSans } from 'geist/font/sans';

export const metadata = {
  other: {
    'font-display': 'swap'
  }
};
```

#### 3. Code Splitting
```tsx
// Lazy load sections pesadas
const HeavySection = dynamic(() => import('@/components/sections/Gallery'), {
  loading: () => <Skeleton />,
  ssr: false // Só carrega no cliente se necessário
});
```

#### 4. Caching
```typescript
// next.config.js
module.exports = {
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 ano
  },
  headers: async () => [
    {
      source: '/images/:all*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    }
  ]
};
```

### SEO

#### Metadata
```tsx
// app/layout.tsx
export const metadata = {
  title: 'SNKHOUSE - Sneakers Exclusivos e Autênticos',
  description: 'Descubra os sneakers mais exclusivos do mercado. Air Jordan, Nike Dunk, Yeezy e mais. Autenticidade garantida.',
  keywords: 'sneakers, jordan, nike, yeezy, tenis exclusivos, snkhouse',
  openGraph: {
    title: 'SNKHOUSE - Sneakers Exclusivos',
    description: 'Descubra os sneakers mais exclusivos do mercado',
    images: ['/og-image.jpg'],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SNKHOUSE - Sneakers Exclusivos',
    description: 'Descubra os sneakers mais exclusivos do mercado',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://lp.snkhouse.com'
  }
};
```

#### Structured Data (JSON-LD)
```tsx
// components/StructuredData.tsx
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "SNKHOUSE",
  "image": "https://lp.snkhouse.com/logo.jpg",
  "description": "Tienda de sneakers exclusivos",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "AR"
  },
  "url": "https://snkhouse.com"
};
```

---

## 🗓 Roadmap de Implementação

### Fase 1: Setup & Fundação (Dia 1-2)
- [ ] Setup Next.js 15 + Tailwind CSS
- [ ] Instalar shadcn/ui components
- [ ] Configurar Framer Motion
- [ ] Setup sistema de cores e tipografia
- [ ] Criar layout base (Header + Footer)
- [ ] Configurar pasta de imagens

### Fase 2: Header & Hero (Dia 2-3)
- [ ] Implementar Header/Navigation
- [ ] Adaptar Dock Menu do 21st.dev
- [ ] Criar Hero Section com imagem Seedream
- [ ] Implementar animações parallax
- [ ] Responsividade mobile (hamburger menu)

### Fase 3: Sections de Produtos (Dia 3-5)
- [ ] Featured Products (Product Card 3)
- [ ] Best Sellers carousel
- [ ] Travis Scott x Jordan (Bento Grid)
- [ ] Air Jordan 1 section
- [ ] Air Jordan 4 section
- [ ] Dunk Low section
- [ ] Yeezy section

### Fase 4: Sections de Conteúdo (Dia 5-6)
- [ ] Brands Marquee
- [ ] Video/Image Showcase
- [ ] About/Story section
- [ ] Gallery Bento Grid
- [ ] Testimonials (se aplicável)

### Fase 5: Footer & Extras (Dia 6-7)
- [ ] Footer completo (links, social, newsletter)
- [ ] Newsletter form
- [ ] WhatsApp floating button
- [ ] Scroll to top button
- [ ] Loading states

### Fase 6: Integração WooCommerce (Dia 7-8)
- [ ] Configurar redirects de produtos
- [ ] Configurar redirects de categorias
- [ ] Testar todos os links
- [ ] (Opcional) Integrar API WooCommerce para produtos reais

### Fase 7: Polimento & Performance (Dia 8-10)
- [ ] Otimizar todas as imagens
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Lighthouse audit e correções
- [ ] Cross-browser testing
- [ ] Mobile testing em devices reais

### Fase 8: Deploy & DNS (Dia 10)
- [ ] Deploy na Vercel
- [ ] Configurar subdomínio lp.snkhouse.com
- [ ] SSL/HTTPS
- [ ] Analytics (Google Analytics / Plausible)
- [ ] Monitoramento de erros (Sentry)

---

## 📦 Próximos Passos

### Agora
1. **Adicionar arquivos de referência**:
   - HTML completo da página atual (ou screenshots)
   - Imagens Seedream na pasta `public/images/seedream/`
   - Logo SNKHOUSE (vertical e horizontal)

2. **Validar planejamento**:
   - Revisar todas as 16 sections
   - Confirmar componentes do 21st.dev
   - Adicionar/remover sections se necessário

3. **Iniciar implementação**:
   - Começar pela Fase 1 (Setup)
   - Criar branch `feature/landing-page`
   - Commits frequentes

### Para o Futuro
- [ ] A/B testing de conversão
- [ ] Heatmaps (Hotjar)
- [ ] Animações avançadas com GSAP
- [ ] Micro-interações (sons, haptics)
- [ ] Dark/Light mode toggle
- [ ] Internacionalização (PT-BR, EN)

---

## 📝 Notas Importantes

### ⚠️ Pontos de Atenção
1. **Responsividade**: Testar em devices reais, não só DevTools
2. **Performance**: Medir constantemente com Lighthouse
3. **Acessibilidade**: Garantir contraste, alt texts, keyboard navigation
4. **Cross-browser**: Testar Safari, Firefox, Chrome, Edge
5. **WooCommerce**: Garantir que redirects preservam UTM params (se houver)

### 🎨 Design System a Criar
```
design-system.md (futuro)
├── Colors
├── Typography
├── Spacing
├── Shadows
├── Animations
└── Components Library
```

### 🔧 Ferramentas Úteis
- **Figma**: Para mockups (se necessário)
- **Lighthouse**: Performance audit
- **PageSpeed Insights**: Performance real-world
- **GTmetrix**: Performance detalhado
- **BrowserStack**: Cross-browser testing
- **Responsively**: Multi-device preview

---

## 🎯 Métricas de Sucesso

### Performance
- ✅ Lighthouse Desktop: 95+
- ✅ Lighthouse Mobile: 90+
- ✅ Tempo de carregamento: < 3s

### UX
- ✅ Taxa de rejeição: < 40%
- ✅ Tempo médio na página: > 2min
- ✅ Cliques em produtos: > 30%

### Conversão (no WooCommerce)
- ✅ CTR para loja: > 20%
- ✅ Add to cart: medir baseline

---

**Criado por**: Claude + Você
**Data**: 2025-10-18
**Versão**: 1.0
**Status**: 🟡 Planejamento - Aguardando arquivos de referência

