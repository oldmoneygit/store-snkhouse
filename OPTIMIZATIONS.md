# Otimizações de Performance e Mobile - SNKHOUSE

## Resumo das Otimizações Implementadas

### 1. **Detecção de Conexões Lentas e Reduced Motion**
- **Arquivo**: `src/hooks/useReducedMotion.js`
- **Funcionalidade**:
  - Detecta preferência de `prefers-reduced-motion` do usuário
  - Detecta conexões lentas (2G, 3G, saveData)
  - Retorna flag para desabilitar/simplificar animações

### 2. **Otimizações do Hero Section**
- **Arquivo**: `src/components/store/StoreHero.jsx`
- **Mudanças**:
  - ❌ Antes: `h-screen` (100vh) em todos dispositivos
  - ✅ Agora: `h-[70vh] md:h-[85vh] lg:h-screen`
  - Reduzido padding mobile: `pb-12 md:pb-20`
  - Reduzido tamanhos de texto: `text-xs md:text-sm`
  - Reduzido tamanhos de botão: `px-6 py-3 md:px-8 md:py-4`
  - Animações desabilitadas em conexões lentas
  - Scroll indicator oculto em mobile e conexões lentas

### 3. **Otimizações do HowItWorks Section**
- **Arquivo**: `src/components/store/HowItWorks.jsx`
- **Mudanças**:
  - Reduzido padding: `py-12 md:py-20` (antes: `py-20`)
  - Reduzido spacing: `mb-10 md:mb-16` (antes: `mb-16`)
  - Títulos otimizados: `text-2xl md:text-4xl lg:text-6xl` (antes: `text-4xl md:text-6xl`)
  - Textos menores: `text-sm md:text-lg lg:text-xl` (antes: `text-lg md:text-xl`)
  - Cards mais compactos: `p-6 md:p-8` (antes: `p-8`)
  - Ícones reduzidos: `w-12 h-12 md:w-16 md:h-16` (antes: `w-16 h-16`)
  - Gap reduzido: `gap-4 md:gap-6` (antes: `gap-6`)
  - Animações condicionais baseadas em conexão

### 4. **Otimizações do SectionTitle Component**
- **Arquivo**: `src/components/store/SectionTitle.jsx`
- **Mudanças**:
  - Títulos reduzidos: `text-2xl md:text-3xl lg:text-5xl` (antes: `text-3xl md:text-5xl`)
  - Subtítulos reduzidos: `text-sm md:text-base` (antes: `text-base`)
  - Margem otimizada: `mb-8 md:mb-12` (antes: `mb-12`)
  - Padding horizontal adicionado: `px-4`
  - Suporte a reduced motion

## Benefícios para o Usuário

### 📱 **Mobile (Smartphones)**
- **Textos mais legíveis**: Não ocupam toda a tela
- **Melhor hierarquia visual**: Proporções adequadas
- **Menos scroll**: Conteúdo mais compacto
- **Melhor performance**: Menos animações pesadas
- **Botões mais acessíveis**: Tamanhos touch-friendly

### 🐌 **Conexões Lentas (2G/3G)**
- **Carregamento mais rápido**: Animações desabilitadas
- **Menos CPU**: Sem animações complexas do Framer Motion
- **Melhor UX**: Conteúdo aparece instantaneamente
- **Menos frustração**: Site responde imediatamente

### ♿ **Acessibilidade**
- **prefers-reduced-motion**: Respeitado automaticamente
- **Melhor contraste**: Textos mais legíveis
- **Hierarquia clara**: Tamanhos progressivos

## Comparação Antes/Depois

### Hero Section
| Elemento | Antes | Depois (Mobile) | Depois (Desktop) |
|----------|-------|-----------------|------------------|
| Altura | 100vh | 70vh | 100vh |
| Padding Bottom | 80px | 48px | 80px |
| Tag Text | 14px | 12px | 14px |
| Button Text | 14px | 12px | 14px |
| Button Padding | 32px/16px | 24px/12px | 32px/16px |

### HowItWorks
| Elemento | Antes | Depois (Mobile) | Depois (Desktop) |
|----------|-------|-----------------|------------------|
| Section Padding | 80px | 48px | 80px |
| Title Size | 36px | 24px | 60px |
| Subtitle Size | 18px | 14px | 20px |
| Card Padding | 32px | 24px | 32px |
| Icon Size | 64px | 48px | 64px |

### SectionTitle
| Elemento | Antes | Depois (Mobile) | Depois (Desktop) |
|----------|-------|-----------------|------------------|
| Title Size | 30px | 24px | 48px |
| Subtitle Size | 16px | 14px | 16px |
| Bottom Margin | 48px | 32px | 48px |

## Performance Metrics Esperados

### Conexão 3G Lenta
- **LCP (Largest Contentful Paint)**: Melhoria de ~30%
- **FCP (First Contentful Paint)**: Melhoria de ~25%
- **TBT (Total Blocking Time)**: Melhoria de ~40%

### Mobile (Lighthouse)
- **Performance Score**: +10-15 pontos
- **Accessibility**: Mantido/Melhorado
- **Best Practices**: Mantido

## Próximas Otimizações Recomendadas

### 1. **Lazy Loading Avançado**
```javascript
// Carregar componentes pesados apenas quando visíveis
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
})
```

### 2. **Image Optimization**
- Usar `webp` para todas as imagens
- Implementar `blur placeholder` nos produtos
- Reduzir quality para 70-75 em mobile

### 3. **Code Splitting**
- Separar vendor bundles
- Split por rota
- Lazy load de bibliotecas pesadas

### 4. **Caching**
- Service Worker para cache agressivo
- Cache de API responses
- Prefetch de páginas críticas

## Como Testar

### 1. **Simular Conexão Lenta**
```bash
# Chrome DevTools
1. F12 -> Network Tab
2. Throttling: "Slow 3G"
3. Reload e observe animações desabilitadas
```

### 2. **Testar em Mobile Real**
```bash
# Usar ngrok ou similar
npx ngrok http 3000
# Acessar URL no smartphone
```

### 3. **Lighthouse Audit**
```bash
# Chrome DevTools
1. F12 -> Lighthouse Tab
2. Selecionar "Mobile"
3. Run audit
```

### 4. **Verificar Reduced Motion**
```bash
# macOS
System Preferences > Accessibility > Display > Reduce Motion

# Windows
Settings > Ease of Access > Display > Show animations

# Chrome DevTools
Command Menu (Cmd+Shift+P) > "Emulate CSS prefers-reduced-motion"
```

## Manutenção

### Ao Adicionar Novos Componentes
- ✅ Sempre usar `useReducedMotion` hook
- ✅ Seguir padrão de tamanhos responsivos
- ✅ Testar em mobile primeiro
- ✅ Verificar em conexão 3G

### Checklist de PR
- [ ] Componente testado em mobile?
- [ ] Animações condicionais implementadas?
- [ ] Tamanhos de texto progressivos?
- [ ] Espaçamentos responsivos?
- [ ] Imagens otimizadas?

## Contato
Para dúvidas sobre otimizações: [contacto@snkhouse.com](mailto:contacto@snkhouse.com)
