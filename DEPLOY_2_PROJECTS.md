# 🚀 Deploy: Estratégia de 2 Projetos Vercel

## 📋 **Estratégia**

Este projeto usa **2 deploys separados no Vercel**, um para cada país:

- **🇦🇷 Projeto Argentina**: `snkhouse-argentina`
- **🇲🇽 Projeto México**: `snkhouse-mexico`

Cada projeto é **completamente isolado** com suas próprias:
- Variáveis de ambiente
- Domínios
- Meta Pixel IDs
- Shopify stores

---

## 🇦🇷 **Projeto 1: SNKHOUSE Argentina**

### **1. Criar Projeto no Vercel**

```bash
vercel --prod
```

**Configurações:**
- Project Name: `snkhouse-argentina`
- Framework: Next.js
- Root Directory: `./`

### **2. Configurar Variáveis de Ambiente**

No Dashboard Vercel → Settings → Environment Variables:

```bash
# País
NEXT_PUBLIC_COUNTRY=AR

# Shopify Argentina
NEXT_PUBLIC_SHOPIFY_DOMAIN=9wurf1-73.myshopify.com
NEXT_PUBLIC_SHOPIFY_TOKEN=7b53ccc78ba348565e335d6cb129f610

# Meta Pixel Argentina
NEXT_PUBLIC_META_PIXEL_ID=1503220410800125

# Global
NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-10
EXCHANGE_RATE_ARS_TO_MXN=0.012
```

### **3. Adicionar Domínios**

No Dashboard Vercel → Settings → Domains:

- `snkhouseargentina.com`
- `www.snkhouseargentina.com`

### **4. Configurar DNS**

No provedor de domínio (GoDaddy, Namecheap, etc):

```
Tipo: A
Nome: @
Valor: 76.76.21.21

Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

---

## 🇲🇽 **Projeto 2: SNKHOUSE México**

### **1. Criar Segundo Projeto no Vercel**

```bash
vercel --prod
```

**Configurações:**
- Project Name: `snkhouse-mexico`
- Framework: Next.js
- Root Directory: `./`

### **2. Configurar Variáveis de Ambiente**

No Dashboard Vercel → Settings → Environment Variables:

```bash
# País
NEXT_PUBLIC_COUNTRY=MX

# Shopify México
NEXT_PUBLIC_SHOPIFY_DOMAIN=pago-snkhouse-mexico.myshopify.com
NEXT_PUBLIC_SHOPIFY_TOKEN=820828ea60d749b4c1c341d989a92a98

# Meta Pixel México
NEXT_PUBLIC_META_PIXEL_ID=2012371212847052
META_CONVERSIONS_TOKEN=EAAROK9divmABPZCHW4XE2s42cprQotuhBMlOTrG6B1bzgzfMGswvKNvQT3f7c1oZANTzfVA5fyBiXOlKxnqpkmi5fIduVfIZA1OsBNETIwAIeosd8iTJglDFbUwEB0SJcAXP9PUxEvnWJwNxni3L7zJSD3ZAwriNJLzpupJoLbVbBCXip5ZCHowRX55jb8QZDZD

# Global
NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-10
EXCHANGE_RATE_ARS_TO_MXN=0.012
```

### **3. Adicionar Domínios**

No Dashboard Vercel → Settings → Domains:

- `snkhousemexico.com`
- `www.snkhousemexico.com`

### **4. Configurar DNS**

No provedor de domínio:

```
Tipo: A
Nome: @
Valor: 76.76.21.21

Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

---

## 🔧 **Testando Localmente**

### **Testar Argentina:**
```bash
NEXT_PUBLIC_COUNTRY=AR npm run dev
```

Ou use query parameter:
```
http://localhost:3000?country=AR
```

### **Testar México:**
```bash
NEXT_PUBLIC_COUNTRY=MX npm run dev
```

Ou use query parameter:
```
http://localhost:3000?country=MX
```

---

## 📊 **Verificação Pós-Deploy**

### **Argentina:**
1. Acesse `https://snkhouseargentina.com`
2. Verifique que preços estão em **ARS**
3. Teste adicionar produto ao carrinho
4. Verifique que checkout redireciona para `9wurf1-73.myshopify.com`
5. Verifique Meta Pixel: `1503220410800125`

### **México:**
1. Acesse `https://snkhousemexico.com`
2. Verifique que preços estão em **MXN**
3. Teste adicionar produto ao carrinho
4. Verifique que checkout redireciona para `pago-snkhouse-mexico.myshopify.com`
5. Verifique Meta Pixel: (seu ID do México)

---

## ⚙️ **Deploy Contínuo**

Cada push para a branch `main` fará deploy **automaticamente** em AMBOS os projetos Vercel.

Para fazer deploy manual:

```bash
# Deploy para ambos os projetos
vercel --prod
```

---

## 🎯 **Vantagens desta Abordagem**

✅ **Isolamento Total** - Cada país com suas próprias credenciais
✅ **Simplicidade** - Sem lógica complexa de detecção
✅ **Segurança** - Tokens não ficam misturados
✅ **Debug Fácil** - Logs separados por projeto
✅ **Meta Pixel Isolado** - Zero risco de cross-tracking
✅ **Performance** - Sem verificações de país em runtime

---

## ❓ **FAQ**

**P: Preciso fazer deploy 2 vezes?**
R: Não! O Vercel pode conectar ambos os projetos ao mesmo repositório GitHub. Cada push fará deploy em ambos automaticamente.

**P: E se eu quiser adicionar mais países?**
R: Crie um novo projeto Vercel para cada país, seguindo o mesmo padrão.

**P: Como faço para o Vercel saber qual env var usar?**
R: Configure as env vars diretamente no Dashboard de cada projeto Vercel. Elas são independentes.

---

## 📞 **Suporte**

Se tiver dúvidas:
1. Verifique os logs no Dashboard Vercel
2. Teste localmente com `NEXT_PUBLIC_COUNTRY=AR` ou `MX`
3. Revise a documentação da Vercel: https://vercel.com/docs

---

**Última atualização:** 2025-01-22
