# 📦 Guia de Upload - SNKHOUSE Showroom para WordPress

## ✅ Build Concluído com Sucesso!

**Pasta gerada:** `out/` (343 MB)
**URL final:** `https://snkhouse.com/showroom`

---

## 📋 Conteúdo da Pasta `/out`

```
out/
├── index.html          # Página showroom (raiz)
├── store.html          # Página loja
├── 404.html            # Página de erro
├── _next/              # Assets do Next.js (JS, CSS)
├── images/             # Imagens otimizadas
└── *.txt               # Arquivos auxiliares
```

---

## 🚀 Método 1: Upload via CloudPanel (RECOMENDADO)

### Passo 1: Acessar CloudPanel

1. Acesse o painel CloudPanel do seu servidor
2. Navegue até **File Manager** ou **FTP/SFTP**
3. Localize a pasta raiz do WordPress (geralmente `/htdocs` ou `/public_html`)

### Passo 2: Criar Estrutura de Diretórios

Crie a seguinte estrutura no WordPress:

```
/htdocs/                          (raiz do WordPress)
└── showroom/                     (nova pasta)
    ├── index.html
    ├── store.html
    ├── 404.html
    ├── _next/
    ├── images/
    └── *.txt
```

**Importante:** A pasta `showroom` deve estar NO MESMO NÍVEL que as pastas `wp-admin`, `wp-content`, `wp-includes`.

### Passo 3: Fazer Upload

**Opção A - Via CloudPanel File Manager:**
1. Entre na pasta `/htdocs/`
2. Crie nova pasta chamada `showroom`
3. Entre na pasta `showroom`
4. Faça upload de **TODOS** os arquivos e pastas de `/out`:
   - Selecione tudo dentro de `out/`
   - Arraste para o File Manager
   - Aguarde o upload completar (343 MB)

**Opção B - Via FTP (FileZilla, WinSCP):**
1. Conecte via FTP ao servidor
2. Navegue até `/htdocs/`
3. Crie pasta `showroom/`
4. Arraste todo o conteúdo de `out/` para dentro de `showroom/`

### Passo 4: Configurar Permissões

No CloudPanel ou via SSH:

```bash
cd /htdocs/showroom
chmod -R 755 .
```

### Passo 5: Configurar Redirecionamento (Opcional)

Se quiser que `snkhouse.com/showroom` seja a URL "oficial", crie um arquivo `.htaccess` na pasta `showroom/`:

```apache
# /htdocs/showroom/.htaccess

# Rewrite /showroom/index.html para /showroom
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /showroom/

# Remove .html das URLs
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^store$ store.html [L]
RewriteRule ^([^\.]+)$ $1.html [L]
</IfModule>
```

### Passo 6: Testar

Acesse no navegador:
- ✅ `https://snkhouse.com/showroom` → Showroom (index.html)
- ✅ `https://snkhouse.com/showroom/store` → Loja (store.html)

---

## 🔧 Método 2: Integração Profunda com WordPress (Avançado)

Se quiser integrar mais profundamente com o WordPress (mesma navegação, header, etc):

### Criar Template WordPress Customizado

1. Vá para `/htdocs/wp-content/themes/seu-tema/`
2. Crie arquivo `page-showroom.php`:

```php
<?php
/**
 * Template Name: SNKHOUSE Showroom
 */

// Desabilita header/footer do WordPress
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SNKHOUSE Showroom - Palermo, Buenos Aires</title>

    <!-- Incluir CSS do Next.js -->
    <?php
    $css_files = glob(get_template_directory() . '/showroom/_next/static/css/*.css');
    foreach ($css_files as $css_file) {
        $css_url = str_replace(
            get_template_directory(),
            get_template_directory_uri(),
            $css_file
        );
        echo '<link rel="stylesheet" href="' . $css_url . '">';
    }
    ?>
</head>
<body>
    <!-- Incluir conteúdo do index.html -->
    <?php
    $html_file = get_template_directory() . '/showroom/index.html';
    if (file_exists($html_file)) {
        // Extrair apenas o body content
        $content = file_get_contents($html_file);
        preg_match('/<body[^>]*>(.*?)<\/body>/si', $content, $matches);
        echo $matches[1];
    }
    ?>

    <!-- Incluir JS do Next.js -->
    <?php
    $js_files = glob(get_template_directory() . '/showroom/_next/static/chunks/*.js');
    foreach ($js_files as $js_file) {
        $js_url = str_replace(
            get_template_directory(),
            get_template_directory_uri(),
            $js_file
        );
        echo '<script src="' . $js_url . '"></script>';
    }
    ?>
</body>
</html>
```

