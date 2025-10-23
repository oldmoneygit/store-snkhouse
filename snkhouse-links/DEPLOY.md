# 🚀 Deploy SNKHOUSE Links - links.snkhouse.com

Guia completo para fazer deploy do projeto de links no Vercel.

## 📋 Pré-requisitos

- Conta no Vercel (https://vercel.com)
- Domínio snkhouse.com configurado
- Acesso ao GitHub (opcional, mas recomendado)

## 🎯 Método 1: Deploy via GitHub (Recomendado)

### 1. Criar repositório no GitHub

```bash
cd snkhouse-links
git init
git add .
git commit -m "Initial commit: SNKHOUSE Links project"
git branch -M main
git remote add origin https://github.com/seu-usuario/snkhouse-links.git
git push -u origin main
```

### 2. Conectar no Vercel

1. Acesse: https://vercel.com/new
2. Clique em **"Import Git Repository"**
3. Selecione o repositório **snkhouse-links**
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (padrão)
   - **Output Directory**: `.next` (padrão)

### 3. Deploy

1. Clique em **"Deploy"**
2. Aguarde o build (2-3 minutos)
3. Anote a URL gerada (ex: `snkhouse-links.vercel.app`)

## 🌐 Método 2: Deploy via CLI

### 1. Instalar Vercel CLI

```bash
npm i -g vercel
```

### 2. Login

```bash
vercel login
```

### 3. Deploy

```bash
cd snkhouse-links
vercel
```

Siga as instruções:
- **Set up and deploy**: Yes
- **Which scope**: Sua conta
- **Link to existing project**: No
- **Project name**: snkhouse-links
- **Directory**: `./`
- **Override settings**: No

### 4. Deploy para produção

```bash
vercel --prod
```

## 🔗 Configurar Domínio Customizado

### 1. Adicionar domínio no Vercel

1. Acesse seu projeto no Vercel: https://vercel.com/dashboard
2. Vá em **Settings** → **Domains**
3. Clique em **"Add"**
4. Digite: `links.snkhouse.com`
5. Clique em **"Add"**

### 2. Configurar DNS

O Vercel vai mostrar os registros DNS necessários. Configure no seu provedor de DNS:

**Opção A - CNAME (Recomendado):**
```
Type: CNAME
Name: links
Value: cname.vercel-dns.com
```

**Opção B - A Record:**
```
Type: A
Name: links
Value: 76.76.21.21
```

### 3. Aguardar propagação

- Tempo: 5 minutos a 48 horas (geralmente < 1 hora)
- Verificar: https://dnschecker.org

## 📊 UTM Tracking - Como Funciona

O projeto já está configurado com UTM parameters automáticos:

### Parâmetros UTM adicionados:

**Links das Lojas:**
```
Argentina: ?utm_source=linktree&utm_medium=social&utm_campaign=links_page&utm_content=argentina_store
México: ?utm_source=linktree&utm_medium=social&utm_campaign=links_page&utm_content=mexico_store
```

**Links Sociais:**
```
Instagram: ?utm_source=linktree&utm_medium=social&utm_campaign=links_page&utm_content=instagram
```

**WhatsApp:**
```
Mensagem pré-preenchida: "Hola! Vengo desde links.snkhouse.com"
```

### Como monitorar no Google Analytics:

1. Acesse: https://analytics.google.com
2. Vá em **Aquisição** → **Tráfego** → **Origem/Mídia**
3. Filtre por:
   - **Origem**: linktree
   - **Mídia**: social
   - **Campanha**: links_page

Você verá quantas pessoas:
- Vieram do links.snkhouse.com
- Clicaram em cada loja (Argentina vs México)
- Foram para Instagram
- Clicaram no WhatsApp

## 🔄 Atualizações Futuras

### Via GitHub (Automático):

1. Faça as mudanças localmente
2. Commit e push:
```bash
git add .
git commit -m "Update: descrição da mudança"
git push
```
3. Vercel faz deploy automático! ✅

### Via CLI:

```bash
cd snkhouse-links
vercel --prod
```

## ✅ Checklist Final

- [ ] Projeto deployado no Vercel
- [ ] Domínio `links.snkhouse.com` configurado
- [ ] DNS propagado (testar: https://links.snkhouse.com)
- [ ] Links funcionando
- [ ] UTM tracking ativo no Google Analytics
- [ ] Logo SNKHOUSE aparecendo
- [ ] Bandeiras Argentina e México renderizando
- [ ] WhatsApp abrindo com mensagem pré-preenchida

## 🆘 Troubleshooting

### Problema: "404 - This page could not be found"
**Solução**: Limpar cache do build
```bash
vercel --prod --force
```

### Problema: Imagens não aparecem
**Solução**: Verificar se `public/images/logo-snkhouse-white.png` existe no repo

### Problema: DNS não propaga
**Solução**:
1. Verificar configuração do DNS no provedor
2. Aguardar até 48h
3. Usar `dig links.snkhouse.com` para debug

### Problema: UTM não aparece no Analytics
**Solução**:
1. Verificar se Google Analytics está instalado nas lojas
2. Aguardar 24-48h para dados aparecerem
3. Usar "Tempo Real" no GA para testar imediatamente

## 📞 Suporte

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Vercel Support: https://vercel.com/support

---

🤖 Gerado por Claude Code
