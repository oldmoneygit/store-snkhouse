# 🔗 Configuração de Webhooks Shopify

## 📋 **Visão Geral**

Cada loja Shopify (Argentina e México) precisa ter seu webhook configurado para enviar eventos de compra para o Meta Pixel via Conversions API.

**Webhook Route:** `/api/shopify/webhook`

---

## 🇦🇷 **ARGENTINA - Configuração do Webhook**

### **1. Gerar Webhook Secret (se ainda não tem)**

```bash
# Gerar uma string aleatória segura
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Ou use este já gerado:**
```
383771b77aa992cee86c81f5a8182650621b8e2229eccba92b3485c1520fe844
```

---

### **2. Configurar no Vercel (Projeto Argentina)**

Acesse: https://vercel.com/dashboard → **snkhouse-argentina** → **Settings** → **Environment Variables**

**Adicione:**

```
Nome: SHOPIFY_WEBHOOK_SECRET
Valor: 383771b77aa992cee86c81f5a8182650621b8e2229eccba92b3485c1520fe844
☑️ Production  ☑️ Preview  ☑️ Development
```

**Importante:** Também precisa ter configurado:
```
NEXT_PUBLIC_META_PIXEL_ID=1503220410800125
META_CONVERSIONS_TOKEN=EAAROK9divmABP5fu1EfmxAZBpanynzTDm1eOwNW8QzWtym2zrcCV5e32IbHU728h4y
```

---

### **3. Configurar no Shopify Argentina**

1. Acesse: https://admin.shopify.com/store/9wurf1-73/settings/notifications
2. Vá em **Webhooks** (no final da página)
3. Clique em **Create webhook**

**Configurações:**

| Campo | Valor |
|-------|-------|
| **Event** | Order creation |
| **Format** | JSON |
| **URL** | `https://snkhouseargentina.com/api/shopify/webhook` |
| **Webhook API version** | 2024-10 (latest) |

4. Clique em **Save webhook**

---

### **4. Testar o Webhook Argentina**

**Opção 1: Teste Manual no Shopify**
1. No webhook criado, clique em **Send test notification**
2. Verifique os logs no Vercel: https://vercel.com/dashboard/deployments

**Opção 2: Fazer uma compra de teste**
1. Adicione um produto ao carrinho
2. Complete o checkout
3. Verifique no **Facebook Events Manager** se o evento **Purchase** foi recebido

---

## 🇲🇽 **MÉXICO - Configuração do Webhook**

### **1. Gerar Webhook Secret (diferente da Argentina!)**

```bash
# Gerar uma string aleatória segura
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Exemplo gerado:**
```
7f9a3b2c8d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a
```

---

### **2. Configurar no Vercel (Projeto México)**

Acesse: https://vercel.com/dashboard → **snkhouse-mexico** → **Settings** → **Environment Variables**

**Adicione:**

```
Nome: SHOPIFY_WEBHOOK_SECRET
Valor: 7f9a3b2c8d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a
☑️ Production  ☑️ Preview  ☑️ Development
```

**Importante:** Também precisa ter configurado:
```
NEXT_PUBLIC_META_PIXEL_ID=2012371212847052
META_CONVERSIONS_TOKEN=EAAROK9divmABPZCHW4XE2s42cprQotuhBMlOTrG6B1bzgzfMGswvKNvQT3f7c1oZANTzfVA5fyBiXOlKxnqpkmi5fIduVfIZA1OsBNETIwAIeosd8iTJglDFbUwEB0SJcAXP9PUxEvnWJwNxni3L7zJSD3ZAwriNJLzpupJoLbVbBCXip5ZCHowRX55jb8QZDZD
```

---

### **3. Configurar no Shopify México**

1. Acesse: https://admin.shopify.com/store/pago-snkhouse-mexico/settings/notifications
2. Vá em **Webhooks** (no final da página)
3. Clique em **Create webhook**

**Configurações:**

| Campo | Valor |
|-------|-------|
| **Event** | Order creation |
| **Format** | JSON |
| **URL** | `https://snkhousemexico.com/api/shopify/webhook` |
| **Webhook API version** | 2024-10 (latest) |

4. Clique em **Save webhook**

---

### **4. Testar o Webhook México**

**Opção 1: Teste Manual no Shopify**
1. No webhook criado, clique em **Send test notification**
2. Verifique os logs no Vercel: https://vercel.com/dashboard/deployments

**Opção 2: Fazer uma compra de teste**
1. Adicione um produto ao carrinho
2. Complete o checkout
3. Verifique no **Facebook Events Manager** se o evento **Purchase** foi recebido

---

## 🔐 **Segurança e Isolamento**

### **Como funciona o isolamento:**

