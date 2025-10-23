# Sistema de Rastreamento de Pedidos

Documentação do sistema de rastreamento de pedidos integrado com Shopify.

## 📋 Visão Geral

O sistema permite que clientes rastreiem seus pedidos usando:
- **Número do pedido** (ex: #1001)
- **Email** usado na compra

Funciona para ambos os países:
- 🇦🇷 **Argentina** (snkhouseargentina.com)
- 🇲🇽 **México** (snkhousemexico.com)

## 🔗 Acesso

Página de rastreamento: `/seguimiento-de-pedido`

## 🏗️ Arquitetura

### API Route
**Arquivo:** `src/app/api/orders/search/route.js`

**Endpoint:** `POST /api/orders/search`

**Request Body:**
```json
{
  "email": "cliente@email.com",
  "orderNumber": "#1001"
}
```

**Response (Sucesso):**
```json
{
  "success": true,
  "order": {
    "orderNumber": "#1001",
    "orderId": 123456789,
    "email": "cliente@email.com",
    "status": "in_transit",
    "statusText": "En tránsito",
    "estimatedDelivery": "2-3 días hábiles",
    "currentLocation": "En tránsito con Correo Argentino",
    "trackingInfo": [
      {
        "company": "Correo Argentino",
        "number": "AR123456789",
        "url": "https://tracking.correoargentino.com.ar/...",
        "status": "in_transit"
      }
    ],
    "history": [
      {
        "date": "23/10/2025 14:30",
        "status": "En tránsito",
        "location": "Correo Argentino"
      }
    ],
    "total": 82713.00,
    "currency": "ARS",
    "lineItems": [
      {
        "name": "Air Jordan 1 High OG",
        "quantity": 1,
        "price": 82713.00
      }
    ]
  },
  "totalOrders": 1
}
```

**Response (Erro):**
```json
{
  "error": "Nenhum pedido encontrado com os dados fornecidos"
}
```

### Detecção de País

O sistema detecta automaticamente o país baseado no hostname:
- `snkhousemexico.com` → México (MX)
- `snkhouseargentina.com` → Argentina (AR)
- `localhost:3001` → México (desenvolvimento)
- `localhost:3000` → Argentina (desenvolvimento)

### Credenciais Shopify

As credenciais são carregadas do `.env.local` baseado no país detectado:

**Argentina:**
```env
NEXT_PUBLIC_AR_SHOPIFY_DOMAIN=9wurf1-73.myshopify.com
NEXT_PUBLIC_AR_SHOPIFY_TOKEN=7b53ccc78ba348565e335d6cb129f610
```

**México:**
```env
NEXT_PUBLIC_MX_SHOPIFY_DOMAIN=pago-snkhouse-mexico.myshopify.com
NEXT_PUBLIC_MX_SHOPIFY_TOKEN=820828ea60d749b4c1c341d989a92a98
```

## 📊 Status do Pedido

O sistema mapeia os status do Shopify para status legíveis:

| Status Interno | Status Exibido | Descrição |
|---------------|----------------|-----------|
| `pending` | Pendiente | Pedido criado mas não pago |
| `confirmed` | Confirmado | Pagamento confirmado |
| `in_transit` | En tránsito | Pedido enviado |
| `delivered` | Entregado | Pedido entregue |

## 🚚 Informações de Rastreamento

Quando o pedido é enviado e tem tracking number configurado no Shopify, o sistema exibe:

1. **Transportadora** - Nome da empresa de transporte
2. **Número de Rastreio** - Código de rastreamento
3. **Link de Rastreamento** - URL para rastrear no site da transportadora

### Como Configurar no Shopify

1. Acesse o pedido no Shopify Admin
2. Clique em "Fulfill items"
3. Adicione as informações de rastreamento:
   - **Tracking number** - Número fornecido pela transportadora
   - **Shipping carrier** - Selecione a transportadora
   - **Tracking URL** (opcional) - URL customizada

4. Clique em "Fulfill items"

As informações aparecerão automaticamente na página de rastreamento.

## 📜 Histórico do Pedido

O sistema gera automaticamente um histórico baseado nos eventos do Shopify:

1. **Pedido confirmado** - Data de criação (`created_at`)
2. **Pago confirmado** - Data de confirmação (`confirmed_at`)
3. **En tránsito** - Data de envio (`fulfillments.created_at`)
4. **Entregado** - Data de entrega (`fulfillments.updated_at` quando status = delivered)

## 🔐 Segurança

### Validações

1. **Email obrigatório** - Previne busca de pedidos sem autorização
2. **Validação de correspondência** - Se buscar por número, valida que o email corresponde
3. **Token no servidor** - Access tokens do Shopify nunca são expostos ao cliente

### Autenticação

O sistema requer **email + número do pedido** para garantir que apenas o dono do pedido pode rastreá-lo.

## 🧪 Testando

### Desenvolvimento Local

1. Configure o `.env.local` com credenciais válidas do Shopify
2. Inicie o servidor: `npm run dev`
3. Acesse: `http://localhost:3000/seguimiento-de-pedido`
4. Use dados de um pedido real do Shopify

### Busca por Email

```bash
curl -X POST http://localhost:3000/api/orders/search \
  -H "Content-Type: application/json" \
  -d '{
    "email": "cliente@email.com"
  }'
```

### Busca por Número + Email

```bash
curl -X POST http://localhost:3000/api/orders/search \
  -H "Content-Type: application/json" \
  -d '{
    "email": "cliente@email.com",
    "orderNumber": "#1001"
  }'
```

## 📱 Interface do Usuário

### Campos do Formulário

1. **Número de Pedido** - Campo obrigatório
   - Aceita com ou sem `#`
   - Exemplo: `1001` ou `#1001`

2. **Email** - Campo obrigatório
   - Validação básica de formato email
   - Deve corresponder ao email usado na compra

### Informações Exibidas

Quando encontrado, o sistema exibe:

- ✅ Status do pedido
- 📦 Número do pedido
- ⏱️ Estimativa de entrega
- 📍 Localização atual
- 🚚 Informações de rastreamento (se disponível)
- 📜 Histórico completo
- 🛍️ Itens do pedido
- 💰 Valor total

## 🔄 Fluxo de Dados

```
Cliente → Página de Rastreamento
    ↓
Formulário (email + número)
    ↓
POST /api/orders/search
    ↓
Detecta país (hostname)
    ↓
Busca credenciais Shopify
    ↓
Shopify Admin API
    ↓
Formata dados
    ↓
Retorna para cliente
    ↓
Exibe informações
```

## 🐛 Erros Comuns e Troubleshooting

### "Configuração do Shopify não encontrada"
**Causa:** Admin API Token não configurado

**Solução:**
1. Verifique se as variáveis estão no `.env.local`:
   ```env
   AR_SHOPIFY_ADMIN_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxx
   MX_SHOPIFY_ADMIN_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxx
   ```
2. Confirme que os nomes das variáveis estão corretos (AR_ ou MX_)
3. Gere um novo token seguindo: [SHOPIFY_ADMIN_TOKEN_SETUP.md](SHOPIFY_ADMIN_TOKEN_SETUP.md)
4. Reinicie o servidor Next.js após adicionar o token

### "Shopify API error: 401 Unauthorized"
**Causa:** Token de acesso inválido, expirado ou sem permissões

**Solução:**
1. Verifique se está usando o **Admin API Token** (não Storefront Token)
2. Confirme que o token tem as permissões necessárias:
   - ✅ `read_orders`
   - ✅ `read_all_orders`
3. Gere um novo token no Shopify Admin
4. O token deve começar com `shpat_`
5. Veja o console do servidor para mais detalhes do erro

### "Nenhum pedido encontrado" (mas o pedido existe)
**Causa:** Email ou número do pedido não correspondem

**Debugging:**
1. Verifique o console do servidor - você verá logs detalhados:
   ```
   📧 Strategy 1: Search by email first
   📦 Orders found by email: 5
   📋 Order names: #33511001, #33511002, #33511003
   🔍 Filtering by order number: 33511001
   🔎 Checking order: { name: '#33511001', order_number: 33511001 }
   ```

2. **Verifique o email:**
   - Deve ser exatamente o mesmo usado na compra
   - Case-insensitive (aceita maiúsculas/minúsculas)
   - Exemplo: `lautarolescanossj@gmail.com`

3. **Verifique o número do pedido:**
   - Pode incluir ou não o `#`
   - Exemplos aceitos: `#33511001` ou `33511001`
   - O sistema tenta múltiplos formatos automaticamente

4. **Formatos testados automaticamente:**
   - Por `name`: `#33511001`
   - Por `name` sem #: `33511001`
   - Por `order_number`: `33511001`
   - Por `id`: `5891234567890`

5. **Certifique-se de estar na loja correta:**
   - Argentina: `localhost:3000` ou `snkhouseargentina.com`
   - México: `localhost:3001` ou `snkhousemexico.com`

### "Shopify API error: 403 Forbidden"
**Causa:** Token não tem as permissões necessárias

**Solução:**
1. Acesse o app no Shopify Admin
2. Vá em Configuration → Admin API integration
3. Verifique se selecionou `read_orders` nos scopes
4. Reinstale o app
5. Gere um novo token

### "Shopify API error: 404"
**Causa:** Endpoint ou pedido não existe

**Solução:**
1. Verifique se o domínio do Shopify está correto no `.env.local`
2. Confirme que o pedido existe no Shopify Admin
3. Veja os logs do servidor para a URL exata sendo chamada

### Debug Avançado

Para ver todos os logs de debug:

1. Abra o terminal onde o Next.js está rodando
2. Faça uma busca de pedido
3. Você verá logs detalhados:

```bash
🔍 Searching order: {
  country: 'AR',
  domain: '9wurf1-73.myshopify.com',
  email: 'cliente@email.com',
  orderNumber: '#33511001'
}

📧 Strategy 1: Search by email first
📡 Searching by email: { email: 'cliente@email.com', domain: '9wurf1-73.myshopify.com' }
📦 Orders found by email: 3
📋 Order names: #33511001, #33510999, #33510888

🔍 Filtering by order number: 33511001
🔎 Checking order: {
  name: '#33511001',
  order_number: 33511001,
  id: 5891234567890,
  matchName: true,
  matchNumber: true,
  matchId: false
}
📦 Orders after filter: 1
✅ Order found: { orderNumber: '#33511001', status: 'in_transit' }
```

Se não aparecer nenhum log, o erro está acontecendo antes da busca (problema de autenticação).

## 🚀 Melhorias Futuras

- [ ] Cache de pedidos para melhor performance
- [ ] Busca apenas por email (listar todos os pedidos)
- [ ] Notificações push de mudanças de status
- [ ] Integração com APIs de rastreamento das transportadoras
- [ ] Suporte a múltiplos fulfillments por pedido
- [ ] Exportar histórico do pedido em PDF
- [ ] Estimativa de entrega mais precisa baseada em ML

## 📞 Suporte

Se tiver problemas com o rastreamento:
1. Verifique os logs do servidor (Console)
2. Confirme as credenciais do Shopify
3. Teste a API diretamente (curl/Postman)
4. Verifique se o pedido existe no Shopify Admin
