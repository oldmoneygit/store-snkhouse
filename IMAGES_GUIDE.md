# 🖼️ Guia de Imagens - SNKHOUSE Showroom

## 📋 Lista de Imagens Necessárias

Você precisa de **11 imagens** para o site. Abaixo está a lista completa com detalhes de onde cada uma é usada.

---

## 🎯 Imagens Principais

### 1. **Arte Urbana SNKHOUSE** (poster/quadro)
- **Uso:** Não está sendo usada no código atual (reserva para features futuras)
- **Nome sugerido:** `arte-urbana.jpg`
- **Tamanho recomendado:** 1200x1600px
- **Formato:** JPG ou WebP
- **Descrição:** Poster ou quadro com arte urbana da marca SNKHOUSE

---

### 2. **Logo SNKHOUSE Colorido**
- **Uso:** Não está sendo usada no código atual (reserva para features futuras)
- **Nome sugerido:** `logo.jpg`
- **Tamanho recomendado:** 800x800px
- **Formato:** PNG (se tiver transparência) ou JPG
- **Descrição:** Logo da SNKHOUSE colorido

---

### 3. **Tênis Travis Scott x Nike com Moeda Dourada**
- **Uso:** Seção de Produtos (1º produto)
- **Component:** `Products.jsx`
- **Nome sugerido:** `travis-scott.jpg`
- **Tamanho recomendado:** 1000x1000px
- **Formato:** JPG ou WebP
- **Descrição:** Tênis Travis Scott x Nike com a moeda dourada SNKHOUSE
- **Alt text:** "Travis Scott x Nike - Edición Limitada"

---

### 4. **Air Jordan 1 com Moeda Dourada SNKHOUSE**
- **Uso:** Seção de Produtos (2º produto)
- **Component:** `Products.jsx`
- **Nome sugerido:** `jordan-1.jpg`
- **Tamanho recomendado:** 1000x1000px
- **Formato:** JPG ou WebP
- **Descrição:** Air Jordan 1 Retro com a moeda dourada SNKHOUSE
- **Alt text:** "Air Jordan 1 Retro - Colorway Exclusivo"

---

### 5. **Interior Showroom Completo Frontal**
- **Uso:** Card Stack - Galeria (Card 1)
- **Component:** `CardStack.jsx`
- **Nome sugerido:** `interior-full.jpg`
- **Tamanho recomendado:** 1920x1080px (16:9)
- **Formato:** JPG ou WebP
- **Descrição:** Vista frontal completa do interior do showroom
- **Alt text:** "Interior Showroom Completo"
- **Título card:** "INTERIOR COMPLETO"
- **Descrição card:** "Diseño minimalista con paredes de concreto"

---

### 6. **Close das Prateleiras Iluminadas com Produtos**
- **Uso:** Card Stack - Galeria (Card 2)
- **Component:** `CardStack.jsx`
- **Nome sugerido:** `prateleiras.jpg`
- **Tamanho recomendado:** 1920x1080px (16:9)
- **Formato:** JPG ou WebP
- **Descrição:** Close-up das prateleiras iluminadas com produtos expostos
- **Alt text:** "Display de Productos"
- **Título card:** "DISPLAY PREMIUM"
- **Descrição card:** "Prateleiras iluminadas con productos exclusivos"

---

### 7. **Showroom Simetria Perfeita com Display Central**
- **Uso:** Card Stack - Galeria (Card 3)
- **Component:** `CardStack.jsx`
- **Nome sugerido:** `simetria.jpg`
- **Tamanho recomendado:** 1920x1080px (16:9)
- **Formato:** JPG ou WebP
- **Descrição:** Vista simétrica do showroom com display central
- **Alt text:** "Showroom Simetrico"
- **Título card:** "SIMETRÍA PERFECTA"
- **Descrição card:** "Display central con vitrinas laterales"

---

### 8. **Lateral do Showroom com Iluminação Cálida**
- **Uso:** Card Stack - Galeria (Card 4)
- **Component:** `CardStack.jsx`
- **Nome sugerido:** `iluminacao.jpg`
- **Tamanho recomendado:** 1920x1080px (16:9)
- **Formato:** JPG ou WebP
- **Descrição:** Vista lateral do showroom com iluminação cálida/acolhedora
- **Alt text:** "Iluminación Lateral"
- **Título card:** "ILUMINACIÓN CÁLIDA"
- **Descrição card:** "Ambiente acogedor con luz focal"

---

### 9. **Fachada Externa "SNEKERHOUSE" com Vitrine**
- **Uso:** Card Stack - Galeria (Card 5)
- **Component:** `CardStack.jsx`
- **Nome sugerido:** `fachada.jpg`
- **Tamanho recomendado:** 1920x1080px (16:9)
- **Formato:** JPG ou WebP
- **Descrição:** Fachada externa do showroom com letreiro e vitrine
- **Alt text:** "Fachada Externa"
- **Título card:** "FACHADA MODERNA"
- **Descrição card:** "Entrada principal en Palermo"

---

