# 🧪 Guia de Testes - Sistema Multi-País

## ✅ Status da Implementação

### Implementado (Pronto para Testar)

- ✅ **Sistema de configuração por país** (`src/config/countries/`)
  - argentina.js (Config Argentina 🇦🇷)
  - mexico.js (Config México 🇲🇽)
  - index.js (Detecção automática)

- ✅ **Hooks React**
  - `useCountry()` - Retorna config do país atual
  - `useTranslation()` - Retorna traduções
  - `useCurrency()` - Retorna config de moeda

- ✅ **Utilidades de Moeda**
  - Conversão automática ARS → MXN (1 ARS = 0.012 MXN)
  - Formatação com locale correto (es-AR vs es-MX)
  - Suporte para múltiplas moedas

- ✅ **Componentes Adaptados**
  - ProductCard - Preços convertidos e formatados
  - (Outros componentes serão adaptados conforme necessário)

- ✅ **Integrações**
  - Shopify - Detecção de loja por país
  - Meta Pixel - Layout preparado
  - (API routes precisam de adaptação)

- ✅ **Variáveis de Ambiente**
  - .env.local atualizado com suporte AR + MX
  - .env.example documentado

---

## 🧪 Como Testar Localmente

### Opção 1: Testar com Query Parameter (Mais Fácil)

**Argentina:**
```
http://localhost:3000?country=AR
```

**México:**
```
http://localhost:3000?country=MX
```

### Opção 2: Simular Hostname (Produção)

Editar `C:\Windows\System32\drivers\etc\hosts` (Windows) ou `/etc/hosts` (Mac/Linux):

```
127.0.0.1 snkhouseargentina.local
127.0.0.1 snkhousemexico.local
```

Depois acessar:
```
http://snkhouseargentina.local:3000  → Argentina
http://snkhousemexico.local:3000     → México
```

---

## 🔍 O que Verificar

### 1. Detecção de País

**Onde:** Console do navegador
**O que testar:**
- Abrir DevTools > Console
- Executar: `localStorage.getItem('country')` ou verificar logs

**Resultado Esperado:**
- AR para Argentina
- MX para México

---

### 2. Conversão de Preços

**Onde:** Qualquer ProductCard na home page
**O que testar:**
- Preço de exemplo: $50.000 ARS

**Resultado Esperado:**

**Argentina** (`?country=AR`):
```
$50.000,00
```
(Formato: ponto para milhares, vírgula para decimais)

**México** (`?country=MX`):
```
$600.00
```
(50.000 × 0.012 = 600 MXN)
(Formato: vírgula para milhares, ponto para decimais)

---

### 3. Traduções (Idioma)

**Onde:** ProductCard, textos da interface
**O que verificar:**

| Elemento | Argentina (AR) | México (MX) |
|----------|----------------|-------------|
| Nome do Produto | "Zapatillas" | "Tenis" |
| Tamanho | "Talle" | "Talla" |
| Disponível | "Disponible" | "Disponible" |
| Agotado | "Agotado" | "Agotado" |

---

### 4. Formatação de Moeda

**Teste de Formatação:**

| Valor (ARS) | Argentina | México |
|-------------|-----------|--------|
| 1000 | $1.000,00 | $12.00 |
| 50000 | $50.000,00 | $600.00 |
| 150000 | $150.000,00 | $1,800.00 |

**Verificar:**
- Separadores corretos
- Símbolo de moeda ($)
- Decimais (2 casas)

---

### 5. Meta Pixel (Eventos)

**Onde:** Console > Network > Filter: facebook
**O que testar:**
- Navegar para produto
- Adicionar ao carrinho
- Iniciar checkout

**Resultado Esperado:**

**Argentina:**
- Eventos enviados com `currency: ARS`
- Pixel ID: `1503220410800125`

**México (quando configurar):**
- Eventos enviados com `currency: MXN`
- Pixel ID: `[seu_novo_pixel_mx]`

---

### 6. Shopify Checkout

**Onde:** Carrinho > Finalizar Compra
**O que testar:**
- Adicionar produto ao carrinho
- Clicar em "Finalizar Compra"

**Resultado Esperado:**

**Argentina:**
- Redireciona para: `9wurf1-73.myshopify.com/cart/...`

**México (quando configurar):**
- Redireciona para: `snkhouse-mx.myshopify.com/cart/...`

---

## 🐛 Checklist de Testes

### Funcionalidades Básicas

- [ ] Homepage carrega corretamente
- [ ] ProductCards exibem preços convertidos
- [ ] Formatação de moeda está correta (separadores)
- [ ] Traduções aparecem no idioma correto
- [ ] Navegação funciona normalmente

### Funcionalidades de Carrinho

- [ ] Adicionar produto ao carrinho
- [ ] Ver carrinho com preços convertidos
- [ ] Remover produto do carrinho
- [ ] Atualizar quantidade
- [ ] Ver total convertido

