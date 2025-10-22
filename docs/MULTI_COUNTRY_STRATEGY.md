# 🌎 Estratégia Multi-País: SNKHOUSE

## Objetivo

Replicar a operação SNKHOUSE para o México mantendo:
- Código base compartilhado (fácil manutenção)
- Configurações específicas por país
- Deploys independentes no Vercel
- Domínios separados (snkhouseargentina.com + snkhousemexico.com)

---

## 📊 Opções Disponíveis

### Opção 1: Multi-Tenancy (Single Codebase) ⭐ RECOMENDADO

**Como Funciona:**
- Um único repositório e codebase
- Sistema de configuração por país
- Detecção automática de domínio
- Deploy único que serve múltiplos domínios

**Vantagens:**
- ✅ Manutenção centralizada (1 bug fix = todos os países)
- ✅ Fácil adicionar novos países (Brasil, Chile, etc)
- ✅ Código DRY (Don't Repeat Yourself)
- ✅ Features novas propagam automaticamente
- ✅ Um único deploy no Vercel

**Desvantagens:**
- ⚠️ Setup inicial mais complexo
- ⚠️ Precisa pensar em isolamento de dados

**Estrutura:**
```
src/
├── config/
│   ├── countries/
│   │   ├── argentina.js
│   │   └── mexico.js
│   └── index.js (detecta país atual)
├── utils/
│   ├── currency.js
│   └── i18n.js
└── ...
```

---

### Opção 2: Fork do Repositório

**Como Funciona:**
- Duplicar repositório atual
- Criar novo repo: store-snkhouse-mexico
- Ajustar configs manualmente
- Deploy separado

**Vantagens:**
- ✅ Simples e rápido para começar
- ✅ Isolamento total entre países
- ✅ Pode divergir completamente se necessário

**Desvantagens:**
- ❌ Manutenção duplicada (2x trabalho)
- ❌ Bug fixes precisam ser aplicados 2x
- ❌ Features novas precisam ser copiadas manualmente
- ❌ Código duplicado

---

### Opção 3: Monorepo (Turborepo/Nx)

**Como Funciona:**
- Estrutura com packages compartilhados
- Apps separados para cada país
- Sistema de build otimizado

**Vantagens:**
- ✅ Código compartilhado em packages
- ✅ Deploys verdadeiramente independentes
- ✅ Escalável para muitos países

**Desvantagens:**
- ⚠️ Setup muito complexo
- ⚠️ Overhead de infraestrutura
- ⚠️ Overkill para 2 países

---

## 🎯 Recomendação: Opção 1 (Multi-Tenancy)

### Por quê?

1. **Escalabilidade:** Adicionar Brasil, Chile, Colômbia será trivial
2. **Manutenção:** Um único codebase = menos bugs
3. **Custo:** Um único deploy no Vercel (múltiplos domínios é grátis)
4. **Eficiência:** Features novas beneficiam todos os países

---

## 🏗️ Arquitetura Multi-Tenancy

### 1. Sistema de Configuração

```javascript
// src/config/countries/argentina.js
export default {
  code: 'AR',
  name: 'Argentina',
  domain: 'snkhouseargentina.com',
  currency: {
    code: 'ARS',
    symbol: '$',
    locale: 'es-AR',
  },
  shopify: {
    domain: '9wurf1-73.myshopify.com',
    storefrontToken: 'xxx',
  },
  metaPixel: {
    id: '1503220410800125',
    conversionsToken: 'xxx',
  },
  i18n: {
    locale: 'es-AR',
    translations: {
      addToCart: 'Agregar al carrito',
      whatsapp: '+54 11 xxxx-xxxx',
    },
  },
}

// src/config/countries/mexico.js
export default {
  code: 'MX',
  name: 'México',
  domain: 'snkhousemexico.com',
  currency: {
    code: 'MXN',
    symbol: '$',
    locale: 'es-MX',
  },
  shopify: {
    domain: 'snkhouse-mx.myshopify.com', // Nova loja Shopify
    storefrontToken: 'xxx',
  },
  metaPixel: {
    id: 'XXXXXXXXXX', // Novo Pixel México
    conversionsToken: 'xxx',
  },
  i18n: {
    locale: 'es-MX',
    translations: {
      addToCart: 'Agregar al carrito',
      whatsapp: '+52 55 xxxx-xxxx',
    },
  },
}
```

### 2. Detecção de País

```javascript
// src/config/index.js
import argentinaConfig from './countries/argentina'
import mexicoConfig from './countries/mexico'

const configs = {
  AR: argentinaConfig,
  MX: mexicoConfig,
}

export function getCountryConfig() {
  // Detecção via hostname
  const hostname = typeof window !== 'undefined'
    ? window.location.hostname
    : process.env.VERCEL_URL || 'localhost'

  if (hostname.includes('mexico')) return configs.MX
  if (hostname.includes('argentina')) return configs.AR

  // Default: Argentina
  return configs.AR
}

export function useCountry() {
  const [config, setConfig] = useState(getCountryConfig())

  useEffect(() => {
    setConfig(getCountryConfig())
  }, [])

  return config
}
```

### 3. Conversão de Preços

```javascript
// src/utils/currency.js
const exchangeRates = {
  ARS: 1,
  MXN: 0.046, // 1 ARS = 0.046 MXN (aproximadamente)
}

export function convertPrice(priceARS, targetCurrency) {
  const rate = exchangeRates[targetCurrency] || 1
  return Math.round(priceARS * rate)
}

export function formatCurrency(amount, currencyConfig) {
  return new Intl.NumberFormat(currencyConfig.locale, {
    style: 'currency',
    currency: currencyConfig.code,
  }).format(amount)
}
```

### 4. Component Example

```javascript
// src/components/ProductCard.jsx
import { useCountry } from '@/config'
import { formatCurrency, convertPrice } from '@/utils/currency'

export default function ProductCard({ product }) {
  const country = useCountry()

  // Converter preço base (em ARS) para moeda do país
  const localPrice = convertPrice(product.price, country.currency.code)
  const formattedPrice = formatCurrency(localPrice, country.currency)

  return (
    <div>
      <h3>{product.name}</h3>
      <p>{formattedPrice}</p>
      <button>
        {country.i18n.translations.addToCart}
      </button>
    </div>
  )
}
```

---

## 🚀 Implementação Passo a Passo

### Fase 1: Setup Configuração (1-2 dias)
1. Criar estrutura `src/config/countries/`
2. Implementar sistema de detecção de país
3. Criar hook `useCountry()`
4. Documentar estrutura de config

### Fase 2: Adaptar Components (2-3 dias)
1. Atualizar componentes para usar `useCountry()`
2. Implementar conversão de preços
3. Ajustar formatação de moeda
4. Testar com ambos os países

### Fase 3: Integrações (2 dias)
1. Configurar nova loja Shopify México
2. Criar novo Meta Pixel México
3. Atualizar API routes para multi-país
4. Configurar webhooks por país

### Fase 4: Deploy Vercel (1 dia)
1. Configurar domínios múltiplos no Vercel
2. Adicionar variáveis de ambiente por país
3. Testar deploy em ambos domínios
4. Configurar DNS

### Fase 5: Testes & Launch (1-2 dias)
1. Testar funcionalidades em ambos sites
2. Verificar conversões Meta Pixel
3. Validar checkout Shopify
4. Launch México! 🇲🇽

---

## 📋 Checklist de Requisitos

### Shopify México
- [ ] Criar nova loja Shopify para México
- [ ] Migrar catálogo de produtos
- [ ] Configurar preços em MXN
- [ ] Configurar métodos de pagamento MX
- [ ] Configurar envio para México
- [ ] Obter Storefront Access Token

### Meta Pixel México
- [ ] Criar novo Business Manager México
- [ ] Criar novo Pixel México
- [ ] Obter Pixel ID
- [ ] Obter Conversions API Token
- [ ] Configurar webhook Shopify

### Domínio & Infraestrutura
- [ ] Registrar snkhousemexico.com
- [ ] Configurar DNS
- [ ] Adicionar domínio no Vercel
- [ ] Configurar SSL/HTTPS

### Conteúdo
- [ ] Revisar traduções es-MX vs es-AR
- [ ] Ajustar número WhatsApp México
- [ ] Atualizar políticas (envio, devolução)
- [ ] Revisar termos legais México

---

## 💰 Custos Estimados

| Item | Custo | Frequência |
|------|-------|------------|
| Domínio snkhousemexico.com | $10-15 USD | Anual |
| Shopify México | $0-29 USD | Mensal |
| Vercel (múltiplos domínios) | $0 | Grátis |
| Meta Pixel | $0 | Grátis |
| **Total** | **~$10-15** | **Setup** |
| **Total Mensal** | **$0-29** | **Operação** |

---

## 🎨 Diferenças es-AR vs es-MX

### Terminologia

| Conceito | Argentina (es-AR) | México (es-MX) |
|----------|-------------------|-----------------|
| Tênis | Zapatillas | Tenis |
| Frete | Envío | Envío |
| Carrinho | Carrito | Carrito |
| Tamanho | Talle | Talla |

### Formatação

**Moeda:**
- AR: $1.234,56 (ponto para milhares, vírgula para decimais)
- MX: $1,234.56 (vírgula para milhares, ponto para decimais)

**Data:**
- AR: DD/MM/YYYY
- MX: DD/MM/YYYY (igual)

**Telefone:**
- AR: +54 11 xxxx-xxxx
- MX: +52 55 xxxx-xxxx

---

## 🔐 Variáveis de Ambiente

```bash
# .env.local

# Argentina
NEXT_PUBLIC_AR_SHOPIFY_DOMAIN=9wurf1-73.myshopify.com
NEXT_PUBLIC_AR_SHOPIFY_TOKEN=xxx
NEXT_PUBLIC_AR_META_PIXEL_ID=1503220410800125
AR_META_CONVERSIONS_TOKEN=xxx
AR_SHOPIFY_WEBHOOK_SECRET=xxx

# México
NEXT_PUBLIC_MX_SHOPIFY_DOMAIN=snkhouse-mx.myshopify.com
NEXT_PUBLIC_MX_SHOPIFY_TOKEN=xxx
NEXT_PUBLIC_MX_META_PIXEL_ID=XXXXXXXXXX
MX_META_CONVERSIONS_TOKEN=xxx
MX_SHOPIFY_WEBHOOK_SECRET=xxx

# Exchange Rates (atualizar periodicamente)
EXCHANGE_RATE_ARS_TO_MXN=0.046
```

---

## 📈 Próximos Países (Roadmap)

Com essa arquitetura, adicionar novos países é trivial:

1. **Brasil** 🇧🇷
   - Idioma: pt-BR
   - Moeda: BRL (Real)
   - Domain: snkhousebrasil.com

2. **Chile** 🇨🇱
   - Idioma: es-CL
   - Moeda: CLP (Peso Chileno)
   - Domain: snkhousechile.com

3. **Colômbia** 🇨🇴
   - Idioma: es-CO
   - Moeda: COP (Peso Colombiano)
   - Domain: snkhousecolombia.com

---

## ✅ Vantagens Desta Abordagem

1. **DRY:** Código não se repete
2. **Escalável:** Fácil adicionar países
3. **Manutenível:** Um bug fix = todos os países
4. **Custo:** Um deploy, múltiplos domínios
5. **Performance:** Vercel Edge Functions
6. **SEO:** Cada domínio é independente
7. **Analytics:** Separação por país no Meta Pixel

---

## ❓ Perguntas para Decidir

Antes de começar a implementação:

1. **Shopify México:**
   - Já tem loja Shopify México criada?
   - Vai usar mesmos produtos ou catálogo diferente?
   - Preços: converter automaticamente ou definir manualmente?

2. **Meta Pixel:**
   - Quer Pixel separado para México?
   - Ou pode usar mesmo Pixel com separação por URL?

3. **Conteúdo:**
   - Políticas de envio/devolução são iguais?
   - WhatsApp: mesmo número ou número México?
   - Vai precisar ajustar muito o idioma es-AR → es-MX?

4. **Timing:**
   - Prazo para lançar México?
   - Vai lançar com catálogo completo ou MVP?

---

## 🚀 Próximos Passos

1. **Validar requisitos** (responder perguntas acima)
2. **Criar config structure** (Fase 1)
3. **Setup Shopify México**
4. **Implementar multi-tenancy**
5. **Deploy e testar**
6. **Launch México!** 🎉