### 10. **Jordan 4 Off-White Unboxing com Moeda SNKHOUSE**
- **Uso:** Seção de Produtos (3º produto)
- **Component:** `Products.jsx`
- **Nome sugerido:** `jordan-4.jpg`
- **Tamanho recomendado:** 1000x1000px
- **Formato:** JPG ou WebP
- **Descrição:** Air Jordan 4 x Off-White sendo unboxed com moeda SNKHOUSE
- **Alt text:** "Air Jordan 4 x Off-White - Premium Collection"

---

### 11. **Interior com Logo SNKHOUSE + Prateleiras Amarelas + Vista Buenos Aires** ⭐ **HERO IMAGE**
- **Uso:** Hero Section (Background principal do site)
- **Component:** `Hero.jsx`
- **Nome sugerido:** `hero-showroom.jpg`
- **Tamanho recomendado:** 1920x1080px ou maior (Full HD+)
- **Formato:** JPG de alta qualidade ou WebP
- **Descrição:** Vista interna do showroom com logo SNKHOUSE na parede, prateleiras com iluminação amarela e vista de Buenos Aires ao fundo
- **Alt text:** "SNKHOUSE Showroom Interior"
- **⚠️ IMPORTANTE:** Esta é a imagem mais importante do site! Use a melhor foto que você tem.

---

## 📁 Como Adicionar as Imagens

### Método 1: Imagens Locais (Recomendado)

1. Crie a pasta (se não existir):
   ```
   /public/images/
   ```

2. Adicione suas 11 imagens com os nomes sugeridos:
   ```
   /public/images/arte-urbana.jpg
   /public/images/logo.jpg
   /public/images/travis-scott.jpg
   /public/images/jordan-1.jpg
   /public/images/interior-full.jpg
   /public/images/prateleiras.jpg
   /public/images/simetria.jpg
   /public/images/iluminacao.jpg
   /public/images/fachada.jpg
   /public/images/jordan-4.jpg
   /public/images/hero-showroom.jpg
   ```

3. Edite `src/utils/constants.js`:
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

### Método 2: Imagens Externas (CDN)

Se suas imagens estão hospedadas em um CDN:

1. Adicione o domínio no `next.config.js`:
   ```javascript
   images: {
     remotePatterns: [
       {
         protocol: 'https',
         hostname: 'seu-cdn.com',
       },
     ],
   }
   ```

2. Atualize as URLs em `constants.js`:
   ```javascript
   export const IMAGES = {
     hero: 'https://seu-cdn.com/hero-showroom.jpg',
     // ...
   }
   ```

---

## ✅ Checklist de Otimização

Antes de adicionar as imagens, otimize-as:

- [ ] Comprimiu todas as imagens (use TinyPNG ou Squoosh)
- [ ] Hero image tem no máximo 200-300KB
- [ ] Imagens de produtos têm no máximo 100KB cada
- [ ] Galeria (cards) tem no máximo 150KB por imagem
- [ ] Formato WebP quando possível (com fallback JPG)
- [ ] Dimensões corretas (não use 4K para imagens que serão exibidas em 800px)
- [ ] Nomes de arquivo sem espaços ou caracteres especiais
- [ ] Alt texts descritivos em todos os components

---

## 📊 Tamanhos Recomendados por Uso

| Uso | Tamanho | Peso Max | Formato |
|-----|---------|----------|---------|
| Hero Background | 1920x1080px | 200-300KB | JPG/WebP |
| Produtos | 1000x1000px | 100KB | JPG/WebP |
| Card Stack | 1920x1080px | 150KB | JPG/WebP |
| Logo | 800x800px | 50KB | PNG/WebP |

---

## 🎨 Dicas de Composição

### Hero Image (Imagem 11)
- Deve ter espaço para o texto sobreposto
- Iluminação boa e clara
- Mostrar a identidade visual do showroom
- Evite muitos detalhes no centro (onde vai o texto)

### Produtos (Imagens 3, 4, 10)
- Fundo neutro ou branco
- Boa iluminação
- Produto centralizado
- Moeda SNKHOUSE visível

### Card Stack (Imagens 5-9 + 11)
- Todas devem ter proporção 16:9
- Boa iluminação
- Mostrar diferentes ângulos do showroom
- Variedade visual (close, wide, detalhes)

---

## 🚨 Problemas Comuns

### Imagem não aparece
1. Verifique o caminho em `constants.js`
2. Verifique o nome do arquivo (case-sensitive!)
3. Reinicie o servidor (`Ctrl+C` e `npm run dev`)

### Imagem carrega lenta
1. Comprima a imagem (use TinyPNG)
2. Reduza as dimensões se for muito grande
3. Use formato WebP

### Imagem pixelada
1. Use uma imagem de maior resolução
2. Verifique se Next.js está otimizando (use next/image)

---

## 🎯 Resultado Final

Quando todas as imagens estiverem no lugar:

- ✅ Hero impactante com sua melhor foto
- ✅ 3 produtos premium bem apresentados
- ✅ Galeria de 6 fotos navegável
- ✅ Site totalmente personalizado com suas fotos reais

---

## 📞 Precisa de Ajuda?

Se tiver dúvidas sobre:
- Qual imagem usar em qual local
- Como otimizar imagens
- Problemas com carregamento

Revise este guia ou consulte o README.md principal.

---

**Lembre-se:** A Hero Image (Imagem 11) é a mais importante! Dedique tempo para escolher a melhor foto. 📸
