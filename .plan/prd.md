# PRD — App de Streamers de Xadrez

## 1. Visão Geral

Aplicação web em React que consome a API pública do Chess.com para exibir a lista de streamers de xadrez cadastrados na plataforma. Cada streamer é apresentado em um card com avatar, nome de usuário e links para seu canal na Twitch e seu perfil no Chess.com. A lista completa é paginada no client em blocos de 20 itens.

Este é o MVP (V1) do produto: escopo enxuto, sem persistência, sem autenticação, com foco em consumir corretamente uma API pública e apresentar os dados de forma clara e visualmente temática (tabuleiro de xadrez).

## 2. Objetivos

- Buscar e exibir todos os streamers retornados por `https://api.chess.com/pub/streamers`.
- Fornecer feedback de estado claro ao usuário: carregando, erro ou lista carregada.
- Paginar a lista no client (20 streamers por página), já que a API não pagina.
- Aplicar uma identidade visual reconhecível de tabuleiro de xadrez usando apenas CSS puro.
- Manter a implementação simples, sem introduzir dependências ou funcionalidades fora do escopo da V1.

### Fora do escopo da V1 (backlog)
- Busca/filtro por nome
- Ordenação alfabética
- Favoritos com `localStorage`
- Dark mode
- Skeleton loading
- Testes automatizados (Jest/RTL)

## 3. Requisitos Funcionais

| ID | Requisito |
|----|-----------|
| RF-01 | Ao carregar a página, a aplicação deve buscar automaticamente a lista de streamers no endpoint da API. |
| RF-02 | Enquanto a requisição estiver em andamento, deve ser exibido um estado de carregamento (loading). |
| RF-03 | Caso a requisição falhe (erro de rede, status HTTP de erro, resposta malformada), deve ser exibida uma mensagem de erro amigável ao usuário. |
| RF-04 | Cada streamer deve ser renderizado em um card contendo: avatar, username, link para o canal na Twitch e link para o perfil no Chess.com. |
| RF-05 | Os links de Twitch e Chess.com devem abrir em uma nova aba, sem substituir a aplicação. |
| RF-06 | A lista completa de streamers deve ser exibida paginada em blocos de 20 itens por página. |
| RF-07 | Deve existir navegação entre páginas (botões "Anterior" / "Próxima" e/ou números de página). |
| RF-08 | Os controles de navegação devem refletir o estado atual (ex.: desabilitar "Anterior" na primeira página, desabilitar "Próxima" na última). |
| RF-09 | A paginação deve ser feita inteiramente no client, a partir de uma única busca à API (sem novas requisições ao trocar de página). |

## 4. Requisitos de Sistema

- **Frontend:** React 19 (`react`, `react-dom` ^19.2.7), já configurado no projeto.
- **Build tool:** Vite 8 (`vite dev`, `vite build`).
- **Linguagem:** TypeScript (o projeto já está configurado com `tsc` + `@types/react`). Os componentes serão criados como `.tsx`, adaptando a sugestão original em `.jsx` do brain-dump para manter consistência com o restante do projeto.
- **Estilização:** CSS puro (arquivos `.css` por componente), sem bibliotecas de UI ou utilitários (sem Tailwind, Bootstrap, styled-components, etc.).
- **Requisições HTTP:** Fetch API nativa do navegador, sem bibliotecas como Axios.
- **Lint/Format:** ESLint + Biome já configurados no projeto — o código novo deve respeitar essas regras.
- **Navegador-alvo:** browsers modernos com suporte a ES2020+ e `fetch`.
- **Rede:** dependência de acesso à internet para consumir `api.chess.com`; não há backend próprio nem variáveis de ambiente/segredos necessários (endpoint público, sem autenticação).

## 5. Detalhes Técnicos

### 5.1 Arquitetura

Aplicação puramente client-side (SPA), sem backend próprio. Estrutura de componentes:

```
App
 └─ StreamerList
     ├─ StreamerCard   (um por streamer, até 20 por página)
     └─ Pagination     (navegação entre páginas)
```

Estrutura de arquivos sugerida:

```
src/
 ├─ App.tsx
 ├─ components/
 │   ├─ StreamerList.tsx
 │   ├─ StreamerCard.tsx
 │   ├─ StreamerCard.css
 │   ├─ Pagination.tsx
 │   └─ Pagination.css
```

**Estado (gerenciado em `App` ou `StreamerList`, via `useState`):**

| Estado | Tipo | Valor inicial | Descrição |
|--------|------|----------------|-----------|
| `streamers` | `Streamer[]` | `[]` | Lista completa retornada pela API |
| `loading` | `boolean` | `true` | Indica requisição em andamento |
| `error` | `string \| null` | `null` | Mensagem de erro, se houver |
| `currentPage` | `number` | `1` | Página atual (bloco de 20 exibido) |

