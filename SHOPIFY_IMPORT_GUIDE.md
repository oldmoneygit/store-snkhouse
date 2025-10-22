# 📦 Guia Rápido: Importação de Produtos para Shopify

## ✅ Arquivo CSV Gerado!

**Arquivo:** `shopify-products-import.csv`
**Tamanho:** ~22.5 MB
**Produtos:** 653
**Linhas:** 90,761 (produtos + variantes + imagens)

---

## 🚀 Passo a Passo da Importação

### **Passo 1: Acessar Painel Shopify**

1. Acesse: https://admin.shopify.com/store/9wurf1-73
2. Faça login com suas credenciais

### **Passo 2: Ir para Importação de Produtos**

1. No menu lateral, clique em **Products**
2. Clique no botão **Import** (no canto superior direito)

### **Passo 3: Fazer Upload do CSV**

1. Clique em **Add file** ou **Choose file**
2. Selecione o arquivo: `shopify-products-import.csv`
3. **IMPORTANTE:** Marque a opção **"Overwrite any current products that have the same handle"**
   - Isso permite reimportar se houver erro
4. Clique em **Upload and continue**

### **Passo 4: Revisar Importação**

1. Shopify mostrará um preview dos produtos
2. Verifique se os dados estão corretos:
   - ✅ Nome do produto
   - ✅ Preços
   - ✅ Variantes (tamanhos)
   - ✅ Imagens
3. Clique em **Import products**

### **Passo 5: Aguardar Conclusão**

⏳ **Tempo estimado:** 10-30 minutos (depende dos 653 produtos)

Shopify enviará um email quando concluir:
- ✅ Se tudo deu certo: "Import completed successfully"
- ⚠️ Se houve erros: "Import completed with errors" (com detalhes)

---

## 📊 O que acontece durante a importação?

Shopify irá:
1. ✅ Criar 653 produtos
2. ✅ Gerar variantes para cada tamanho (35-45)
3. ✅ Fazer download das imagens (da galeria do produto)
4. ✅ Configurar preços e estoques
5. ✅ Gerar IDs únicos para cada variante

---

## ⚠️ Possíveis Erros e Soluções

### **Erro: "Some images failed to download"**

**Causa:** Algumas URLs de imagens estão inacessíveis ou quebradas

**Solução:**
- Shopify importará o produto mesmo assim
- Você pode adicionar imagens manualmente depois
- Ou reimportar com URLs corrigidas

### **Erro: "Product handle already exists"**

**Causa:** Produto já existe no Shopify

**Solução:**
- Marque "Overwrite products with same handle" na importação
- Ou delete os produtos existentes primeiro

### **Erro: "File too large"**

**Causa:** CSV > 15 MB (nosso tem 22.5 MB)

**Solução:**
- Shopify aceita até ~100 MB
- Se der erro, podemos dividir em múltiplos CSVs
- Ou importar via API (mais rápido)

### **Erro: "Invalid price format"**

**Causa:** Formato de preço incorreto

**Solução:**
- O script já formata corretamente (82713.38)
- Se houver erro, verifique se há produtos com preço 0 ou null

---

## 🔍 Como Verificar se Importou Corretamente

### **Durante a Importação:**

1. Vá em **Products** no painel Shopify
2. Você verá os produtos aparecendo gradualmente
3. Confira se as imagens estão carregando

### **Após a Importação:**

1. Verifique o total de produtos:
   - Deve mostrar **653 products**
2. Abra alguns produtos aleatoriamente
3. Verifique:
   - ✅ Nome correto
   - ✅ Preço correto
   - ✅ Variantes (tamanhos) criadas
   - ✅ Imagens aparecendo
   - ✅ Descrição

---

## 🎯 Próximos Passos (Após Importação Concluir)

### **Passo 1: Buscar Variant IDs**

Depois que a importação terminar, execute:

```bash
node scripts/fetch-shopify-variant-ids.js
```

Isso irá:
- Conectar na API do Shopify
- Buscar todos os produtos importados
- Pegar os IDs de cada variante (tamanho)
- Gerar arquivo: `shopify-variant-mapping.json`

### **Passo 2: Atualizar products.json**

Depois de ter o mapeamento, execute:

```bash
node scripts/update-products-with-variants.js
```

Isso irá:
- Ler o mapeamento gerado
- Atualizar `data/products.json`
- Adicionar `shopifyVariantId` em cada tamanho
- Criar backup automático

### **Passo 3: Testar Checkout**

```bash
npm run dev
```

1. Abra: http://localhost:3000
2. Adicione produto ao carrinho
3. Clique em "Finalizar Compra"
4. Você deve ser redirecionado para checkout.shopify.com ✅

---

## 📈 Estrutura do CSV

O CSV gerado segue o formato oficial do Shopify:

```csv
Handle,Title,Body (HTML),Vendor,Product Category,Type,Tags,Published,...
nike-air-jordan-1-travis-scott,Nike Air Jordan 1 Retro High x Travis Scott,"Descrição...",SNKHOUSE,travis-scott,Sneakers,"jordan-1, travis-scott",TRUE,...
```

### **Colunas Importantes:**

- **Handle:** Slug único do produto (ex: `nike-air-jordan-1-travis-scott`)
- **Title:** Nome do produto
- **Option1 Name/Value:** Tamanho (35, 36, 37...)
- **Variant SKU:** SKU único (ex: `nike-air-jordan-1-travis-scott-35`)
- **Variant Price:** Preço da variante
- **Image Src:** URL da imagem
- **Published:** TRUE (produto visível) ou FALSE (rascunho)

---

## 🔄 Se Precisar Reimportar

Se algo der errado ou você quiser refazer:

1. **Delete produtos existentes:**
   - Products → Selecione todos → More actions → Delete products

2. **Regere o CSV:**
   ```bash
   node scripts/export-to-shopify-csv.js
   ```

3. **Reimporte** seguindo os passos acima

---

## 📞 Suporte

Se encontrar problemas:

1. **Verificar logs de erro do Shopify:**
   - Shopify envia email com detalhes dos erros
   - Verifique o relatório de importação

2. **Verificar produtos importados:**
   - Products → Filtrar por "Created today"
   - Abrir alguns produtos para verificar

3. **Consultar documentação:**
   - [Shopify CSV Import Guide](https://help.shopify.com/en/manual/products/import-export/using-csv)

---

## ✅ Checklist de Importação

Antes de importar:
- [ ] CSV gerado (`shopify-products-import.csv`)
- [ ] Domínio Shopify configurado (`9wurf1-73.myshopify.com`)
- [ ] Access token configurado
- [ ] Painel Shopify acessível

Durante a importação:
- [ ] Upload do CSV feito
- [ ] Opção "Overwrite" marcada
- [ ] Importação iniciada

Após a importação:
- [ ] Email de confirmação recebido
- [ ] Produtos visíveis no painel
- [ ] Variantes criadas
- [ ] Imagens carregadas
- [ ] Execute `fetch-shopify-variant-ids.js`
- [ ] Execute `update-products-with-variants.js`
- [ ] Teste checkout localmente

---

## 🎉 Tudo Pronto!

**Arquivo CSV gerado e pronto para importação!**

**Próximo passo:**
1. Acesse https://admin.shopify.com/store/9wurf1-73
2. Products → Import
3. Faça upload do `shopify-products-import.csv`
4. Aguarde conclusão
5. Execute scripts de mapeamento

**Boa sorte! 🚀**
