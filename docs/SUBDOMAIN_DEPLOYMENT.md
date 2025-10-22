# 🚀 Guia de Deploy - Subdomínio store.snkhouse.com

## 📋 Visão Geral

Este guia mostra como migrar o SNKHOUSE Showroom para o subdomínio **store.snkhouse.com** usando diferentes métodos de deploy.

---

## 🎯 Vantagens do Subdomínio vs Subpasta

### Subdomínio (store.snkhouse.com) ✅
- ✅ URLs limpas: `store.snkhouse.com/product/jordan-1`
- ✅ Independente do WordPress
- ✅ Pode usar Vercel, Netlify ou servidor próprio
- ✅ Melhor para SEO (domínio separado)
- ✅ Não precisa basePath no Next.js
- ✅ Cache independente
- ✅ Escalabilidade maior

### Subpasta (snkhouse.com/showroom) ❌
- ❌ URLs longas: `snkhouse.com/showroom/product/jordan-1`
- ❌ Precisa integrar com WordPress
- ❌ Mais complexo de configurar
- ❌ Dependente do servidor WordPress
- ❌ Precisa basePath no Next.js

**Decisão: Subdomínio é MUITO melhor!** ✨

---

## 🛠️ Opções de Deploy

### Opção 1: Vercel (Recomendado - Mais Fácil) ⭐

**Vantagens:**
- Deploy automático com Git
- SSL grátis
- CDN global
- Zero configuração
- Build automático
- Rollback fácil

**Passos:**

1. **Criar conta Vercel**
```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login
```

2. **Fazer deploy**
```bash
# No diretório do projeto
vercel

# Seguir o wizard:
# - Set up and deploy? Yes
# - Which scope? Sua conta
# - Link to existing project? No
# - Project name? snkhouse-showroom
# - Directory? ./
# - Override settings? No
```

3. **Configurar domínio customizado**
```
1. Acessar Vercel Dashboard
2. Ir em Settings → Domains
3. Adicionar: store.snkhouse.com
4. Copiar os registros DNS que aparecerem
```

4. **Configurar DNS**
```
No seu provedor de DNS (Cloudflare, GoDaddy, etc):

Tipo: CNAME
Nome: store
Valor: cname.vercel-dns.com
TTL: Automático

OU (se Vercel mostrar A records):

Tipo: A
Nome: store
Valor: 76.76.21.21 (exemplo - usar o que Vercel mostrar)
```

5. **Variáveis de ambiente na Vercel**
```
Settings → Environment Variables:

NEXT_PUBLIC_META_PIXEL_ID=1724528428093370
NODE_ENV=production
```

6. **Deploy automático**
```bash
# Push para Git e Vercel deploya automaticamente
git add .
git commit -m "Deploy to store.snkhouse.com"
git push
```

**URL final:** `https://store.snkhouse.com`

---

### Opção 2: Servidor Próprio com Node.js

**Vantagens:**
- Controle total
- Pode integrar com APIs próprias
- Sem custos de plataforma

**Requisitos:**
- Servidor VPS (Digital Ocean, AWS, etc)
- Node.js 18+ instalado
- PM2 para gerenciar processo
- Nginx como proxy reverso

**Passos:**

#### 1. Preparar Build de Produção

```bash
# No seu computador local
npm run build

# Isso cria a pasta .next com build otimizado
```

#### 2. Upload para Servidor

```bash
# Via SCP/SFTP, fazer upload de:
- package.json
- package-lock.json
- next.config.js
- .next/
- public/
- data/
- src/ (se necessário)

# OU via Git
git clone https://github.com/seu-repo/snkhouse-showroom.git
cd snkhouse-showroom
npm install
npm run build
```

#### 3. Instalar PM2 (Process Manager)

```bash
# No servidor
npm install -g pm2

# Criar arquivo ecosystem.config.js
```

**ecosystem.config.js:**
```javascript
module.exports = {
  apps: [{
    name: 'snkhouse-store',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/snkhouse-showroom',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NEXT_PUBLIC_META_PIXEL_ID: '1724528428093370'
    }
  }]
}
```

```bash
# Iniciar aplicação
pm2 start ecosystem.config.js

# Salvar para reiniciar automaticamente
pm2 save
pm2 startup

# Ver logs
pm2 logs snkhouse-store
```

#### 4. Configurar Nginx

**Criar arquivo:** `/etc/nginx/sites-available/store.snkhouse.com`

```nginx
# Redirecionar HTTP para HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name store.snkhouse.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name store.snkhouse.com;

    # SSL (configurar com Certbot depois)
    ssl_certificate /etc/letsencrypt/live/store.snkhouse.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/store.snkhouse.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Proxy para Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache para assets estáticos
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /images {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

**Ativar site:**
```bash
# Criar link simbólico
sudo ln -s /etc/nginx/sites-available/store.snkhouse.com /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

