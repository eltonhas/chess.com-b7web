# 🚀 GitHub Pages Deployment Guide

Este guia explica como fazer deploy da aplicação React FIRT para GitHub Pages.

## Pré-requisitos

- Repositório no GitHub
- Acesso de push ao repositório
- Workflow `deploy.yml` já configurado (`.github/workflows/deploy.yml`)

## Passo 1: Atualizar vite.config.ts

Se o repositório NÃO for de usuário (ex: `username.github.io`), você precisa atualizar a base URL:

```typescript
// vite.config.ts
export default defineConfig({
  base: '/react-firt/', // Substitua 'react-firt' pelo nome do seu repositório
  plugins: [react()],
})
```

**Exemplos:**
- Repo pessoal (`username.github.io`) → `base: '/'`
- Repo de projeto (`username/react-firt`) → `base: '/react-firt/'`

## Passo 2: Configurar GitHub Pages no Repositório

1. Acesse **Settings** do seu repositório
2. Na sidebar, clique em **Pages** (em "Code and automation")
3. Em "Build and deployment":
   - **Source:** Selecione `GitHub Actions`
   - A seção "Branch" desaparecerá automaticamente
4. Salve as configurações

## Passo 3: Fazer Push das Mudanças

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

## Passo 4: Acompanhar o Deploy

1. No repositório, acesse a aba **Actions**
2. Você verá o workflow `Deploy to GitHub Pages` rodando
3. Aguarde até que fique ✅ (verde)

## Passo 5: Acessar a Aplicação

A URL será:
- **Repo pessoal:** `https://username.github.io`
- **Repo de projeto:** `https://username.github.io/react-firt`

Você pode encontrar a URL exata em:
- **Settings > Pages** (seção "Your site is live at")
- **Deployments** no repositório

## Solução de Problemas

### ❌ Build falha no GitHub Actions

**Verifique:**
1. ESLint: `npm run lint` localmente
2. TypeScript: `npm run tsc` localmente
3. Build: `npm run build` localmente

Se passou localmente, faça push novamente — às vezes é cache.

### ❌ App carrega mas links/CSS não funcionam

**Causa:** Mismatch entre `vite.config.ts` base e nome do repo.

**Solução:**
1. Abra DevTools (F12) → Console
2. Procure por 404 errors em assets
3. Verifique a URL real (ex: `/react-firt/assets/...`)
4. Atualize `vite.config.ts` para corresponder

### ❌ "Failed to fetch" ao carregar dados

**Causa:** CORS da API Chess.com pode estar bloqueando.

**Solução:**
- Verifique em DevTools > Network se a requisição foi feita
- A Chess.com API deve permitir requests do seu domínio GitHub Pages
- Se não funcionar, considere usar um proxy CORS (não recomendado)

### ❌ Aplicação não atualiza após novo push

**Solução:**
1. Hard refresh no navegador: `Ctrl+Shift+R` (Windows) ou `Cmd+Shift+R` (Mac)
2. Limpe cache do navegador
3. Aguarde alguns minutos (cache do GitHub Pages)

## Script de Deploy Local (Alternativa)

Se preferir usar `gh-pages` package para deploy manual:

```bash
# Instalar
npm install --save-dev gh-pages

# Adicionar a package.json:
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}

# Deploy
npm run deploy
```

Depois configure em **Settings > Pages > Source** para `gh-pages` branch.

## Dicas de Performance

Para otimizar Lighthouse score (meta >80):

1. **Lazy load de imagens:** Adicione `loading="lazy"` aos avatares
2. **Minify CSS:** Vite já faz isso automaticamente
3. **Compress assets:** Vite usa gzip automaticamente
4. **Cache strategy:** O GitHub Pages configura headers de cache

## Monitoramento

Depois de fazer deploy, teste:

```bash
# Substituir com sua URL real
SITE_URL="https://username.github.io/react-firt"

# Teste básico
curl -I "$SITE_URL"

# Verifique Lighthouse
# No Chrome: Ctrl+Shift+I → Lighthouse tab
```

## CI/CD Pipeline

O workflow atual faz:

1. ✅ Checkout do código
2. ✅ Setup Node.js 18
3. ✅ Install dependencies
4. ✅ Type check (`tsc`)
5. ✅ Lint (`eslint`)
6. ✅ Build (`vite build`)
7. ✅ Upload artifact
8. ✅ Deploy para GitHub Pages

Nenhum passo é pulado — qualidade é garantida.

## Próximos Passos

- [ ] Atualizar `vite.config.ts` com URL correta
- [ ] Configurar GitHub Pages em Settings
- [ ] Fazer push das mudanças
- [ ] Acompanhar Actions até deploy completo
- [ ] Testar aplicação em produção
- [ ] Validar CORS com Chess.com API
- [ ] Medir Lighthouse score

---

Dúvidas? Verifique o log do GitHub Actions para erros específicos.