**Tipo de dado (`Streamer`):**
```ts
interface Streamer {
  username: string;
  avatar: string;
  twitch_url: string;
  url: string;
}
```

### 5.2 Fluxo de Execução

1. `App` monta e dispara `useEffect` que chama `fetch("https://api.chess.com/pub/streamers")`.
2. `loading` é `true` durante a chamada; `StreamerList` (ou `App`) exibe um indicador de carregamento.
3. **Sucesso:** resposta é convertida via `response.json()`, o array `streamers` é armazenado no estado; `loading` vira `false`.
4. **Falha:** erro de rede, `response.ok === false`, ou JSON inválido/campo `streamers` ausente → `error` recebe uma mensagem amigável; `loading` vira `false`.
5. Com `streamers` populado, calcula-se o slice da página atual: `streamers.slice((currentPage - 1) * 20, currentPage * 20)`.
6. `StreamerList` renderiza um `StreamerCard` para cada item do slice atual.
7. `Pagination` calcula o total de páginas (`Math.ceil(streamers.length / 20)`) e renderiza os controles de navegação.
8. Ao clicar em "Anterior"/"Próxima"/número de página, apenas `currentPage` é atualizado — não há nova requisição à API.

### 5.3 Tratamento de Falhas

- **Erro de rede / API fora do ar:** capturar exceção do `fetch` (bloco `try/catch` ou `.catch`) e exibir mensagem genérica, ex.: "Não foi possível carregar os streamers. Tente novamente mais tarde."
- **Status HTTP de erro (4xx/5xx):** verificar `response.ok`; se falso, tratar como erro e exibir mensagem.
- **Resposta malformada** (JSON inválido ou sem o campo `streamers`): tratar como erro em vez de quebrar a renderização (evitar `undefined.map`).
- **CORS:** validar previamente se `api.chess.com` aceita requisições diretas do navegador. Se houver bloqueio de CORS, considerar um proxy de desenvolvimento (ex. `vite.config.ts` com `server.proxy`) ou uma function serverless intermediária como fallback — decisão a ser validada antes da implementação.
- **Avatar quebrado/ausente:** o `<img>` do avatar deve ter tratamento (`onError` ou fallback) para não deixar um ícone de imagem quebrada visível.
- **Lista vazia:** caso a API retorne `streamers: []`, exibir mensagem informando que não há streamers disponíveis, em vez de mostrar uma lista/paginação vazia.
- **Uma única chamada por carregamento de página:** evitar refetch ao trocar de página ou re-renderizar; a busca ocorre uma única vez por sessão de uso (a menos que o usuário recarregue a página).

### 5.4 Instruções Visuais

- Identidade visual remetendo a um tabuleiro de xadrez, usando apenas CSS puro (sem frameworks de UI).
- Paleta baseada nas cores clássicas do tabuleiro: tons de preto/branco/marrom (ou variação preto/branco/verde).
- Uso de um padrão quadriculado (semelhante às casas do tabuleiro) como elemento decorativo — pode ser aplicado ao fundo da lista ou aos cards.
- Contraste de texto/fundo deve permanecer alto o suficiente para manter legibilidade, mesmo com o padrão quadriculado presente.
- Cards devem exibir, de forma clara e escaneável: avatar (imagem), username (destaque), e dois links (Twitch / Chess.com) visualmente distinguíveis como ações clicáveis.
- Controles de paginação devem indicar claramente a página ativa e o estado desabilitado dos botões nos limites (primeira/última página).

## 6. Critérios de Aceitação

- [ ] Ao abrir a aplicação, um estado de carregamento é exibido até a resposta da API chegar.
- [ ] Após o carregamento bem-sucedido, a primeira página exibe até 20 cards de streamers.
- [ ] Cada card exibe avatar, username, link para Twitch e link para Chess.com, todos funcionais e abrindo em nova aba.
- [ ] Se a API falhar (rede, status de erro ou JSON inválido), uma mensagem de erro é exibida no lugar da lista, sem quebrar a aplicação.
- [ ] Se a lista de streamers vier vazia, uma mensagem apropriada é exibida (não uma lista/paginação vazia sem contexto).
- [ ] É possível navegar entre páginas via botões "Anterior"/"Próxima" e/ou números de página, sem novas chamadas à API.
- [ ] O botão "Anterior" fica desabilitado na primeira página e "Próxima" fica desabilitado na última.
- [ ] O total de páginas corresponde a `Math.ceil(total de streamers / 20)`.
- [ ] O layout aplica a identidade visual de tabuleiro de xadrez (paleta e/ou padrão quadriculado) mantendo boa legibilidade.
- [ ] Nenhuma biblioteca de estilização (Tailwind, Bootstrap, etc.) ou de requisição HTTP (Axios, etc.) é introduzida — apenas CSS puro e Fetch API.
- [ ] O código segue as regras de lint/format já configuradas no projeto (ESLint + Biome) sem novos erros.
