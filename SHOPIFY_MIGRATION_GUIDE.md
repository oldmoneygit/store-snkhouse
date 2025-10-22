# 🔄 Guia de Migração: WooCommerce → Shopify Storefront API

Este guia explica como migrar o SNKHOUSE Showroom de WooCommerce para Shopify Storefront API.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Pré-requisitos](#pré-requisitos)
3. [Passo 1: Configurar Shopify App](#passo-1-configurar-shopify-app)
4. [Passo 2: Importar Produtos](#passo-2-importar-produtos)
5. [Passo 3: Mapear Variant IDs](#passo-3-mapear-variant-ids)
6. [Passo 4: Atualizar products.json](#passo-4-atualizar-productsjson)
7. [Passo 5: Testar o Checkout](#passo-5-testar-o-checkout)
8. [Passo 6: Deploy](#passo-6-deploy)
9. [Troubleshooting](#troubleshooting)

---

## 📌 Visão Geral

**Fluxo Atual (WooCommerce):**
```
Next.js (Vercel) → Produtos locais (data/products.json) → Redireciona para WooCommerce → Checkout Shopify (gambiarra)
```

**Novo Fluxo (Shopify Storefront API):**
```
Next.js (Vercel) → Produtos locais (data/products.json) → Cria checkout via API → Checkout Shopify (oficial)
```

**Vantagens:**
- ✅ Integração oficial do Shopify
- ✅ Sem redirecionamentos desnecessários
- ✅ Controle total sobre a experiência
- ✅ Permite usar gateway Appmax
- ✅ Código mais limpo e manutenível

---

## ✅ Pré-requisitos

Antes de começar, você precisa ter:

- ✅ Conta Shopify ativa
- ✅ Acesso ao painel admin da Shopify
- ✅ Domínio da sua loja (ex: `snkhouse.myshopify.com`)
- ✅ Produtos prontos para importar

---

## 🔧 Passo 1: Configurar Shopify App

### 1.1. Criar Custom App

1. Acesse seu painel Shopify: `https://admin.shopify.com/store/SEU_STORE`
2. Vá em **Settings** → **Apps and sales channels**
3. Clique em **Develop apps** (ou "Desenvolver apps")
4. Se for a primeira vez, clique em **Allow custom app development**
5. Clique em **Create an app**
6. Dê um nome: `"SNKHOUSE Storefront"`

### 1.2. Configurar Permissões da Storefront API

1. Dentro do app criado, vá na aba **Configuration**
2. Em **Storefront API integration**, clique em **Configure**
3. Selecione os **scopes** (permissões):

```
✅ unauthenticated_read_product_listings
✅ unauthenticated_read_product_inventory
✅ unauthenticated_read_product_tags
✅ unauthenticated_read_collections
✅ unauthenticated_write_checkouts
✅ unauthenticated_read_checkouts
✅ unauthenticated_read_product_pickup_locations (opcional)
```

4. **Salve** as configurações

### 1.3. Instalar o App

1. Clique na aba **API credentials**
2. Clique em **Install app**
3. Confirme a instalação

### 1.4. Copiar Credenciais

Após instalar, você verá:

- **Storefront API access token** - `7b53ccc78ba348565e335d6cb129f610` ✅ (já configurado)
- **API key** (também chamado de Storefront access token)

Também anote:
- **Nome da sua loja**: `SEU_DOMINIO.myshopify.com` ⚠️ **VOCÊ PRECISA PREENCHER ISSO**

### 1.5. Atualizar Variáveis de Ambiente

Abra o arquivo [`.env.local`](.env.local) e substitua:

```env
# Substitua SEU_DOMINIO pelo domínio real da sua loja
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=SEU_DOMINIO.myshopify.com
```

**Exemplo:**
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=snkhouse.myshopify.com
```

---

## 📦 Passo 2: Importar Produtos

Você tem **2 opções** para importar produtos do WooCommerce para Shopify:

### Opção A: Importação Manual (Recomendado para < 50 produtos)

1. **Exportar do WooCommerce:**
   - Painel WooCommerce → **Produtos** → **Exportar**
   - Baixe o arquivo CSV

2. **Importar para Shopify:**
   - Painel Shopify → **Produtos** → **Importar**
   - Faça upload do CSV
   - Mapeie os campos (nome, preço, tamanhos, etc.)
   - Clique em **Import products**

### Opção B: Importação Automática (Recomendado para > 50 produtos)

Use apps da Shopify para migração:

1. **Store Importer** (grátis): https://apps.shopify.com/store-importer
2. **LitExtension** (pago): https://apps.shopify.com/litextension

### 2.1. Configurar Variantes (Variants)

**MUITO IMPORTANTE:** Cada tamanho é uma variante separada no Shopify.

**Exemplo:**

Produto: **Nike Air Jordan 1 Travis Scott**

```
Tamanhos disponíveis: 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45

No Shopify:
├── Variant 1: Tamanho 35 → gid://shopify/ProductVariant/45678901234
├── Variant 2: Tamanho 36 → gid://shopify/ProductVariant/45678901235
├── Variant 3: Tamanho 37 → gid://shopify/ProductVariant/45678901236
└── ... (e assim por diante)
```

**Como criar variants no Shopify:**

1. Vá em **Produtos** → Selecione o produto
2. Na seção **Variants**, clique em **Add variant**
3. Para **Option name**: use `Tamanho` ou `Size`
4. Para **Option values**: adicione cada tamanho (35, 36, 37...)
5. Shopify criará automaticamente um variant ID para cada tamanho

---

## 🔗 Passo 3: Mapear Variant IDs

Agora você precisa mapear os IDs das variantes do Shopify para cada produto e tamanho.

### 3.1. Obter Variant IDs

**Método 1: Via GraphQL Playground (Recomendado)**

1. Acesse: `https://SEUDOMINIO.myshopify.com/admin/api/graphql`
2. Use esta query:

```graphql
{
  products(first: 10) {
    edges {
      node {
        id
        title
        handle
        variants(first: 50) {
          edges {
            node {
              id
              title
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
}
```

3. Copie os `variant IDs` que você precisa

**Método 2: Via Painel Shopify**

1. Vá em **Produtos** → Selecione o produto
2. Clique em cada variante
3. Na URL, você verá algo como: `.../variants/45678901234`
4. O número é o Variant ID (mas precisa adicionar o prefixo GID)

**Formato final:** `gid://shopify/ProductVariant/45678901234`

### 3.2. Criar Planilha de Mapeamento

Crie uma planilha para organizar o mapeamento:

| Produto | Tamanho | WooCommerce ID | Shopify Variant ID |
|---------|---------|----------------|---------------------|
| Nike Air Jordan 1 Travis Scott | 35 | 26087 | gid://shopify/ProductVariant/45678901234 |
| Nike Air Jordan 1 Travis Scott | 36 | 26087 | gid://shopify/ProductVariant/45678901235 |
| Nike Air Jordan 1 Travis Scott | 37 | 26087 | gid://shopify/ProductVariant/45678901236 |
| ... | ... | ... | ... |

---

## 📝 Passo 4: Atualizar products.json

Agora você precisa adicionar os Shopify Variant IDs ao arquivo [`data/products.json`](data/products.json).

### 4.1. Nova Estrutura de Dados

**ANTES (WooCommerce):**
```json
{
  "id": 53,
  "name": "Nike Air Jordan 1 Retro High x Travis Scott",
  "slug": "nike-air-jordan-1-retro-high-x-travis-scott",
  "price": 82713.38,
  "currency": "ARS",
  "sizes": [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
  "woocommerceId": "26087"
}
```

**DEPOIS (Shopify):**
```json
{
  "id": 53,
  "name": "Nike Air Jordan 1 Retro High x Travis Scott",
  "slug": "nike-air-jordan-1-retro-high-x-travis-scott",
  "price": 82713.38,
  "currency": "ARS",
  "sizes": [
    {
      "size": 35,
      "shopifyVariantId": "gid://shopify/ProductVariant/45678901234"
    },
    {
      "size": 36,
      "shopifyVariantId": "gid://shopify/ProductVariant/45678901235"
    },
    {
      "size": 37,
      "shopifyVariantId": "gid://shopify/ProductVariant/45678901236"
    },
    {
      "size": 38,
      "shopifyVariantId": "gid://shopify/ProductVariant/45678901237"
    },
    {
      "size": 39,
      "shopifyVariantId": "gid://shopify/ProductVariant/45678901238"
    },
    {
      "size": 40,
      "shopifyVariantId": "gid://shopify/ProductVariant/45678901239"
    },
    {
      "size": 41,
      "shopifyVariantId": "gid://shopify/ProductVariant/45678901240"
    },
    {
      "size": 42,
      "shopifyVariantId": "gid://shopify/ProductVariant/45678901241"
    },
    {
      "size": 43,
      "shopifyVariantId": "gid://shopify/ProductVariant/45678901242"
    },
    {
      "size": 44,
      "shopifyVariantId": "gid://shopify/ProductVariant/45678901243"
    },
    {
      "size": 45,
      "shopifyVariantId": "gid://shopify/ProductVariant/45678901244"
    }
  ],
  "shopifyProductId": "gid://shopify/Product/8765432109876",
  "shopifyHandle": "nike-air-jordan-1-retro-high-x-travis-scott",
  "woocommerceId": "26087"
}
```

### 4.2. Atualizar CartContext

O código já está preparado! O [CartContext](src/context/CartContext.jsx) já usa `item.shopifyVariantId` automaticamente.

Quando o cliente seleciona um tamanho e adiciona ao carrinho, o sistema:
1. Busca o `shopifyVariantId` correspondente ao tamanho
2. Armazena no carrinho junto com quantidade
3. Envia para Shopify ao clicar em "Finalizar Compra"

### 4.3. Script de Migração (Opcional)

Se você tiver muitos produtos, crie um script Node.js para automatizar:

```javascript
// scripts/add-shopify-variants.js
const fs = require('fs');
const products = require('../data/products.json');

// Seu mapeamento de IDs (preencher manualmente)
const variantMapping = {
  "53": { // Product ID
    "35": "gid://shopify/ProductVariant/45678901234",
    "36": "gid://shopify/ProductVariant/45678901235",
    // ... outros tamanhos
  },
  // ... outros produtos
};

// Atualizar estrutura
products.products = products.products.map(product => {
  if (variantMapping[product.id]) {
    const newSizes = product.sizes.map(size => ({
      size: size,
      shopifyVariantId: variantMapping[product.id][size] || null
    }));

    return {
      ...product,
      sizes: newSizes
    };
  }
  return product;
});

// Salvar
fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2));
console.log('Products updated!');
```

---

## 🧪 Passo 5: Testar o Checkout

### 5.1. Testar Localmente

1. **Atualizar domínio no `.env.local`:**
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=sua-loja.myshopify.com
```

2. **Reiniciar o servidor:**
```bash
npm run dev
```

3. **Testar o fluxo:**
   - Navegue até um produto
   - Selecione um tamanho
   - Adicione ao carrinho
   - Vá para `/carrito`
   - Clique em **"Finalizar Compra"**
   - Você deve ser redirecionado para `checkout.shopify.com/...`

### 5.2. Verificar Checkout no Shopify

1. Complete o formulário de checkout
2. Use um cartão de teste: `4242 4242 4242 4242` (modo de teste)
3. Verifique se o pedido aparece no painel Shopify

### 5.3. Troubleshooting

**Erro: "Shopify credentials not configured"**
- Verifique se o `.env.local` está preenchido corretamente
- Reinicie o servidor (`Ctrl+C` e `npm run dev`)

**Erro: "Checkout creation failed"**
- Verifique se os `shopifyVariantId` estão corretos
- Verifique se os produtos existem no Shopify
- Verifique se as permissões da API estão corretas

**Erro: "Product variant not found"**
- O `shopifyVariantId` está incorreto ou o produto não existe
- Verifique o ID na query GraphQL

---

## 🚀 Passo 6: Deploy

### 6.1. Atualizar Vercel Environment Variables

1. Acesse seu projeto na Vercel: https://vercel.com/seu-projeto
2. Vá em **Settings** → **Environment Variables**
3. Adicione/atualize:

```
NEXT_PUBLIC_META_PIXEL_ID = 1724528428093370
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN = sua-loja.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN = 7b53ccc78ba348565e335d6cb129f610
NEXT_PUBLIC_SHOPIFY_API_VERSION = 2024-10
NEXT_PUBLIC_SITE_URL = https://store.snkhouse.com
```

4. **Salve** as variáveis

### 6.2. Deploy

**Opção 1: Via Git (Automático)**
```bash
git add .
git commit -m "Migrate to Shopify Storefront API"
git push origin main
```

Vercel fará deploy automaticamente.

**Opção 2: Via CLI**
```bash
vercel --prod
```

### 6.3. Testar em Produção

1. Acesse: `https://store.snkhouse.com`
2. Teste o fluxo completo de compra
3. Verifique se o pedido aparece no Shopify

---

## 🔍 Troubleshooting

### Erro: "CORS error when calling Shopify API"

**Solução:** Certifique-se de que está usando a Storefront API e não a Admin API.

### Erro: "Invalid API credentials"

**Solução:** Verifique se o token está correto no `.env.local` e no Vercel.

### Erro: "Product not found"

**Solução:** Certifique-se de que o `shopifyHandle` corresponde ao handle do produto no Shopify.

### Checkout redireciona para página em branco

**Solução:**
- Verifique se o checkout está configurado no Shopify
- Vá em **Settings** → **Checkout** e ative o checkout

### Produtos não aparecem no checkout

**Solução:**
- Certifique-se de que os produtos estão **Published** no canal "Online Store"
- Vá em **Produtos** → Selecione o produto → **Sales channels** → Marque "Online Store"

---

## 📊 Status da Migração

### ✅ Concluído

- [x] Criada biblioteca de integração Shopify (`src/lib/shopify.js`)
- [x] Atualizado CartContext para usar Shopify checkout
- [x] Atualizado componente CartSummary
- [x] Configuradas variáveis de ambiente
- [x] Criado guia de migração

### ⚠️ Pendente (Requer Ação Manual)

- [ ] Preencher `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` no `.env.local`
- [ ] Importar produtos para Shopify
- [ ] Mapear Shopify Variant IDs
- [ ] Atualizar `data/products.json` com novos variant IDs
- [ ] Testar checkout localmente
- [ ] Atualizar variáveis no Vercel
- [ ] Deploy em produção

---

## 📚 Recursos Adicionais

- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [GraphQL Admin API](https://shopify.dev/docs/api/admin-graphql)
- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli)
- [Testing Checkouts](https://help.shopify.com/en/manual/checkout-settings/test-orders)

---

## 🆘 Precisa de Ajuda?

Se encontrar problemas durante a migração:

1. Verifique a seção [Troubleshooting](#troubleshooting)
2. Revise os logs do console (`console.log`)
3. Verifique os logs da Vercel (se em produção)
4. Teste com apenas 1 produto primeiro antes de migrar todos

---

**Boa sorte com a migração! 🚀**
