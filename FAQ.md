# ❓ FAQ - Perguntas Frequentes

## 📋 Instalação e Setup

### Como instalo o Node.js?

Baixe em [nodejs.org](https://nodejs.org/) e instale a versão LTS (recomendada). Após instalar, verifique:

```bash
node --version  # Deve mostrar v18.x ou superior
npm --version   # Deve mostrar 9.x ou superior
```

### Qual editor de código usar?

Recomendamos:
- **VS Code** (mais popular) - [code.visualstudio.com](https://code.visualstudio.com/)
- **Cursor** (com AI)
- **WebStorm** (pago)

Extensões úteis para VS Code:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter

### `npm install` está demorando muito

Normal! São ~230MB de dependências. Pode levar 2-5 minutos dependendo da internet.

Se travar, tente:
```bash
npm cache clean --force
npm install
```

### Erro: "EACCES: permission denied"

**Linux/Mac:**
```bash
sudo npm install -g npm
```

**Windows:** Execute o terminal como Administrador

---

## 🖼️ Imagens

### Preciso trocar TODAS as 11 imagens?

Não! O site já funciona com placeholders do Unsplash. Você pode:

1. **Usar placeholders** - Site funcional imediatamente
2. **Trocar aos poucos** - Comece pela hero image (Imagem 11)
3. **Trocar todas** - Para site totalmente personalizado

**Recomendação:** Lance com placeholders, depois substitua.

### Qual o tamanho ideal das imagens?

- **Hero (Imagem 11):** 1920x1080px, máx 300KB
- **Produtos (3, 4, 10):** 1000x1000px, máx 100KB cada
- **Galeria (5-9):** 1920x1080px, máx 150KB cada

### Como comprimir imagens?

Use ferramentas online gratuitas:
- [TinyPNG](https://tinypng.com) - Melhor para JPG/PNG
- [Squoosh](https://squoosh.app) - Google's compressor
- [ImageOptim](https://imageoptim.com) - App para Mac

### Imagens estão borradas/pixeladas

Use imagens de maior resolução (mínimo 1920px de largura para hero).

### Erro: "Image optimization using Next.js' default loader is not compatible"

Significa que sua imagem está em domínio externo não configurado.

**Solução:** Adicione o domínio no `next.config.js`:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'seu-dominio.com',
    },
  ],
}
```

---

## ⚙️ Desenvolvimento

### Como reinicio o servidor?

```bash
# Parar: Ctrl+C (ou Cmd+C no Mac)
# Iniciar novamente:
npm run dev
```

### Mudanças não aparecem no navegador

1. Salve o arquivo (Ctrl+S)
2. Aguarde 1-2 segundos (hot reload automático)
3. Se não funcionar: Force refresh (Ctrl+Shift+R)
4. Última opção: Reinicie o servidor

### Erro: "Port 3000 already in use"

Outra aplicação está usando a porta 3000.

**Opção 1:** Use outra porta
```bash
npm run dev -- -p 3001
```

**Opção 2:** Mate o processo na porta 3000

Windows:
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Mac/Linux:
```bash
lsof -ti:3000 | xargs kill
```

### Site está lento no desenvolvimento

Normal! Em produção será muito mais rápido.

Para testar performance real:
```bash
npm run build
npm start
```

### Console cheio de warnings

Alguns warnings são normais durante desenvolvimento. Se quiser limpar:

1. Verifique se não tem erros (vermelho)
2. Warnings (amarelo) geralmente são OK
3. Para debug limpo: `console.clear()` no console do navegador

---

## 🎨 Customização

### Como mudo as cores?

Edite `src/utils/constants.js`:

```javascript
export const COLORS = {
  yellow: '#SUA_COR',  // Mude aqui
  black: '#0A0A0A',
  gray: '#AEAEAE',
}
```

E `tailwind.config.js`:

```javascript
colors: {
  brand: {
    yellow: '#SUA_COR',  // Mesma cor
  },
}
```

Reinicie o servidor após mudanças no Tailwind.

### Como adiciono mais produtos?

Edite `src/utils/constants.js`:

```javascript
export const PRODUCTS_DATA = [
  // Existentes...
  {
    img: '/images/novo-produto.jpg',
    title: "Nome do Produto",
    desc: "Descrição curta"
  }
]
```

### Como mudo a data de inauguração?

`src/utils/constants.js`:

```javascript
export const OPENING_DATE = new Date('2026-02-01T00:00:00')
```

Formato: 'YYYY-MM-DDTHH:mm:ss'

### Como adiciono mais fases na timeline?

`src/utils/constants.js`:

```javascript
export const TIMELINE_DATA = [
  // Existentes...
  {
    phase: "Nova Fase",
    status: "upcoming",  // completed, inProgress, ou upcoming
    icon: "Package",     // Nome do ícone do Lucide
    month: "Mar 2026"
  }
]
```

Ícones disponíveis: Procure em [lucide.dev](https://lucide.dev)

### Como mudo textos?

**Opção 1:** Edite direto nos components (`src/components/`)

**Opção 2:** Centralize em `constants.js` (recomendado para textos que mudam)

### Posso adicionar mais seções?

Sim! Crie um novo component em `src/components/` e importe no `src/app/page.js`.

Exemplo:
```javascript
// src/components/NovaSecao.jsx
export default function NovaSecao() {
  return <section>Conteúdo aqui</section>
}

// src/app/page.js
import NovaSecao from '@/components/NovaSecao'

export default function Home() {
  return (
    <main>
      {/* ... outros components ... */}
      <NovaSecao />
    </main>
  )
}
```

---

## 🌐 Deploy

### Qual plataforma de deploy é melhor?

**Vercel** (recomendado):
- ✅ Mais fácil
- ✅ Otimizado para Next.js
- ✅ Deploy automático
- ✅ Preview URLs
- ✅ Grátis para hobby

Alternativas:
- **Netlify** - Também ótimo
- **Railway** - Simples
- **Render** - Grátis

### Como faço deploy na Vercel?

1. Push para GitHub
2. Acesse [vercel.com](https://vercel.com)
3. "New Project"
4. Conecte GitHub
5. Selecione repo
6. Deploy (2 min)

### Preciso de domínio customizado?

Não! Vercel dá um domínio grátis:
- `seu-projeto.vercel.app`

Mas você pode conectar seu próprio domínio nas configurações.

### Como conecto meu domínio?

1. Vá em Project Settings → Domains
2. Adicione seu domínio
3. Configure DNS (Vercel mostra instruções)
4. Aguarde propagação (até 48h)

### Deploy falhou, o que faço?

1. Verifique os logs de erro
2. Teste local: `npm run build`
3. Se build local falhar, corrija erros
4. Push de novo

Erro comum: **Image optimization** - Adicione domínios no `next.config.js`

---

## 📱 Formulário VIP

### O formulário funciona?

Sim, mas **apenas localmente**. Os dados não são enviados para nenhum lugar ainda.

### Como conecto com backend?

Edite `src/components/VIPForm.jsx`:

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
    }
  } catch (error) {
    setStatus('error')
  }
}
```

### Posso usar Google Forms?

Sim! Use um iframe:

```javascript
<iframe
  src="https://forms.google.com/SUA_FORM_URL"
  width="100%"
  height="600"
/>
```

### Alternativas sem backend?

- **Formspree** - [formspree.io](https://formspree.io)
- **Netlify Forms** - Se hospedar na Netlify
- **Google Forms** - Gratuito
- **Typeform** - Bonito mas pago
- **Airtable** - Grátis para começo

---

## 📊 Performance

### Como verifico performance?

1. Abra DevTools (F12)
2. Aba "Lighthouse"
3. Selecione categorias
4. "Generate report"

Meta: 90+ em tudo

### Como melhoro o score?

Veja o arquivo `OPTIMIZATION.md` para guia completo.

Quick wins:
1. Comprimir imagens
2. Usar WebP
3. Build de produção (`npm run build`)

### Site está lento

**Em desenvolvimento:** Normal! Use `npm run build` + `npm start` para testar velocidade real.

**Em produção:**
1. Comprima imagens
2. Verifique Lighthouse
3. Use CDN (Vercel já faz isso)

---

## 🔧 Troubleshooting

### Erro: "Cannot find module"

```bash
npm install
```

### Erro: "Unexpected token"

Sintaxe JavaScript errada. Verifique:
1. Parênteses balanceados
2. Chaves fechadas
3. Aspas corretas

### Build falha mas dev funciona

```bash
# Limpe cache
rm -rf .next
npm run build
```

### Animações não funcionam

Framer Motion instalado?
```bash
npm install framer-motion
```

### Countdown não atualiza

Normal! Aguarde 1 segundo para primeiro tick.

Se parou:
1. Verifique console por erros
2. Data é válida? `new Date('2026-02-01T00:00:00')`
3. Reinicie servidor

### CardStack não navega

JavaScript habilitado no navegador?
Console tem erros?

### Estilos Tailwind não funcionam

1. Reinicie servidor
2. Verifique `tailwind.config.js` tem paths corretos
3. Limpe cache: `rm -rf .next`

---

## 🎯 Melhores Práticas

### Quando commitar no Git?

Frequentemente! Depois de cada feature funcional.

```bash
git add .
git commit -m "feat: adiciona hero section"
git push
```

### Como organizo meu código?

✅ **BOM:**
- Um component por arquivo
- Nomes descritivos
- Comentários onde necessário
- Constantes em `constants.js`

❌ **RUIM:**
- Tudo em um arquivo gigante
- Nomes genéricos (Component1, etc)
- Código duplicado

### Devo alterar os arquivos de config?

Geralmente não precisa! Está tudo configurado.

Pode alterar:
- ✅ `constants.js` - À vontade!
- ⚠️ `tailwind.config.js` - Cores OK, resto cuidado
- ❌ `next.config.js` - Só se souber o que está fazendo
- ❌ `package.json` - Não mexa nos scripts

### Como atualizo dependências?

```bash
npm update
```

Ou para updates maiores:
```bash
npm install next@latest react@latest react-dom@latest
```

---

## 💡 Dicas Rápidas

### Atalhos úteis

- **Ctrl+S** - Salvar
- **Ctrl+C** - Parar servidor
- **Ctrl+Shift+R** - Hard refresh no navegador
- **F12** - DevTools

### Aprenda mais sobre Next.js

- [Documentação oficial](https://nextjs.org/docs)
- [Next.js Learn](https://nextjs.org/learn)

### Aprenda mais sobre Tailwind

- [Documentação](https://tailwindcss.com/docs)
- [Tailwind Play](https://play.tailwindcss.com)

### Aprenda mais sobre Framer Motion

- [Documentação](https://www.framer.com/motion/)
- [Exemplos](https://www.framer.com/motion/examples/)

---

## 🆘 Ainda com problemas?

1. ✅ Leia o erro com calma
2. ✅ Verifique README.md
3. ✅ Procure erro no Google
4. ✅ Verifique Stack Overflow
5. ✅ Revise este FAQ

**99% das dúvidas estão resolvidas aqui!** 🎯

---

## 📞 Checklist de Debug

Antes de pedir ajuda, verifique:

- [ ] `npm install` foi executado?
- [ ] Servidor está rodando? (`npm run dev`)
- [ ] Arquivo foi salvo? (Ctrl+S)
- [ ] Navegador foi recarregado?
- [ ] Console tem erros? (F12 → Console)
- [ ] Sintaxe está correta? (parênteses, chaves)
- [ ] Caminhos de imagem estão corretos?
- [ ] Está na pasta correta no terminal?

---

**90% dos problemas se resolvem com:**
1. Restart do servidor
2. Hard refresh do navegador
3. `npm install` de novo

**BOA SORTE! 🍀**
