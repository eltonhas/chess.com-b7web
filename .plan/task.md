# Plano de Tarefas — App de Streamers de Xadrez (V1)

## 1. Fases de Desenvolvimento

### Fase 1: Setup & Configuração Inicial
Preparar o ambiente de desenvolvimento e estrutura do projeto.

### Fase 2: Integração com API
Implementar a busca e consumo de dados da API do Chess.com.

### Fase 3: Componentes Core
Criar os componentes principais: `StreamerList`, `StreamerCard` e `Pagination`.

### Fase 4: Tratamento de Estados
Implementar gerenciamento de estados (loading, error, success).

### Fase 5: Identidade Visual
Aplicar estilização CSS com tema xadrez (paleta, padrão quadriculado).

### Fase 6: Testes & QA
Validar todos os critérios de aceitação e fluxos de erro.

### Fase 7: Deploy & Documentação
Build final, testes em produção e documentação.

---

## 2. Tarefas por Fase

---

## Fase 1: Setup & Configuração Inicial

### T1.1: Estrutura de pastas e tipos TypeScript

**Responsável:** Frontend Developer  
**Estimativa:** 0.5h  
**Prioridade:** P0

**Descrição:**
- Criar estrutura de pastas: `src/components/`, `src/types/`
- Definir arquivo `src/types/index.ts` com type `Streamer` (username, avatar, twitch_url, url)
- Atualizar `src/App.tsx` com estrutura inicial (useState para streamers, loading, error, currentPage)

**Requisitos de Aprovação:**
- [x] Pasta `src/components/` criada
- [x] Arquivo `src/types/index.ts` contém type `Streamer` com todos os campos
- [x] `App.tsx` possui hooks de estado inicializados corretamente
- [x] Nenhum erro de TypeScript (tsc sem warnings)
- [x] ESLint e Biome passam sem erros

---

## Fase 2: Integração com API

### T2.1: Implementar fetch para API Chess.com

**Responsável:** Frontend Developer  
**Estimativa:** 1h  
**Prioridade:** P0

**Descrição:**
- Implementar `useEffect` em `App.tsx` para buscar dados
- Fazer requisição GET para `https://api.chess.com/pub/streamers`
- Gerenciar ciclo: `loading = true` → request → `loading = false`
- Tratar erros (rede, HTTP, JSON inválido) com mensagem amigável

**Requisitos de Aprovação:**
- [x] Requisição para `https://api.chess.com/pub/streamers` funciona e retorna dados
- [x] Estado `loading` é `true` durante requisição, `false` ao terminar
- [x] Array `streamers` é populado com dados da API após sucesso
- [x] Mensagem de erro amigável é exibida em caso de falha
- [x] Nenhuma requisição múltipla por carregamento de página (verificar DevTools Network)
- [x] ESLint e Biome passam

---

### T2.2: Validação e tratamento de dados malformados

**Responsável:** Frontend Developer  
**Estimativa:** 0.5h  
**Prioridade:** P0

**Descrição:**
- Validar se resposta contém campo `streamers` (array)
- Validar se cada objeto tem os campos obrigatórios (username, avatar, twitch_url, url)
- Tratar caso de lista vazia: exibir mensagem "Nenhum streamer disponível"
- Sanitizar URLs para evitar XSS

**Requisitos de Aprovação:**
- [x] Resposta sem campo `streamers` dispara erro tratado
- [x] Resposta com `streamers: []` exibe mensagem apropriada (não lista vazia)
- [x] Campos obrigatórios são validados antes de renderizar
- [x] URLs são tratadas com segurança (evitar injeção de script)
- [x] Nenhum `console.error` não tratado chega ao usuário final

---

## Fase 3: Componentes Core

### T3.1: Criar componente StreamerCard

**Responsável:** Frontend Developer  
**Estimativa:** 0.75h  
**Prioridade:** P0

**Descrição:**
- Componente funcional `StreamerCard.tsx` que recebe props `streamer: Streamer`
- Renderizar: avatar (`<img>`), username, botão/link para Twitch, botão/link para Chess.com
- Links devem abrir em nova aba (`target="_blank"`, `rel="noopener noreferrer"`)
- Adicionar fallback para avatar quebrado (onError ou placeholder)
- Criar arquivo `StreamerCard.css` com estilos iniciais (sem tema ainda)

