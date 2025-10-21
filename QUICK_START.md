# ⚡ Quick Start - SNKHOUSE Showroom

## 🚀 Em 5 Minutos

### 1️⃣ Instalar (1 min)

```bash
npm install
```

### 2️⃣ Rodar (10 segundos)

```bash
npm run dev
```

Abra: **http://localhost:3000**

### 3️⃣ Ver o site funcionando! 🎉

O site já está 100% funcional com imagens placeholder do Unsplash.

---

## 📸 Adicionar Suas Imagens (Opcional)

### Opção A: Começar com placeholders (recomendado para teste)
✅ Já está configurado! Sem fazer nada.

### Opção B: Usar suas imagens reais

1. Crie a pasta:
```bash
mkdir public/images
```

2. Adicione 11 imagens:
- `hero-showroom.jpg` (MAIS IMPORTANTE - background do hero)
- `travis-scott.jpg`
- `jordan-1.jpg`
- `jordan-4.jpg`
- `interior-full.jpg`
- `prateleiras.jpg`
- `simetria.jpg`
- `iluminacao.jpg`
- `fachada.jpg`
- `arte-urbana.jpg`
- `logo.jpg`

3. Edite `src/utils/constants.js` (linha 8+):
```javascript
export const IMAGES = {
  hero: '/images/hero-showroom.jpg',
  travisScott: '/images/travis-scott.jpg',
  // ... resto das imagens
}
```

---

## 🎨 Personalizar Informações

Edite **1 arquivo:** `src/utils/constants.js`

### Data de inauguração
```javascript
// Linha 134
export const OPENING_DATE = new Date('2026-02-01T00:00:00')
```

### Endereço
```javascript
// Linha 111
export const LOCATION_DATA = {
  address: "Godoy Cruz 2539",
  neighborhood: "Palermo",
  // ...
}
```

### Instagram
```javascript
// Linha 122
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/snkhouse.ar",
  instagramHandle: "@SNKHOUSE.AR"
}
```

Salve, recarregue a página → Mudanças aplicadas! ✅

---

## 🌐 Deploy (3 minutos)

### Vercel (Mais fácil)

1. Push para GitHub:
```bash
git init
git add .
git commit -m "Initial commit - SNKHOUSE Showroom"
git remote add origin https://github.com/SEU_USUARIO/snkhouse-showroom.git
git push -u origin main
```

2. Acesse [vercel.com](https://vercel.com)
3. "New Project" → Conecte GitHub
4. Selecione o repositório
5. Clique "Deploy"

**Pronto!** Seu site está online em 2 minutos.

---

## 📋 Comandos Úteis

```bash
# Desenvolvimento
npm run dev          # Roda em http://localhost:3000

# Produção
npm run build        # Cria build otimizado
npm start            # Roda build de produção

# Qualidade de código
npm run lint         # Verifica erros
```

---

## 🐛 Problemas Comuns

### "Module not found"
```bash
npm install
```

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```

### Imagens não aparecem
1. Verifique `/public/images/` existe
2. Verifique nomes em `constants.js`
3. Reinicie: `Ctrl+C` → `npm run dev`

---

## 📚 Documentação Completa

- **README.md** - Documentação completa
- **INSTRUCTIONS.md** - Setup detalhado
- **IMAGES_GUIDE.md** - Guia das 11 imagens
- **OPTIMIZATION.md** - Performance tips
- **PROJECT_SUMMARY.md** - Resumo executivo

---

## ✅ Checklist Pré-Launch

- [ ] Site rodando localmente
- [ ] Imagens substituídas (ou usando placeholders)
- [ ] Informações personalizadas (endereço, data, Instagram)
- [ ] Testado em Chrome + Firefox + Safari
- [ ] Testado em mobile (celular real)
- [ ] Build de produção OK (`npm run build`)
- [ ] Deploy realizado
- [ ] Domínio configurado (opcional)
- [ ] Compartilhado nas redes! 🔥

---

## 🎯 Você Está Pronto Quando...

1. ✅ `npm run dev` funciona
2. ✅ http://localhost:3000 carrega o site
3. ✅ Countdown está funcionando
4. ✅ CardStack é navegável
5. ✅ Formulário VIP aceita inputs
6. ✅ Responsivo em mobile

**Se todos ✅ → ESTÁ PRONTO! 🚀**

---

## 💡 Dica de Ouro

**Não se preocupe com perfeição na primeira versão!**

1. Use placeholders do Unsplash inicialmente
2. Faça o deploy
3. Compartilhe com amigos para feedback
4. Depois substitua com imagens reais
5. Itere e melhore

**Ship it! 🚢**

---

## 📞 Próximos Passos

Depois do site no ar:

1. [ ] Conectar formulário VIP com backend
2. [ ] Google Analytics
3. [ ] Instagram feed real
4. [ ] Google Maps embed
5. [ ] Newsletter

**Mas primeiro: LANCE O SITE! 🔥**

---

**Tempo total:** ~10 minutos (com imagens placeholder)
**Tempo com suas imagens:** ~30 minutos

**LET'S GO! 🚀**
