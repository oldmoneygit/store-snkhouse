# Como Gerar Admin API Access Token no Shopify

Para o sistema de rastreamento de pedidos funcionar, você precisa gerar um **Admin API Access Token** com permissões de leitura de pedidos.

## 📝 Passo a Passo

### 1. Acesse o Shopify Admin

**Argentina:**
- URL: https://admin.shopify.com/store/9wurf1-73
- Ou: https://9wurf1-73.myshopify.com/admin

**México:**
- URL: https://admin.shopify.com/store/pago-snkhouse-mexico
- Ou: https://pago-snkhouse-mexico.myshopify.com/admin

### 2. Vá para Apps

1. No menu lateral, clique em **Settings** (Configurações)
2. Clique em **Apps and sales channels** (Aplicativos e canais de vendas)

### 3. Desenvolva um App Personalizado

1. Clique em **Develop apps** (Desenvolver aplicativos)
2. Se for a primeira vez, clique em **Allow custom app development** (Permitir desenvolvimento de aplicativos personalizados)
3. Clique em **Create an app** (Criar um aplicativo)

### 4. Configure o App

1. **Nome do App:** "SNKHOUSE Order Tracking"
2. Clique em **Create app** (Criar aplicativo)

### 5. Configure as Permissões (Scopes)

1. Clique na aba **Configuration** (Configuração)
2. Role até **Admin API integration**
3. Clique em **Configure** (Configurar)

4. **Selecione os seguintes scopes:**

   **Orders (Pedidos):**
   - ✅ `read_orders` - Ler pedidos
   - ✅ `read_all_orders` - Ler todos os pedidos (recomendado)

   **Fulfillments (Entregas):**
   - ✅ `read_assigned_fulfillment_orders`
   - ✅ `read_merchant_managed_fulfillment_orders`

   **Customers (Clientes) - Opcional:**
   - ✅ `read_customers` - Para validação de email

5. Clique em **Save** (Salvar)

### 6. Instale o App

1. Clique na aba **API credentials** (Credenciais da API)
2. Clique em **Install app** (Instalar aplicativo)
3. Confirme clicando em **Install** (Instalar)

### 7. Copie o Admin API Access Token

⚠️ **IMPORTANTE: Este token só será exibido uma vez!**

1. Após instalar, você verá o **Admin API access token**
2. Clique em **Reveal token once** (Revelar token uma vez)
3. **COPIE O TOKEN IMEDIATAMENTE** e guarde em um lugar seguro
4. Este token tem o formato: `shpat_xxxxxxxxxxxxxxxxxxxxxxxx`

### 8. Adicione ao `.env.local`

Cole o token nas variáveis de ambiente:

**Para Argentina:**
```env
AR_SHOPIFY_ADMIN_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxx
```

**Para México:**
```env
MX_SHOPIFY_ADMIN_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxx
```

### 9. Reinicie o Servidor Next.js

```bash
# Pare o servidor (Ctrl+C)
# Inicie novamente
npm run dev
```

## 🔐 Diferenças entre Tokens

| Token | Uso | Permissões | Local |
|-------|-----|------------|-------|
| **Storefront Access Token** | Buscar produtos na loja | Somente leitura de catálogo | Frontend (público) |
| **Admin API Access Token** | Buscar pedidos, clientes, etc | Leitura/escrita admin | Backend (privado) |

## ✅ Tokens Necessários

Para o projeto funcionar completamente, você precisa de **ambos**:

### Argentina (9wurf1-73.myshopify.com)

```env
# Storefront Token (já configurado)
NEXT_PUBLIC_AR_SHOPIFY_TOKEN=7b53ccc78ba348565e335d6cb129f610

# Admin Token (NOVO - adicionar)
AR_SHOPIFY_ADMIN_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxx
```

### México (pago-snkhouse-mexico.myshopify.com)

```env
# Storefront Token (já configurado)
NEXT_PUBLIC_MX_SHOPIFY_TOKEN=820828ea60d749b4c1c341d989a92a98

# Admin Token (NOVO - adicionar)
MX_SHOPIFY_ADMIN_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxx
```

## 🧪 Testando

Após adicionar os tokens, teste a busca de pedidos:

```bash
curl -X POST http://localhost:3000/api/orders/search \
  -H "Content-Type: application/json" \
  -d '{
    "email": "cliente@email.com",
    "orderNumber": "#1001"
  }'
```

Deve retornar os dados do pedido sem erro 401.

## 🔒 Segurança

⚠️ **NUNCA compartilhe ou commite o Admin Access Token!**

- O token deve estar apenas no `.env.local` (que está no `.gitignore`)
- Nunca exponha o token no frontend
- Use apenas em API routes do servidor

## ❌ Troubleshooting

### Erro 401 - Unauthorized
- Token incorreto ou expirado
- Gere um novo token seguindo os passos acima

### Erro 403 - Forbidden
- Token não tem as permissões necessárias
- Verifique se selecionou `read_orders` nos scopes

### Token não funciona
- Certifique-se de ter instalado o app após configurar os scopes
- Reinicie o servidor Next.js após adicionar ao `.env.local`

## 📚 Referências

- [Shopify Admin API Documentation](https://shopify.dev/docs/api/admin-rest)
- [Custom Apps Guide](https://help.shopify.com/en/manual/apps/app-types/custom-apps)
- [API Access Scopes](https://shopify.dev/docs/api/usage/access-scopes)
