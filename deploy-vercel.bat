@echo off
REM SNKHOUSE Showroom - Deploy Rápido para Vercel (Windows)
REM Script para deploy em store.snkhouse.com

echo.
echo ========================================
echo   SNKHOUSE Showroom - Deploy Vercel
echo   Destino: store.snkhouse.com
echo ========================================
echo.

REM Verificar se Vercel CLI está instalado
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Vercel CLI nao encontrado
    echo [+] Instalando Vercel CLI...
    call npm install -g vercel
)

echo [OK] Vercel CLI instalado
echo.

REM Verificar autenticação
echo [~] Verificando autenticacao...
call vercel whoami >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [!] Faca login na Vercel:
    call vercel login
)

echo [OK] Autenticado
echo.

REM Verificar package.json
if not exist "package.json" (
    echo [X] Erro: package.json nao encontrado
    echo Execute este script na raiz do projeto
    pause
    exit /b 1
)

echo Informacoes do projeto:
echo   Nome: SNKHOUSE Showroom
echo   Subdominio: store.snkhouse.com
echo   Build: Next.js 14
echo.

REM Confirmação
set /p confirm="Deseja fazer deploy para PRODUCAO? (s/n): "
if /i not "%confirm%"=="s" (
    echo [X] Deploy cancelado
    pause
    exit /b 1
)

echo.
echo [~] Iniciando deploy...
echo.

REM Deploy para produção
call vercel --prod

echo.
echo [OK] Deploy concluido!
echo.
echo Proximos passos:
echo.
echo 1. Acesse Vercel Dashboard: https://vercel.com/dashboard
echo 2. Va em Settings -^> Domains
echo 3. Adicione o dominio: store.snkhouse.com
echo 4. Configure o DNS conforme instrucoes da Vercel
echo 5. Aguarde propagacao DNS (ate 48h)
echo.
echo URLs:
echo   Preview: Vercel fornecera URL temporaria
echo   Producao: https://store.snkhouse.com (apos DNS configurado)
echo.
echo Documentacao completa: SUBDOMAIN_DEPLOYMENT.md
echo.
echo Parabens! Site em producao!
echo.
pause