**Requisitos de Aprovação:**
- [x] Componente renderiza sem erros
- [x] Avatar, username e dois links são exibidos
- [x] Links abrem em nova aba (verificar manualmente no navegador)
- [x] Avatar quebrado mostra fallback/placeholder
- [x] Props tipadas corretamente (TypeScript)
- [x] ESLint e Biome passam

---

### T3.2: Criar componente StreamerList

**Responsável:** Frontend Developer  
**Estimativa:** 0.5h  
**Prioridade:** P0

**Descrição:**
- Componente funcional `StreamerList.tsx` que recebe props: `streamers: Streamer[]`, `currentPage: number`
- Calcular slice: `streamers.slice((currentPage - 1) * 20, currentPage * 20)`
- Renderizar lista de `StreamerCard` para cada streamer no slice
- Exibir estado de carregamento (ex: "Carregando...") enquanto `loading = true`
- Exibir mensagem de erro se `error` estiver preenchido

**Requisitos de Aprovação:**
- [x] Componente renderiza a página correta de 20 streamers
- [x] Mensagem "Carregando..." aparece enquanto `loading = true`
- [x] Mensagem de erro aparece se erro ocorre
- [x] Slice de 20 itens está correto (página 1 = 0-19, página 2 = 20-39, etc.)
- [x] ESLint e Biome passam

---

### T3.3: Criar componente Pagination

**Responsável:** Frontend Developer  
**Estimativa:** 0.75h  
**Prioridade:** P0

**Descrição:**
- Componente funcional `Pagination.tsx` que recebe props: `totalItems: number`, `currentPage: number`, `onPageChange: (page: number) => void`
- Calcular total de páginas: `Math.ceil(totalItems / 20)`
- Renderizar botões "Anterior" e "Próxima"
- Desabilitar "Anterior" na página 1, "Próxima" na última página
- Renderizar números de página clicáveis (ex: 1, 2, 3, ...)
- Opcionalmente: indicador da página atual (ex: "Página 1 de 5")
- Criar arquivo `Pagination.css` com estilos iniciais

**Requisitos de Aprovação:**
- [x] Total de páginas calculado corretamente
- [x] Botões "Anterior"/"Próxima" funcionam e disparam callback
- [x] "Anterior" desabilitado na página 1
- [x] "Próxima" desabilitado na última página
- [x] Números de página renderizam corretamente
- [x] Clicar em número de página atualiza `currentPage`
- [x] ESLint e Biome passam

---

## Fase 4: Tratamento de Estados

### T4.1: Integrar StreamerList e Pagination em App

**Responsável:** Frontend Developer  
**Estimativa:** 0.75h  
**Prioridade:** P0

**Descrição:**
- Em `App.tsx`, renderizar:
  - `StreamerList` passando `streamers`, `loading`, `error`, `currentPage`
  - `Pagination` passando `totalItems: streamers.length`, `currentPage`, `onPageChange` callback
- Implementar callback `onPageChange` que atualiza `currentPage`
- Garantir que estado é renderizado corretamente em cada fluxo

**Requisitos de Aprovação:**
- [x] Ambos componentes renderizam juntos em `App.tsx`
- [x] Trocar de página atualiza `currentPage` e renderiza slice correto
- [x] Estados (loading, error, success) refletem corretamente na UI
- [x] Ao carregar página, busca é disparada automaticamente
- [x] ESLint e Biome passam
- [x] Não há memory leaks (useEffect cleanup se necessário)

---

### T4.2: Tratamento de edge cases de estado

**Responsável:** Frontend Developer  
**Estimativa:** 0.5h  
**Prioridade:** P1

**Descrição:**
- Garantir que lista vazia dispara mensagem apropriada (não paginação vazia)
- Garantir que durante loading não há renderização de paginação
- Garantir que durante erro não há renderização de lista/paginação
- Testar cenários: lista vazia, erro de rede, JSON inválido, API fora

**Requisitos de Aprovação:**
- [x] Lista vazia mostra mensagem (não lista/paginação vazia)
- [x] Durante loading: não renderiza paginação/cards
- [x] Durante erro: não renderiza paginação/cards, apenas mensagem
- [x] Estados são mutuamente exclusivos (não há UI conflitante)
- [x] Testar em DevTools com Network throttling/offline

---

## Fase 5: Identidade Visual

### T5.1: Estilização base com tema xadrez

**Responsável:** Frontend Developer / UI Designer  
**Estimativa:** 1.5h  
**Prioridade:** P0