### Checkout (quando Shopify estiver configurado)

- [ ] Botão "Finalizar Compra" funciona
- [ ] Redireciona para Shopify correto
- [ ] Produtos aparecem no checkout
- [ ] Preços estão corretos

### Meta Pixel (quando Pixel MX estiver configurado)

- [ ] PageView envia evento
- [ ] ViewContent envia evento com `currency` correta
- [ ] AddToCart envia evento com preço convertido
- [ ] InitiateCheckout envia evento

---

## 🚨 Problemas Conhecidos & Soluções

### Problema: "Cannot read property 'currency' of undefined"

**Causa:** Hook `useCountry()` sendo usado em server component
**Solução:** Adicionar `'use client'` no topo do componente

### Problema: Preços não convertem

**Causa:** Produto não tem campo `price` ou é undefined
**Solução:** Verificar estrutura do produto em `data/products.json`

### Problema: Detecção de país não funciona

**Causa:** Query parameter não está sendo lido
**Solução:**
1. Limpar cache do navegador
2. Usar modo anônimo
3. Verificar URL tem `?country=MX`

### Problema: Shopify retorna erro

**Causa:** Credenciais México não configuradas
**Solução:** Preencher `.env.local` com tokens Shopify México

---

## 📊 Comparação Argentina vs México

### Preços (Conversão)

| Produto | Argentina (ARS) | México (MXN) | Taxa |
|---------|-----------------|--------------|------|
| Jordan 1 | $50.000 | $600 | 0.012 |
| Yeezy 350 | $80.000 | $960 | 0.012 |
| Dunk Low | $45.000 | $540 | 0.012 |

### Idioma

| Termo | AR | MX |
|-------|----|----|
| Tênis | Zapatillas | Tenis |
| Tamanho | Talle | Talla |
| Estoque | Stock | Stock |

### Formatação

| Tipo | AR | MX |
|------|----|----|
| Número | 1.234,56 | 1,234.56 |
| Moeda | $1.234,56 | $1,234.56 |
| Data | 22/10/2025 | 22/10/2025 |

---

## 🔧 Variáveis de Ambiente Necessárias

### Para Testar Argentina (Já Configurado)
```bash
NEXT_PUBLIC_AR_META_PIXEL_ID=1503220410800125
AR_META_CONVERSIONS_TOKEN=EAAROK9d...
NEXT_PUBLIC_AR_SHOPIFY_DOMAIN=9wurf1-73.myshopify.com
NEXT_PUBLIC_AR_SHOPIFY_TOKEN=7b53ccc...
```

### Para Testar México (Configurar Depois)
```bash
NEXT_PUBLIC_MX_META_PIXEL_ID=[seu_pixel_id]
MX_META_CONVERSIONS_TOKEN=[seu_token]
NEXT_PUBLIC_MX_SHOPIFY_DOMAIN=snkhouse-mx.myshopify.com
NEXT_PUBLIC_MX_SHOPIFY_TOKEN=[seu_token]
```

---

## 🚀 Próximos Passos (Após Testes)

1. **Se Tudo OK:**
   - ✅ Fazer commit das mudanças
   - ✅ Criar loja Shopify México
   - ✅ Criar Meta Pixel México
   - ✅ Preencher .env.local com credenciais MX
   - ✅ Deploy no Vercel
   - ✅ Configurar domínios (snkhousemexico.com)

2. **Se Houver Bugs:**
   - 🐛 Listar bugs encontrados
   - 🔧 Corrigir antes de commit
   - 🧪 Testar novamente

---

## 💡 Dicas de Teste

### DevTools Console

Execute no console para ver config atual:
```javascript
// Ver país detectado
console.log(window.location.hostname)

// Ver config do país (após carregar)
// (Não funciona diretamente - precisa estar dentro do React)
```

### React DevTools

1. Instalar extensão React DevTools
2. Inspecionar componente ProductCard
3. Ver props: `price`, `formattedPrice`
4. Verificar valores convertidos

### Network Tab

1. Abrir DevTools > Network
2. Filter: `graphql` para ver chamadas Shopify
3. Filter: `facebook` para ver eventos Pixel
4. Verificar payloads e responses

---

## 📞 Suporte

Se encontrar problemas:
1. Verificar console por erros
2. Verificar Network tab
3. Testar em modo anônimo
4. Limpar cache e cookies
5. Reportar bugs com screenshots

---

## ✅ Aprovação para Produção

Antes de fazer commit e deploy, verificar:

- [ ] Todos os testes passaram
- [ ] Preços convertem corretamente
- [ ] Traduções estão corretas
- [ ] Não há erros no console
- [ ] Build roda sem erros (`npm run build`)
- [ ] Argentina continua funcionando normalmente
- [ ] México funciona com query parameter

**Quando aprovar:** Avisar para fazer commit e configurar produção!
