# ✅ Deployment Checklist - React FIRT

Use este checklist para validar que a aplicação está pronta para produção.

## 📋 Pré-Deploy (Local)

- [ ] `npm run tsc` passa sem erros TypeScript
- [ ] `npm run lint` passa sem erros ESLint
- [ ] `npm run build` executa com sucesso
- [ ] Build não tem warnings críticos
- [ ] `npm run preview` funciona (teste em http://localhost:4173)
- [ ] Todos os 3 estados funcionam no preview:
  - [ ] Loading state aparece ao iniciar
  - [ ] Dados carregam após ~2-3 segundos
  - [ ] Erro gracioso se desconectar (DevTools offline)
- [ ] Paginação funciona no preview (anterior/próxima/números)
- [ ] Links abrem em nova aba (Twitch, Chess.com, YouTube)
- [ ] Tema xadrez está visível (padrão quadriculado)
- [ ] Sem erros no console (F12)

## 🔧 Configuração GitHub Pages

- [ ] Repositório criado no GitHub
- [ ] `vite.config.ts` atualizado com `base` URL correta
  - Pessoal: `base: '/'`
  - Projeto: `base: '/react-firt/'`
- [ ] `.github/workflows/deploy.yml` existe
- [ ] GitHub Pages configurado em Settings:
  - [ ] Source: `GitHub Actions`
  - [ ] Verificar deploy URL em Settings > Pages

## 🚀 Primeiro Deploy

- [ ] Fazer push para `main` branch
- [ ] Acompanhar workflow em GitHub Actions
  - [ ] Workflow `Deploy to GitHub Pages` iniciou
  - [ ] Build completou ✅
  - [ ] Deploy completou ✅
- [ ] Esperar 1-2 minutos pela propagação do GitHub Pages

## ✔️ Testes em Produção (GitHub Pages)

### Acesso & Carregamento
- [ ] Acessar URL da aplicação em produção
- [ ] Página carrega sem erro 404
- [ ] DevTools Network: requisições de assets retornam 200
- [ ] Console não tem erros críticos
- [ ] Título "Chess Streamers" aparece

### Funcionalidade
- [ ] Estado de loading aparece ao abrir
- [ ] Cards de streamers carregam (~5-10 segundos)
- [ ] Primeira página exibe até 20 cards
- [ ] Avatar, username e links aparecem em cada card
- [ ] Links funcionam (clique abre em nova aba):
  - [ ] Links Twitch funcionam
  - [ ] Links Chess.com funcionam
  - [ ] Links YouTube funcionam (se houver)
- [ ] Badges 🔴 LIVE aparecem para streamers ao vivo
- [ ] Paginação funciona:
  - [ ] Clicar "Próxima" avança página
  - [ ] Clicar "Anterior" volta página
  - [ ] Clicar número de página vai direto
  - [ ] "Anterior" está desabilitado na página 1
  - [ ] "Próxima" está desabilitado na última página

### Estilos & Design
- [ ] Padrão quadriculado xadrez visível no background
- [ ] Cores tema xadrez aplicadas
- [ ] Texto legível (contraste WCAG AA)
- [ ] Layout responsivo (teste em mobile com DevTools)
  - [ ] Desktop (≥1200px): layout completo
  - [ ] Tablet (768-1199px): layout ajustado
  - [ ] Mobile (<768px): layout mobile-first
- [ ] Sem "Flash of Unstyled Content" (FOUC)
- [ ] Hover/active states funcionam em botões

### CORS & API
- [ ] DevTools Network mostra requisição para Chess.com API
- [ ] Requisição retorna 200 OK (ou erro controlado)
- [ ] Sem erro de CORS (red error no console)
- [ ] Se houver erro de CORS, considere:
  - [ ] Verificar se Chess.com CORS permite seu domínio
  - [ ] Usar proxy temporário se necessário
  - [ ] Documentar em issue/PR

### Performance
- [ ] Página carrega em < 3 segundos (networks rápidas)
- [ ] Sem travamentos ao renderizar 100+ cards
- [ ] Lighthouse score > 80 (abrir com Chrome Lighthouse)
  - [ ] Performance: >80
  - [ ] Accessibility: >80
  - [ ] Best Practices: >80
  - [ ] SEO: >80

## 🐛 Teste de Edge Cases em Produção

- [ ] **Offline:** Simule no DevTools (offline) → erro gracioso
- [ ] **Erro na API:** Simule bloqueando a requisição → mensagem de erro
- [ ] **Reload:** F5 → estado reseta, reload funciona
- [ ] **Hard refresh:** Ctrl+Shift+R → assets atualizados
- [ ] **Navegação rápida:** Clique próxima/anterior rápido → sem erro
- [ ] **Links quebrados:** Se algum link 404 → não quebra app

## 📊 Monitoramento Contínuo

Após deploy:

- [ ] Acompanhar GitHub Actions por 24h (novo push?)
- [ ] Testar em múltiplos navegadores:
  - [ ] Chrome (Windows)
  - [ ] Firefox (Windows)
  - [ ] Safari (se Mac disponível)
  - [ ] Edge (Windows)
- [ ] Testar em múltiplos dispositivos:
  - [ ] Desktop
  - [ ] Tablet (iPad/Android tablet)
  - [ ] Mobile (iPhone/Android phone)

## 📝 Documentação

- [ ] README.md atualizado com URL de produção
- [ ] GITHUB_PAGES_SETUP.md acessível
- [ ] Instruções de deploy no README
- [ ] Nenhum TODO/FIXME no código

## 🎉 Go-Live Checklist

- [ ] Tudo acima passou ✅
- [ ] Url de produção funciona end-to-end
- [ ] Performance aceitável (Lighthouse >80)
- [ ] CORS validado (sem erros)
- [ ] Aplicação pronta para uso público ✅

---

## 🆘 Se Algo Não Funcionar

1. **Verifique logs:**
   - GitHub Actions: vá para Actions tab
   - DevTools Console: F12 > Console
   - DevTools Network: F12 > Network

2. **Problemas comuns:**
   - Assets 404 → vite.config.ts `base` incorreta
   - CORS error → Chess.com bloqueando domínio
   - Styles não carregam → `base` URL errada em CSS imports

3. **Próximos passos:**
   - Arquivo issue no GitHub com logs
   - Rollback: reverter último commit
   - Hotfix: corrigir e fazer push novo

---

Sucesso no deploy! 🚀