**Descrição:**
- Definir paleta de cores baseada em tabuleiro de xadrez (ex: preto/branco/marrom ou preto/branco/verde)
- Criar estilos globais em `src/App.css`:
  - Background com padrão quadriculado (via CSS grid ou repeating-linear-gradient)
  - Tipografia base, espaçamento
  - Contraste adequado para legibilidade
- Atualizar `StreamerCard.css`:
  - Card com espaçamento interno
  - Avatar em proporção quadrada (circle ou square)
  - Username em destaque (font-weight, tamanho)
  - Links visualmente distinguíveis como botões

**Requisitos de Aprovação:**
- [x] Paleta de cores definida e aplicada
- [x] Fundo com padrão quadriculado (CSS puro)
- [x] Contraste texto/fundo ≥ 4.5:1 (WCAG AA)
- [x] Cards escaneáveis: avatar, username, links visíveis
- [x] Nenhuma biblioteca de UI importada (Tailwind, Bootstrap, etc.)
- [x] CSS puro em arquivos `.css` por componente

---

### T5.2: Estilização de Pagination

**Responsável:** Frontend Developer / UI Designer  
**Estimativa:** 0.75h  
**Prioridade:** P0

**Descrição:**
- Estilizar botões "Anterior"/"Próxima" e números de página em `Pagination.css`
- Indicador visual da página ativa (ex: fundo destacado, borda)
- Botões desabilitados com opacidade/cor reduzida
- Responsividade: adaptar para mobile se necessário
- Manter coerência visual com tema xadrez

**Requisitos de Aprovação:**
- [x] Botões "Anterior"/"Próxima" estilizados
- [x] Página ativa é visualmente clara
- [x] Botões desabilitados parecem inativos (opacidade, cor)
- [x] Hover/focus states aplicados (acessibilidade)
- [x] Paleta coerente com tema xadrez
- [x] Responsivo em telas pequenas (mobile)

---

### T5.3: Polimento visual final

**Responsável:** Frontend Developer / UI Designer  
**Estimativa:** 0.5h  
**Prioridade:** P2

**Descrição:**
- Review de cada componente no navegador
- Ajustes finos de espaçamento, tipografia, cores
- Testes de contraste com ferramentas acessibilidade
- Verificar alinhamento, consistência visual
- Garantir que padrão quadriculado não prejudica legibilidade

**Requisitos de Aprovação:**
- [x] Layout não tem inconsistências visuais
- [x] Padrão quadriculado não reduz legibilidade
- [x] Acessibilidade validada (contraste, tamanho de fonte)
- [x] Todos os states visuais (hover, active, disabled) funcionam
- [x] Screenshots de múltiplas resoluções sem problemas

---

## Fase 6: Testes & QA

### T6.1: Teste de carregamento e busca de API

**Responsável:** QA / Frontend Developer  
**Estimativa:** 0.5h  
**Prioridade:** P0

**Descrição:**
- Testar: ao abrir a app, estado de carregamento aparece
- Testar: após resposta, primeira página exibe até 20 cards
- Testar: cada card exibe avatar, username, Twitch e Chess.com links
- Testar: links abrem em nova aba
- Validar no DevTools Network que apenas 1 requisição é feita

**Requisitos de Aprovação:**
- [x] Loading state aparece ao carregar
- [x] 20 cards exibidos após sucesso
- [x] Avatar, username, 2 links presentes em cada card
- [x] Links abrem em nova aba (manualmente)
- [x] DevTools mostra apenas 1 requisição GET para API
- [x] Nenhum erro no console

---

### T6.2: Teste de paginação

**Responsável:** QA / Frontend Developer  
**Estimativa:** 0.5h  
**Prioridade:** P0

**Descrição:**
- Testar navegação anterior/próxima: valida que slice muda corretamente
- Testar números de página: clicar muda para página correta
- Testar: "Anterior" desabilitado na página 1
- Testar: "Próxima" desabilitado na última página
- Testar total de páginas = `Math.ceil(total streamers / 20)`

**Requisitos de Aprovação:**
- [x] Clicar "Próxima" avança para página 2 (streamers 20-39)
- [x] Clicar "Anterior" volta para página 1
- [x] Números de página funcionam (pular para qualquer página)
- [x] "Anterior" desabilitado na página 1
- [x] "Próxima" desabilitado na última página
- [x] Total de páginas correto

---

### T6.3: Teste de tratamento de erros

