# 🚀 Instruções de Setup - SNKHOUSE Showroom

## 📋 Passo a Passo

### 1️⃣ Instalar Node.js

Se você ainda não tem Node.js instalado:

- Baixe em: https://nodejs.org/ (versão LTS recomendada)
- Verifique a instalação:

```bash
node --version
npm --version
```

### 2️⃣ Instalar Dependências

No terminal, dentro da pasta do projeto:

```bash
npm install
```

Aguarde a instalação de todas as dependências (Next.js, Tailwind, Framer Motion, etc).

### 3️⃣ Adicionar Suas Imagens (IMPORTANTE!)

Você tem **11 imagens** para adicionar:

#### Opção A: Usar as imagens do Unsplash (temporário)

O projeto já está configurado com imagens placeholder do Unsplash. Você pode começar assim e trocar depois.

#### Opção B: Usar suas imagens reais (RECOMENDADO)

1. Crie a pasta `/public/images/` se não existir
2. Coloque as 11 imagens nesta pasta com os nomes:
   - `arte-urbana.jpg` (Imagem 1: Arte urbana SNKHOUSE)
   - `logo.jpg` (Imagem 2: Logo SNKHOUSE colorido)
   - `travis-scott.jpg` (Imagem 3: Travis Scott Nike)
   - `jordan-1.jpg` (Imagem 4: Air Jordan 1)
   - `interior-full.jpg` (Imagem 5: Interior completo)
   - `prateleiras.jpg` (Imagem 6: Prateleiras iluminadas)
   - `simetria.jpg` (Imagem 7: Showroom simetria)
   - `iluminacao.jpg` (Imagem 8: Lateral iluminação)
   - `fachada.jpg` (Imagem 9: Fachada externa)
   - `jordan-4.jpg` (Imagem 10: Jordan 4 Off-White)
   - `hero-showroom.jpg` (Imagem 11: HERO - Interior com logo)

3. Edite o arquivo `src/utils/constants.js`:

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

### 4️⃣ Rodar o Projeto

```bash
npm run dev
```

O site estará disponível em: http://localhost:3000

### 5️⃣ Customizar Informações

Edite `src/utils/constants.js` para personalizar:

- Data de inauguração
- Endereço
- Links sociais
- Produtos
- Timeline de construção

### 6️⃣ Testar Responsividade

Abra o DevTools do navegador (F12):
- Clique no ícone de dispositivo móvel
- Teste em diferentes tamanhos (iPhone, iPad, Desktop)

### 7️⃣ Build de Produção

Quando estiver pronto para publicar:

```bash
npm run build
npm start
```

Teste em: http://localhost:3000

## 🎨 Customizações Comuns

### Mudar as Cores

`src/utils/constants.js`:
```javascript
export const COLORS = {
  yellow: '#SUA_COR_AQUI',
  black: '#0A0A0A',
  gray: '#AEAEAE',
}
```

`tailwind.config.js`:
```javascript
colors: {
  brand: {
    yellow: '#SUA_COR_AQUI',
  },
}
```

### Mudar a Data de Inauguração

`src/utils/constants.js`:
```javascript
export const OPENING_DATE = new Date('2026-02-01T00:00:00')
```

### Adicionar Mais Produtos

`src/utils/constants.js`:
```javascript
export const PRODUCTS_DATA = [
  // Adicione mais objetos aqui
  {
    img: '/images/novo-produto.jpg',
    title: "Nome do Produto",
    desc: "Descrição"
  }
]
```

## 🌐 Deploy

### Deploy na Vercel (FÁCIL - Recomendado)

1. Crie conta em: https://vercel.com
2. Conecte seu repositório GitHub
3. Clique em "Deploy"
4. Pronto! Seu site estará no ar

### Deploy na Netlify

1. Build do projeto: `npm run build`
2. Faça upload da pasta `.next` no Netlify
3. Configure build command: `npm run build`
4. Configure publish directory: `.next`

## ⚙️ Configurações Avançadas

### Conectar Formulário VIP com Backend

Edite `src/components/VIPForm.jsx` e substitua a função `handleSubmit`:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  setStatus('loading')

  try {
    const response = await fetch('https://seu-backend.com/api/vip', {
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

### Adicionar Google Analytics

1. Crie conta no Google Analytics
2. Copie seu ID (ex: G-XXXXXXXXXX)
3. Crie `.env.local`:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

4. Adicione no `src/app/layout.js`:

```javascript
import Script from 'next/script'

// Dentro do <body>
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
```

## 🐛 Troubleshooting

### Erro: "Module not found"

```bash
npm install
```

### Erro: "Port 3000 already in use"

```bash
npm run dev -- -p 3001
```

Ou mate o processo na porta 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

### Imagens não aparecem

1. Verifique se as imagens estão em `/public/images/`
2. Verifique os nomes dos arquivos em `constants.js`
3. Reinicie o servidor (`Ctrl+C` e `npm run dev`)

### Animações não funcionam

1. Verifique se Framer Motion está instalado:
```bash
npm install framer-motion
```

2. Limpe o cache:
```bash
rm -rf .next
npm run dev
```

## 📞 Precisa de Ajuda?

1. Leia o README.md completo
2. Verifique a documentação do Next.js: https://nextjs.org/docs
3. Verifique os comentários no código
4. Revise os components em `/src/components/`

## ✅ Checklist Final

Antes de publicar:

- [ ] Todas as imagens substituídas
- [ ] Informações personalizadas (endereço, data, etc)
- [ ] Testado em mobile e desktop
- [ ] Build de produção funciona (`npm run build`)
- [ ] SEO metadata revisada (`src/app/layout.js`)
- [ ] Links do Instagram corretos
- [ ] Formulário VIP testado
- [ ] Performance verificada (Lighthouse)

## 🚀 Próximos Passos

Depois do deploy:

1. Configure domínio customizado
2. Adicione Google Analytics
3. Conecte formulário VIP com backend
4. Teste em dispositivos reais
5. Compartilhe nas redes sociais!

---

**Boa sorte com o lançamento do showroom! 🔥**