```
┌─────────────────────────────────────────┐
│   🇦🇷 SHOPIFY ARGENTINA                  │
│   Webhook → snkhouseargentina.com/...   │
├─────────────────────────────────────────┤
│   Vercel Projeto: snkhouse-argentina    │
│   SHOPIFY_WEBHOOK_SECRET: 3837...       │
│   META_PIXEL_ID: 1503220410800125       │
│   META_CONVERSIONS_TOKEN: EAAROK9...    │
└─────────────────────────────────────────┘
                    ↓
        Envia Purchase APENAS para
        Meta Pixel Argentina


┌─────────────────────────────────────────┐
│   🇲🇽 SHOPIFY MÉXICO                     │
│   Webhook → snkhousemexico.com/...      │
├─────────────────────────────────────────┤
│   Vercel Projeto: snkhouse-mexico       │
│   SHOPIFY_WEBHOOK_SECRET: 7f9a...       │
│   META_PIXEL_ID: 2012371212847052       │
│   META_CONVERSIONS_TOKEN: EAAROK9...    │
└─────────────────────────────────────────┘
                    ↓
        Envia Purchase APENAS para
        Meta Pixel México
```

**Garantias:**
- ✅ Webhooks completamente isolados
- ✅ Cada loja Shopify chama seu próprio domínio
- ✅ Cada webhook envia para seu próprio Meta Pixel
- ✅ Secrets diferentes para cada país
- ✅ Zero risco de cross-tracking

---

## 🧪 **Verificação e Testes**

### **Verificar se webhook está ativo:**

**Argentina:**
```bash
curl -X GET "https://admin.shopify.com/store/9wurf1-73/settings/notifications" \
  -H "X-Shopify-Access-Token: YOUR_ADMIN_TOKEN"
```

**México:**
```bash
curl -X GET "https://admin.shopify.com/store/pago-snkhouse-mexico/settings/notifications" \
  -H "X-Shopify-Access-Token: YOUR_ADMIN_TOKEN"
```

---

### **Verificar logs no Vercel:**

1. Acesse: https://vercel.com/dashboard
2. Entre no projeto (Argentina ou México)
3. Vá em **Deployments** → clique no deploy atual
4. Vá em **Functions** → `/api/shopify/webhook`
5. Veja os logs de execução

---

### **Verificar eventos no Facebook:**

**Argentina:**
- https://business.facebook.com/events_manager2/list/pixel/1503220410800125

**México:**
- https://business.facebook.com/events_manager2/list/pixel/2012371212847052

Deve aparecer evento **Purchase** quando uma compra for concluída.

---

## 📊 **Dados Enviados no Webhook**

O webhook envia os seguintes dados para o Meta Pixel via Conversions API:

### **user_data (hasheado com SHA-256):**
- ✅ Email (`em`)
- ✅ Telefone (`ph`)
- ✅ Nome (`fn`)
- ✅ Sobrenome (`ln`)
- ✅ Cidade (`ct`)
- ✅ Estado/Província (`st`)
- ✅ CEP (`zp`)
- ✅ País (`country`)
- ✅ IP do cliente (`client_ip_address`)
- ✅ ID externo (`external_id`)

### **custom_data:**
- ✅ Valor total (`value`)
- ✅ Moeda (`currency`)
- ✅ IDs dos produtos (`content_ids`)
- ✅ Quantidade de items (`num_items`)
- ✅ Número do pedido (`order_id`)
- ✅ Detalhes de cada produto (`contents`)

### **event_data:**
- ✅ Nome do evento (`event_name`: Purchase)
- ✅ Timestamp (`event_time`)
- ✅ ID único do evento (`event_id`) - para deduplicação
- ✅ URL de origem (`event_source_url`)
- ✅ Fonte da ação (`action_source`: website)

---

## ❓ **Troubleshooting**

### **Webhook não está sendo chamado:**
1. Verifique se a URL está correta no Shopify
2. Verifique se o domínio está acessível
3. Tente fazer uma compra de teste

### **Webhook retorna erro 401 (Unauthorized):**
1. Verifique se o `SHOPIFY_WEBHOOK_SECRET` está configurado no Vercel
2. Verifique se o secret é o mesmo nos dois lados (Shopify + Vercel)

### **Purchase não aparece no Facebook:**
1. Verifique se `META_CONVERSIONS_TOKEN` está configurado
2. Verifique se `NEXT_PUBLIC_META_PIXEL_ID` está correto
3. Veja os logs no Vercel para mais detalhes

### **Eventos duplicados no Facebook:**
- O `event_id` garante deduplicação
- Se o mesmo `event_id` for enviado 2x, o Facebook conta apenas 1 vez

---

## 📚 **Referências**

- [Shopify Webhooks Documentation](https://shopify.dev/docs/api/admin-rest/2024-10/resources/webhook)
- [Facebook Conversions API](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)

---

**Última atualização:** 2025-01-22