**Responsável:** QA / Frontend Developer  
**Estimativa:** 0.75h  
**Prioridade:** P0

**Descrição:**
- Simular erro de rede (DevTools: offline, network throttle)
- Simular erro HTTP (mock API com status 500)
- Testar resposta vazia (`streamers: []`)
- Testar resposta malformada (JSON inválido)
- Validar mensagem de erro amigável em cada cenário

**Requisitos de Aprovação:**
- [x] Erro de rede mostra mensagem genérica
- [x] Status HTTP error (4xx/5xx) capturado e mensagem exibida
- [x] Lista vazia mostra "Nenhum streamer disponível" (não lista vazia)
- [x] JSON inválido não quebra a app, mostra erro
- [x] Nenhum `undefined.map` ou erro não tratado no console
- [x] App permanece funcional após erro (não preso em estado quebrado)

---

### T6.4: Teste de CSS e tema xadrez

**Responsável:** QA / Frontend Developer  
**Estimativa:** 0.5h  
**Prioridade:** P1

**Descrição:**
- Validar identidade visual: padrão quadriculado visível
- Validar paleta de cores (preto/branco/marrom ou preto/branco/verde)
- Validar contraste texto/fundo (WCAG AA: ≥ 4.5:1)
- Testar em navegadores modernos (Chrome, Firefox, Safari, Edge)
- Validar responsividade (desktop, tablet, mobile)

**Requisitos de Aprovação:**
- [x] Padrão quadriculado aplicado (não quebrado, CSS puro)
- [x] Paleta de cores coerente
- [x] Contraste WCAG AA ≥ 4.5:1 (validado com ferramentas)
- [x] Sem erros em múltiplos navegadores
- [x] Responsivo em breakpoints: desktop (1200px+), tablet (768px-1199px), mobile (<768px)

---

### T6.5: Teste de requisitos não-funcionais

**Responsável:** QA / Frontend Developer  
**Estimativa:** 0.5h  
**Prioridade:** P1

**Descrição:**
- Validar que nenhuma biblioteca de UI (Tailwind, Bootstrap) foi importada
- Validar que nenhuma biblioteca de HTTP (Axios, etc.) foi importada
- Validar ESLint e Biome: zero erros
- Validar TypeScript: zero erros (tsc)
- Validar performance: lista de 100+ cards renderiza sem lag

**Requisitos de Aprovação:**
- [x] `package.json`: sem Tailwind, Bootstrap, Axios
- [x] ESLint e Biome: zero erros (`npm run lint`)
- [x] TypeScript: zero erros (`npm run tsc` ou `tsc`)
- [x] Performance: 100+ streamers renderizam sem travamento
- [x] Sem warnings deprecados ou práticas ruins

---

## Fase 7: Deploy & Documentação

### T7.1: Build e validação em produção

**Responsável:** Frontend Developer / DevOps  
**Estimativa:** 0.75h  
**Prioridade:** P0

**Descrição:**
- Executar `npm run build` (Vite)
- Validar que build não tem erros
- Testar app em modo produção (ex: `vite preview`)
- Validar que assets CSS e JS são compilados corretamente
- Verificar tamanho do bundle (não deve crescer muito)

**Requisitos de Aprovação:**
- [ ] `npm run build` executa sem erros
- [ ] Nenhum warning crítico no build
- [ ] Modo preview funciona (app rodando de arquivos buildados)
- [ ] Todos os estados (loading, error, success) funcionam em produção
- [ ] CSS é inlined/importado corretamente (não há FOUC)
- [ ] Bundle size é razoável (<500KB gzipped para app V1)

---

### T7.2: Documentação e README

**Responsável:** Frontend Developer / Tech Writer  
**Estimativa:** 0.5h  
**Prioridade:** P2

**Descrição:**
- Atualizar/criar `README.md` com:
  - Como rodar localmente (`npm install`, `npm run dev`)
  - Como fazer build (`npm run build`)
  - Estrutura de pastas
  - Componentes principais
  - API consumida
- Adicionar comentários no código onde necessário (não óbvio)
- Documentar decisões técnicas principais

**Requisitos de Aprovação:**
- [ ] README.md existe e é claro
- [ ] Instruções de setup funcionam
- [ ] Estrutura de pastas documentada
- [ ] Componentes principais explicados
- [ ] Nenhum TODOs ou FIXMEs não endereçados

---

### T7.3: Deploy para GitHub Pages

