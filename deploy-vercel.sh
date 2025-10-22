#!/bin/bash

# SNKHOUSE Showroom - Deploy Rápido para Vercel
# Script para deploy em store.snkhouse.com

echo "🚀 SNKHOUSE Showroom - Deploy para store.snkhouse.com"
echo "=================================================="
echo ""

# Verificar se Vercel CLI está instalado
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI não encontrado"
    echo "📦 Instalando Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI instalado"
echo ""

# Verificar se está logado
echo "🔐 Verificando autenticação..."
if ! vercel whoami &> /dev/null
then
    echo "🔑 Faça login na Vercel:"
    vercel login
fi

echo "✅ Autenticado"
echo ""

# Verificar se package.json existe
if [ ! -f "package.json" ]; then
    echo "❌ Erro: package.json não encontrado"
    echo "Execute este script na raiz do projeto"
    exit 1
fi

echo "📋 Informações do projeto:"
echo "   Nome: SNKHOUSE Showroom"
echo "   Subdomínio: store.snkhouse.com"
echo "   Build: Next.js 14"
echo ""

# Perguntar confirmação
read -p "🤔 Deseja fazer deploy para PRODUÇÃO? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "❌ Deploy cancelado"
    exit 1
fi

echo ""
echo "🏗️  Iniciando deploy..."
echo ""

# Deploy para produção
vercel --prod

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "📝 Próximos passos:"
echo ""
echo "1. Acesse Vercel Dashboard: https://vercel.com/dashboard"
echo "2. Vá em Settings → Domains"
echo "3. Adicione o domínio: store.snkhouse.com"
echo "4. Configure o DNS conforme instruções da Vercel"
echo "5. Aguarde propagação DNS (até 48h)"
echo ""
echo "🔗 URLs:"
echo "   Preview: Vercel fornecerá URL temporária"
echo "   Produção: https://store.snkhouse.com (após DNS configurado)"
echo ""
echo "📚 Documentação completa: SUBDOMAIN_DEPLOYMENT.md"
echo ""
echo "🎉 Parabéns! Site em produção!"