3. No painel WordPress, crie uma nova página chamada "Showroom"
4. Selecione o template "SNKHOUSE Showroom"
5. Publique

---

## 🎨 Personalização Adicional

### Alterar a Barra "Volver a la Tienda"

Se quiser mudar o link ou texto da barra superior:

**Arquivo:** `out/index.html`
**Procure por:** `<a href="https://snkhouse.com"`
**Substitua:** URL ou texto conforme necessário

### Adicionar Google Analytics

Adicione antes do `</head>` em `index.html` e `store.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔍 Verificação Final

Após o upload, verifique:

1. ✅ **Imagens carregando?**
   - Abra DevTools (F12) → Network
   - Recarregue a página
   - Verifique se todas imagens retornam 200 (OK)

2. ✅ **Animações funcionando?**
   - Scroll na página deve ativar animações
   - Carrosels devem rodar automaticamente

3. ✅ **Links funcionando?**
   - Botão "Volver a la Tienda" → `https://snkhouse.com`
   - Links de produtos → URLs corretas
   - WhatsApp button → Abre conversa

4. ✅ **Responsivo?**
   - Teste em mobile (DevTools → Device Toggle)
   - Teste em tablet
   - Teste em desktop

---

## ⚠️ Problemas Comuns

### Problema 1: Imagens não carregam
**Causa:** Caminhos relativos incorretos
**Solução:** Verifique se a estrutura de pastas está correta (`showroom/images/...`)

### Problema 2: CSS/JS não funciona
**Causa:** Arquivos `_next` não foram enviados
**Solução:** Re-envie a pasta `_next` completa

### Problema 3: 404 ao acessar /showroom/store
**Causa:** Servidor não encontra `store.html`
**Solução:**
- Verifique se `store.html` existe em `/showroom/`
- Adicione `.htaccess` (veja Passo 5)

### Problema 4: Página em branco
**Causa:** JavaScript bloqueado ou erro de permissões
**Solução:**
- Verifique permissões: `chmod -R 755 /htdocs/showroom`
- Verifique console do navegador (F12) para erros

---

## 📊 Estrutura de Arquivos no Servidor

Após upload completo:

```
/htdocs/
├── wp-admin/              (WordPress core)
├── wp-content/            (WordPress content)
├── wp-includes/           (WordPress core)
├── showroom/              ✅ NOVA PASTA
│   ├── index.html         # Página showroom
│   ├── store.html         # Página loja
│   ├── 404.html           # Página erro
│   ├── _next/             # Assets Next.js
│   │   ├── static/
│   │   │   ├── chunks/    # JavaScript
│   │   │   └── css/       # Estilos
│   │   └── ...
│   └── images/            # Todas as imagens otimizadas
│       ├── banners/
│       ├── products/
│       ├── hero/
│       ├── gallery/
│       └── ...
└── index.php              (WordPress root)
```

---

## 🎯 Próximos Passos

1. ✅ Fazer backup do build (`out/` folder)
2. ✅ Upload para servidor via CloudPanel
3. ✅ Testar todas as páginas e funcionalidades
4. ✅ Configurar SSL (HTTPS) se ainda não estiver
5. ✅ Adicionar ao sitemap do WordPress
6. ✅ Compartilhar URL com a equipe!

---

## 📞 Suporte

Se tiver qualquer dúvida durante o upload:

1. Verifique os logs do CloudPanel
2. Verifique console do navegador (F12)
3. Teste em modo anônimo/privado
4. Limpe cache do navegador

---

## ✨ Resultado Final

✅ **Showroom:** `https://snkhouse.com/showroom`
✅ **Loja:** `https://snkhouse.com/showroom/store`
✅ **100% funcional** - Animações, carrosels, interatividade
✅ **Responsivo** - Mobile, tablet, desktop
✅ **Otimizado** - Imagens em múltiplos tamanhos

---

**Desenvolvido com Next.js + React + Framer Motion + Tailwind CSS**
**Exportado como HTML/CSS/JS estático para WordPress**

🎉 **Pronto para produção!**