#### 5. Instalar SSL com Let's Encrypt

```bash
# Instalar Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d store.snkhouse.com

# Renovação automática (já configurada)
sudo certbot renew --dry-run
```

#### 6. Configurar DNS

```
No seu provedor DNS:

Tipo: A
Nome: store
Valor: [IP do seu servidor]
TTL: 3600

Exemplo:
store.snkhouse.com → 123.45.67.89
```

**Aguardar propagação DNS (pode levar 24-48h)**

---

### Opção 3: Export Estático + CDN (Cloudflare Pages, Netlify)

**Quando usar:**
- Se não precisa de SSR (Server-Side Rendering)
- Quer máxima velocidade
- Quer custo zero ou muito baixo

**Limitações:**
- Sem API routes
- Sem revalidation dinâmica
- Sem dynamic rendering

**Passos:**

1. **Build estático**
```bash
# Configurar para export
EXPORT_STATIC=true npm run build

# Isso cria pasta /out com HTML estático
```

2. **Deploy Cloudflare Pages**
```bash
# Instalar Wrangler
npm install -g wrangler

# Login
wrangler login

# Deploy
wrangler pages deploy out --project-name=snkhouse-store
```

3. **Configurar domínio**
```
Cloudflare Pages → Custom Domains → Add store.snkhouse.com
```

---

## 🔧 Configuração DNS (Resumo)

### Se usar Vercel:
```
Tipo: CNAME
Nome: store
Valor: cname.vercel-dns.com
```

### Se usar servidor próprio:
```
Tipo: A
Nome: store
Valor: [IP do servidor]
```

### Se usar Cloudflare:
```
Cloudflare cuida automaticamente
```

---

## 📊 Comparação de Opções

| Característica | Vercel | Servidor Próprio | Static Export |
|----------------|--------|------------------|---------------|
| **Facilidade** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| **Custo** | Grátis (hobby) | $5-20/mês | Grátis |
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Controle** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **SSL** | Automático | Manual | Automático |
| **CDN** | Global | Não | Global |
| **SSR** | ✅ Sim | ✅ Sim | ❌ Não |

**Recomendação:** Vercel para começar, depois migrar para servidor próprio se necessário.

---

## 🚀 Deploy Rápido (Vercel - 5 minutos)

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# 4. Adicionar domínio na dashboard
# 5. Configurar DNS
# 6. Pronto! 🎉
```

---

## ✅ Checklist Pós-Deploy

- [ ] Site acessível em store.snkhouse.com
- [ ] HTTPS funcionando (cadeado verde)
- [ ] Todas as páginas carregando
- [ ] Imagens aparecendo
- [ ] Navegação funcionando
- [ ] Carrinho funcionando
- [ ] Meta Pixel tracking
- [ ] Redirects para WooCommerce funcionando
- [ ] Performance boa (testar com Lighthouse)
- [ ] Mobile responsivo
- [ ] Google Analytics/Search Console configurado

---

## 🔄 Atualizar Site

### Vercel:
```bash
git push
# Deploy automático!
```

### Servidor Próprio:
```bash
git pull
npm install
npm run build
pm2 restart snkhouse-store
```

### Static Export:
```bash
EXPORT_STATIC=true npm run build
wrangler pages deploy out
```

---

## 🐛 Troubleshooting

### Site não carrega
```bash
# Verificar DNS
nslookup store.snkhouse.com

# Deve retornar o IP correto
```

### Erro 502 Bad Gateway (Nginx)
```bash
# Verificar se Next.js está rodando
pm2 status

# Reiniciar
pm2 restart snkhouse-store

# Ver logs
pm2 logs
```

### Imagens não aparecem
```bash
# Verificar permissões
chmod -R 755 public/images

# Verificar se pasta existe
ls -la public/images
```

### SSL não funciona
```bash
# Renovar certificado
sudo certbot renew --force-renewal

# Reiniciar Nginx
sudo systemctl restart nginx
```

---

## 📞 Próximos Passos

1. **Escolher método de deploy** (recomendo Vercel)
2. **Configurar DNS** para store.snkhouse.com
3. **Fazer deploy** seguindo os passos acima
4. **Testar tudo** (checklist)
5. **Configurar Analytics**
6. **Monitorar performance**

---

## 🎯 URLs Finais

```
Desenvolvimento:  http://localhost:3000
Produção:         https://store.snkhouse.com
WordPress:        https://snkhouse.com (mantém separado)
```

**Separação clara:**
- `store.snkhouse.com` = Showroom Next.js (catálogo/showcase)
- `snkhouse.com` = WordPress + WooCommerce (e-commerce/checkout)

---

<div align="center">

**🎉 PRONTO PARA DEPLOY EM SUBDOMÍNIO! 🎉**

Escolha Vercel para começar rápido!

</div>
