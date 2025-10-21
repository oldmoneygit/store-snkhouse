# ⚡ Guia de Otimização - SNKHOUSE Showroom

## 🎯 Performance Checklist

### ✅ Já Implementado

- ✅ Next.js Image Optimization (lazy loading automático)
- ✅ Font Optimization com next/font
- ✅ Glassmorphism com backdrop-blur otimizado
- ✅ Animações Framer Motion com will-change
- ✅ Code splitting automático do Next.js
- ✅ Tailwind CSS tree-shaking
- ✅ SEO metadata completa
- ✅ Responsive images com next/image

### 🚀 Otimizações Adicionais Recomendadas

#### 1. Comprimir Imagens

Antes de adicionar suas imagens em `/public/images/`:

**Online (Fácil):**
- https://tinypng.com - PNG/JPG compression
- https://squoosh.app - Google's image optimizer
- https://imageoptim.com - Mac app

**Formato Recomendado:**
- Use **WebP** sempre que possível
- Fallback para JPG para compatibilidade
- PNG apenas para logos/transparência

**Tamanhos Recomendados:**
- Hero image: 1920x1080px (max 200kb)
- Produtos: 800x800px (max 100kb)
- Galeria: 1200x675px (max 150kb)

#### 2. Adicionar Loading States

Edite components para adicionar skeletons:

```javascript
// Example in Products.jsx
{isLoading ? (
  <div className="animate-pulse bg-gray-800 h-64" />
) : (
  <Image ... />
)}
```

#### 3. Implementar ISR (Incremental Static Regeneration)

Se você adicionar conteúdo dinâmico (produtos, blog):

```javascript
// src/app/page.js
export const revalidate = 3600 // Revalidate every hour
```

#### 4. Configurar Headers de Cache

Crie `next.config.js` headers:

```javascript
async headers() {
  return [
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ]
}
```

## 📊 Monitoramento de Performance

### Google Lighthouse

1. Abra DevTools (F12)
2. Clique em "Lighthouse"
3. Selecione "Performance", "Accessibility", "SEO"
4. Clique "Generate report"

**Metas:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### Web Vitals

Adicione medição de Core Web Vitals:

```bash
npm install web-vitals
```

Crie `src/app/web-vitals.js`:

```javascript
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric)
    // Envie para analytics
  })
}
```

## 🎨 Otimizações de CSS

### 1. Reduzir Classes Tailwind Repetidas

Crie utilities customizadas em `globals.css`:

```css
@layer components {
  .btn-primary {
    @apply bg-gradient-to-r from-brand-yellow to-yellow-500 text-black px-10 py-5 font-black;
  }

  .card-glass {
    @apply glass hover:border-brand-yellow/50 transition-all duration-300;
  }
}
```

### 2. Purge Unused CSS

Já configurado no Tailwind! Mas verifique:

```javascript
// tailwind.config.js
content: [
  './src/**/*.{js,ts,jsx,tsx,mdx}', // ✅ Correto
]
```

## 🖼️ Otimização de Imagens Avançada

### Usar Blur Placeholder

Para cada imagem, gere um blur data URL:

```javascript
// Use https://blurha.sh/
<Image
  src="/images/hero.jpg"
  alt="Hero"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // tiny base64
/>
```

### Usar Sizes Corretos

```javascript
<Image
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

## 🔧 Otimizações do Next.js

### 1. Habilitar Compression

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  compress: true,
  // ...
})
```

### 2. Analisar Bundle Size

```bash
npm install @next/bundle-analyzer
ANALYZE=true npm run build
```

### 3. Remover Console.logs em Produção

Já configurado em `next.config.js`:

```javascript
compiler: {
  removeConsole: process.env.NODE_ENV === 'production',
}
```

## 🌐 CDN e Hosting

### Vercel (Recomendado)

- Edge Network global
- Automatic image optimization
- Automatic compression
- Serverless functions

### Cloudflare

Se não usar Vercel, adicione Cloudflare na frente:

1. Configure DNS no Cloudflare
2. Habilite Auto Minify (JS, CSS, HTML)
3. Habilite Brotli compression
4. Configure Cache Rules

## 📱 Mobile Optimization

### 1. Reduzir Motion em Mobile

```javascript
// Use prefers-reduced-motion
const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

<motion.div
  animate={shouldReduceMotion ? {} : { y: -20 }}
/>
```

### 2. Touch Gestures

Para CardStack em mobile, adicione swipe:

```javascript
import { useDrag } from 'framer-motion'

<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  onDragEnd={(e, info) => {
    if (info.offset.x > 100) moveToStart()
    if (info.offset.x < -100) moveToEnd()
  }}
/>
```

## 🔒 Security Headers

Adicione headers de segurança:

```javascript
// next.config.js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
      ],
    },
  ]
}
```

## 📈 Analytics

### Google Analytics 4

```bash
npm install @next/third-parties
```

```javascript
// src/app/layout.js
import { GoogleAnalytics } from '@next/third-parties/google'

<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```javascript
// src/app/layout.js
import { Analytics } from '@vercel/analytics/react'

<Analytics />
```

## 🎯 Metas de Performance

### Core Web Vitals

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Outras Métricas

- **Time to First Byte (TTFB):** < 600ms
- **First Contentful Paint (FCP):** < 1.8s
- **Speed Index:** < 3.4s

## 🛠️ Ferramentas de Teste

1. **Lighthouse** - DevTools do Chrome
2. **PageSpeed Insights** - https://pagespeed.web.dev/
3. **WebPageTest** - https://www.webpagetest.org/
4. **GTmetrix** - https://gtmetrix.com/
5. **Pingdom** - https://tools.pingdom.com/

## 🚀 Deployment Checklist

Antes do deploy final:

- [ ] Todas as imagens otimizadas (WebP)
- [ ] Build de produção testa OK (`npm run build`)
- [ ] Lighthouse score 90+ em todas as categorias
- [ ] Testado em Chrome, Safari, Firefox
- [ ] Testado em iOS e Android
- [ ] SEO metadata completa
- [ ] Analytics configurado
- [ ] Formulário VIP conectado
- [ ] Domínio customizado configurado
- [ ] SSL/HTTPS habilitado
- [ ] Sitemap gerado
- [ ] robots.txt configurado

## 💡 Dicas Finais

1. **Priorize Core Web Vitals** - Afetam SEO no Google
2. **Teste em dispositivos reais** - Emuladores não são suficientes
3. **Monitore performance continuamente** - Use Vercel Analytics
4. **Otimize progressivamente** - Não faça tudo de uma vez
5. **Meça antes e depois** - Use Lighthouse para comparar

---

**Performance é uma feature, não uma afterthought!** 🚀