**Responsável:** DevOps / Frontend Developer  
**Estimativa:** 0.75h  
**Prioridade:** P0

**Descrição:**
- Configurar build para GitHub Pages (base URL correta no vite.config.ts se necessário)
- Fazer deploy da build usando GitHub Actions ou `gh-pages` package
- Validar URL final (https://username.github.io/react-firt) funciona
- Testar em múltiplos navegadores e dispositivos
- Validar que API Chess.com é alcançável a partir de produção (CORS)

**Requisitos de Aprovação:**
- [ ] App publicada em GitHub Pages
- [ ] App funciona end-to-end em produção
- [ ] Teste funcional completo: carregamento, paginação, erros
- [ ] Nenhum erro de CORS
- [ ] Performance aceitável (Lighthouse score >80)
- [ ] GitHub Pages está configurado no repositório settings

---

## 3. Checklist de Critérios de Aceitação (Geral)

- [ ] Ao abrir a aplicação, estado de carregamento é exibido até resposta da API
- [ ] Após sucesso, primeira página exibe até 20 cards de streamers
- [ ] Cada card exibe: avatar, username, link Twitch, link Chess.com (todos funcionais)
- [ ] Abrir links em nova aba (verificado manualmente)
- [ ] Erro de API exibe mensagem amigável, sem quebrar a app
- [ ] Lista vazia exibe mensagem apropriada
- [ ] Navegação entre páginas funciona (Anterior, Próxima, números)
- [ ] Botão "Anterior" desabilitado na página 1
- [ ] Botão "Próxima" desabilitado na última página
- [ ] Total de páginas = `Math.ceil(total streamers / 20)`
- [ ] Layout aplica identidade visual xadrez (paleta, padrão quadriculado)
- [ ] Contraste texto/fundo ≥ 4.5:1 (WCAG AA)
- [ ] Nenhuma biblioteca de estilização (Tailwind, Bootstrap) importada
- [ ] Nenhuma biblioteca de HTTP (Axios) importada
- [ ] Apenas CSS puro e Fetch API
- [ ] ESLint + Biome: zero erros
- [ ] TypeScript: zero erros
- [ ] Apenas 1 requisição por carregamento de página (verificado em DevTools)
- [ ] Build (`npm run build`) funciona sem erros
- [ ] App funciona end-to-end em produção

---

## 3.1 Melhorias Adicionais Implementadas

### Status LIVE e Plataformas Dinâmicas (Pós-Fase 5)

Após a conclusão da Fase 5, foram implementadas melhorias adicionais baseadas na estrutura completa da API:

**Mudanças:**
- ✅ Atualizado tipo `Streamer` em `src/types/index.ts` com novos campos:
  - `is_live: boolean` — streamer ao vivo em qualquer plataforma
  - `platforms: Platform[]` — array de plataformas (Twitch, YouTube)
- ✅ Aprimorado componente `StreamerCard.tsx`:
  - Badge "🔴 LIVE" no avatar quando ao vivo
  - Links dinâmicos renderizados a partir do array platforms
  - Badge 🔴 individual por plataforma que está ao vivo
  - Cores temáticas por plataforma (Twitch: roxo, YouTube: vermelho)
- ✅ Estilização nova em `StreamerCard.css`:
  - `.streamer-card--live` para destaque
  - `.streamer-card__live-badge` com animação pulse
  - Suporte a múltiplas plataformas
- ✅ Documentação atualizada em `.plan/braim-dump.md`:
  - Estrutura JSON completa da API
  - Novos campos explicados

**Documentação:**
- 📄 `ENHANCED_FEATURES.md` — Detalhes completos das melhorias
- 📄 `FASE5_REPORT.md` — Relatório da Fase 5

**Validação:**
- ✅ TypeScript: 0 erros
- ✅ ESLint: 0 erros
- ✅ Build: 171ms, sem erros
- ✅ Bundle size impact: negligível (+0.33 kB gzip)

---

## 4. Observações Gerais

- **Dependências:** React 19, Vite 8, TypeScript, ESLint, Biome (já configurados)
- **CORS:** Validar acesso a `api.chess.com` antes de começar; considerar proxy se necessário
- **Prioridades:** P0 = MVP, P1 = importante, P2 = nice-to-have
- **Comunicação:** Atualizar este documento conforme progresso; mover tasks para "Done" após aprovação
- **Review:** Cada fase é revisada antes de passar para a próxima
