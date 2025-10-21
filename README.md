# 🔥 SNKHOUSE Showroom - Landing Page

Landing page premium para o showroom da SNKHOUSE em Palermo, Buenos Aires.

![SNKHOUSE](https://img.shields.io/badge/SNKHOUSE-Showroom-FAB800?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎨 Identidade Visual

- **Amarelo Principal:** `#FAB800`
- **Preto:** `#0A0A0A`
- **Cinza:** `#AEAEAE`
- **Estilo:** Glassmorphism + Dark Theme + Streetwear/Underground

## ✨ Features

- ✅ **Hero Section** com parallax effect e background image
- ✅ **Stats Cards** glassmórficos animados
- ✅ **Countdown Timer** para inauguração (Fevereiro 2026)
- ✅ **Showcase de Produtos** premium com hover effects
- ✅ **Features Section** com cards interativos
- ✅ **Timeline Interativa** de construção
- ✅ **Card Stack Navegável** com galeria de fotos
- ✅ **Formulário Lista VIP** com validação
- ✅ **Seção de Localização** com mapa placeholder
- ✅ **CTA para Instagram** com animações
- ✅ **SEO Otimizado** com Open Graph tags
- ✅ **Animações Framer Motion** em todos os components
- ✅ **Lazy Loading** de imagens com next/image
- ✅ **100% Responsivo** (mobile-first)
- ✅ **Performance Otimizada**

## 🚀 Quick Start

### 1. Instalar Dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 2. Rodar o Projeto

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### 3. Build para Produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
/snkhouse-showroom
├── /public
│   └── /images              # Coloque as 11 imagens aqui
├── /src
│   ├── /app
│   │   ├── layout.js        # Root layout + SEO metadata
│   │   ├── page.js          # Home page
│   │   └── globals.css      # Estilos globais + Tailwind
│   ├── /components
│   │   ├── Hero.jsx         # Hero section com parallax
│   │   ├── Stats.jsx        # Cards de estatísticas
│   │   ├── Countdown.jsx    # Timer de inauguração
│   │   ├── Products.jsx     # Showcase de produtos
│   │   ├── Features.jsx     # Features cards
│   │   ├── Timeline.jsx     # Timeline de construção
│   │   ├── CardStack.jsx    # Galeria navegável
│   │   ├── VIPForm.jsx      # Formulário Lista VIP
│   │   ├── Location.jsx     # Localização
│   │   ├── CTA.jsx          # Call to action Instagram
│   │   └── Footer.jsx       # Footer
│   └── /utils
│       └── constants.js     # Dados, cores, URLs
├── tailwind.config.js
├── next.config.js
└── package.json
```

## 🖼️ Substituir Imagens

As imagens atualmente usam placeholders do Unsplash. Para usar suas imagens reais:

### Opção 1: Usar Imagens Locais

1. Coloque as 11 imagens em `/public/images/`
2. Edite `src/utils/constants.js`:

```javascript
export const IMAGES = {
  urbanArt: '/images/arte-urbana.jpg',
  logo: '/images/logo.jpg',
  travisScott: '/images/travis-scott.jpg',
  jordan1: '/images/jordan-1.jpg',
  interiorFull: '/images/interior-full.jpg',
  shelves: '/images/prateleiras.jpg',
  symmetry: '/images/simetria.jpg',
  lateralLighting: '/images/iluminacao.jpg',
  facade: '/images/fachada.jpg',
  jordan4: '/images/jordan-4.jpg',
  hero: '/images/hero-showroom.jpg',
}
```

### Opção 2: Usar URLs Externas

Se suas imagens estão hospedadas externamente, atualize as URLs em `constants.js` e adicione o domínio no `next.config.js`:

```javascript
// next.config.js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'seu-dominio.com',
    },
  ],
}
```

## 🎯 Customização

### Cores

Edite `src/utils/constants.js`:

```javascript
export const COLORS = {
  yellow: '#FAB800',
  black: '#0A0A0A',
  gray: '#AEAEAE',
}
```

### Data de Inauguração

```javascript
export const OPENING_DATE = new Date('2026-02-01T00:00:00')
```

### Dados de Localização

```javascript
export const LOCATION_DATA = {
  address: "Godoy Cruz 2539",
  neighborhood: "Palermo",
  city: "Buenos Aires",
  // ...
}
```

### Instagram

```javascript
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/snkhouse.ar",
  instagramHandle: "@SNKHOUSE.AR"
}
```

## 📱 Componentes

### Hero

- Parallax scrolling
- Background image overlay
- Animações Framer Motion
- Badge "En Construcción"

### CardStack

- Navegação com setas
- Reset button
- Progress dots
- Mobile-friendly (botões abaixo em mobile)

### VIPForm

- Validação de campos
- Estados de loading/success
- Conectar com backend (ver TODO abaixo)

### Timeline

- Status visual (completed, inProgress, upcoming)
- Animações stagger

## 🔧 Integração Backend (VIP Form)

Para conectar o formulário VIP com seu backend, edite `src/components/VIPForm.jsx`:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  setStatus('loading')

  try {
    const response = await fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      setStatus('success')
    } else {
      setStatus('error')
    }
  } catch (error) {
    setStatus('error')
  }
}
```

## 🌐 Deploy

### Vercel (Recomendado)

1. Push para GitHub
2. Conecte no [Vercel](https://vercel.com)
3. Deploy automático

### Outras Plataformas

- **Netlify:** `npm run build` → deploy pasta `.next`
- **AWS Amplify:** Suporte nativo para Next.js
- **Railway:** Deploy direto do GitHub

## 📊 Performance

- ✅ **Next.js Image Optimization**: Lazy loading automático
- ✅ **Font Optimization**: next/font com display swap
- ✅ **Code Splitting**: Components dinâmicos
- ✅ **Framer Motion**: Animações otimizadas
- ✅ **Tailwind CSS**: Purge automático

## 🎨 Bibliotecas Usadas

- **Next.js 14** - Framework React
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animações
- **Lucide React** - Ícones
- **next/image** - Otimização de imagens
- **next/font** - Otimização de fontes

## 📝 TODO (Opcional)

- [ ] Adicionar Google Analytics
- [ ] Implementar i18n (PT/ES toggle)
- [ ] Integrar API do formulário VIP
- [ ] Adicionar Google Maps embed real
- [ ] Implementar newsletter
- [ ] Adicionar mais produtos ao showcase
- [ ] Criar página de produtos individual
- [ ] Adicionar blog/news section

## 🤝 Suporte

Qualquer dúvida ou problema:

1. Verifique a documentação do [Next.js](https://nextjs.org/docs)
2. Verifique a documentação do [Framer Motion](https://www.framer.com/motion/)
3. Revise os components em `/src/components`

## 📄 Licença

© 2025 SNKHOUSE. All rights reserved.

---

**Desenvolvido com ❤️ para sneakerheads**

**Instagram:** [@snkhouse.ar](https://instagram.com/snkhouse.ar)

**Localização:** Godoy Cruz 2539, Palermo, Buenos Aires, Argentina

**Opening:** Febrero 2026 🔥
