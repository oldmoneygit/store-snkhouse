# 🔗 SNKHOUSE Links

Página centralizada de links estilo Linktree para SNKHOUSE, com tracking UTM integrado.

## 🌟 Features

- ✨ Design customizado com identidade visual SNKHOUSE
- 🎨 Bandeiras SVG (Argentina 🇦🇷 e México 🇲🇽)
- 📱 100% Responsivo (mobile-first)
- 🔍 SEO otimizado
- 📊 **UTM Tracking** automático
- 💫 Animações suaves (Framer Motion)
- 🚀 Performance otimizada (Next.js 14)

## 📦 Links Incluídos

1. **🇦🇷 SNKHOUSE Argentina**
   - URL: snkhouseargentina.com
   - UTM: `?utm_source=linktree&utm_medium=social&utm_campaign=links_page&utm_content=argentina_store`

2. **🇲🇽 SNKHOUSE México**
   - URL: snkhousemexico.com
   - UTM: `?utm_source=linktree&utm_medium=social&utm_campaign=links_page&utm_content=mexico_store`

3. **💬 WhatsApp**
   - Número: +55 19 3199-3794
   - Mensagem pré-preenchida: "Hola! Vengo desde links.snkhouse.com"

4. **📧 Email**
   - contacto@snkhouse.com
   - Subject pré-preenchido

5. **📱 Instagram**
   - @snkhouse
   - UTM: `?utm_source=linktree&utm_medium=social&utm_campaign=links_page&utm_content=instagram`

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Desenvolvimento (porta 3001)
npm run dev

# Build para produção
npm run build

# Rodar produção
npm start
```

## 📊 UTM Tracking

### O que é UTM?

UTM parameters são tags adicionadas nas URLs para rastrear a origem do tráfego no Google Analytics.

### Parâmetros Utilizados:

- **utm_source**: `linktree` (de onde vem o tráfego)
- **utm_medium**: `social` (tipo de mídia)
- **utm_campaign**: `links_page` (campanha específica)
- **utm_content**: `argentina_store` / `mexico_store` / `instagram` (diferencia os links)

### Como Monitorar:

1. Acesse Google Analytics da sua loja
2. **Aquisição** → **Tráfego** → **Origem/Mídia**
3. Filtre por **Origem**: `linktree`

Você verá:
- Quantas pessoas vieram do links.snkhouse.com
- Qual loja teve mais cliques (AR vs MX)
- Taxa de conversão de cada link

## 🎨 Identidade Visual

### Cores:

- **Brand Yellow**: #FAB800
- **Argentina**:
  - Azul celeste: #74ACDF
  - Dourado: #F6B40E
- **México**:
  - Verde: #006847
  - Vermelho: #CE1126

### Tipografia:

- Títulos: Font Black (900 weight)
- Corpo: Sans-serif system

## 📁 Estrutura do Projeto

```
snkhouse-links/
├── public/
│   └── images/
│       └── logo-snkhouse-white.png
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.jsx
│   │   └── page.jsx
│   └── components/
│       └── icons/
│           ├── FlagArgentina.jsx
│           ├── FlagMexico.jsx
│           └── WhatsAppIcon.jsx
├── package.json
├── next.config.js
├── tailwind.config.js
└── DEPLOY.md
```

## 🌐 Deploy

Ver guia completo em: [DEPLOY.md](./DEPLOY.md)

**Resumo:**

1. Fazer push para GitHub
2. Conectar no Vercel
3. Configurar domínio: `links.snkhouse.com`
4. ✅ Pronto!

## 🔄 Atualizações

Para adicionar/remover links, edite `src/app/page.jsx`:

```javascript
const links = [
  {
    id: 6,
    title: 'Novo Link',
    description: 'Descrição',
    url: `https://exemplo.com?${utmParams}&utm_content=novo_link`,
    icon: IconComponent,
    color: 'from-color/20 to-color/0 border-color/30',
    iconColor: 'text-color',
  },
]
```

## 📱 Onde Usar

- **Instagram Bio**: Coloque `links.snkhouse.com` na bio
- **TikTok Bio**: Link único para todos os canais
- **WhatsApp Status**: Compartilhe o link
- **QR Code**: Gere um QR para `links.snkhouse.com`
- **Email Signatures**: Adicione no rodapé
- **Cartão de Visitas Digital**

## 🛠️ Tecnologias

- **Framework**: Next.js 14.2.33
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React + Custom SVG
- **Hosting**: Vercel

## 📄 Licença

© 2025 SNKHOUSE. Todos os direitos reservados.

---

🤖 Projeto criado com [Claude Code](https://claude.com/claude-code)
