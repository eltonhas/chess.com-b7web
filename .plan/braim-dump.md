# App de Streamers de Xadrez — Brain-dump / Planejamento

## O que é o projeto
Aplicação web em React que consome a API pública do Chess.com para listar streamers de xadrez, exibindo avatar, nome de usuário e links para o canal na Twitch e para o perfil no Chess.com.

## Stack
- **React** (projeto já existente)
- **JavaScript + Fetch API** para consumir a API REST
- **CSS puro** — sem biblioteca de estilização (sem Tailwind, Bootstrap, etc.)
- **Fonte de dados:** API pública do Chess.com

## Fonte de dados (API)

Endpoint: `https://api.chess.com/pub/streamers`

Formato de resposta completo:
```json
{
  "streamers": [
    {
      "username": "Witty_Alien",
      "avatar": "https://images.chesscomfiles.com/uploads/v1/user/24250668.edaa550e.50x50o.adf21fb42a9e.png",
      "twitch_url": "https://twitch.tv/witty_alien",
      "url": "https://www.chess.com/member/Witty_Alien",
      "is_live": true,
      "is_community_streamer": false,
      "platforms": [
        {
          "type": "twitch",
          "stream_url": "https://twitch.tv/witty_alien",
          "channel_url": "https://twitch.tv/witty_alien",
          "is_live": true,
          "is_main_live_platform": true
        },
        {
          "type": "youtube",
          "channel_url": "https://youtube.com/@witty_alienclips",
          "is_live": false
        }
      ]
    }
  ]
}
```

Observações importantes sobre a API:
- Não exige autenticação.
- Não possui paginação — retorna a lista inteira de uma vez.
- Dados atualizados a cada ~5 minutos no servidor do Chess.com.
- Campos principais:
  - `username`, `avatar`, `twitch_url`, `url` — campos básicos do streamer
  - `is_live` — boolean indicando se o streamer está ao vivo em qualquer plataforma
  - `is_community_streamer` — boolean (pode ser ignorado no MVP)
  - `platforms` — array com detalhes de cada plataforma (twitch, youtube, etc)
    - `type` — tipo de plataforma ('twitch', 'youtube', etc)
    - `stream_url` — URL da transmissão ao vivo (se disponível)
    - `channel_url` — URL do canal/perfil na plataforma
    - `is_live` — boolean indicando se está ao vivo nessa plataforma específica
    - `is_main_live_platform` — boolean indicando a plataforma principal (optional)

## Escopo da V1 (MVP)

**Funcionalidades:**
1. Buscar a lista de streamers ao carregar a página.
2. Exibir estado de carregamento (loading) enquanto a requisição está em andamento.
3. Exibir mensagem de erro caso a requisição falhe.
4. Renderizar um card para cada streamer contendo:
   - Avatar
   - Username
   - **Badge "🔴 LIVE"** se o streamer está ao vivo em qualquer plataforma
   - Links dinâmicos para cada plataforma com indicador de transmissão ao vivo:
     - **Twitch** (roxo) — com badge 🔴 se está ao vivo
     - **YouTube** (vermelho) — com badge 🔴 se está ao vivo (se disponível)
   - **Link para perfil no Chess.com** (verde)
5. Paginação simples: exibir 20 streamers por página, com navegação entre páginas (ex: botões "Anterior" / "Próxima" ou números de página).
   - Como a API não pagina os dados (retorna a lista inteira de uma vez), a paginação será feita no client — a lista completa é buscada uma vez e depois "fatiada" em blocos de 20 conforme a página atual.

**Fora do escopo da V1** (backlog para versões futuras):
- Busca/filtro por nome
- Ordenação alfabética
- Favoritos com localStorage
- Dark mode
- Skeleton loading
- Testes automatizados (Jest/RTL)

## Estrutura de componentes planejada

```
App
 └─ StreamerList
     ├─ StreamerCard (um por streamer, até 20 por página)
     └─ Pagination (botões/números de navegação entre páginas)
```

## Estado necessário

- `streamers` → array, inicialmente vazio (`[]`)
- `loading` → boolean
- `error` → string ou `null`
- `currentPage` → number, inicialmente `1` (controla qual bloco de 20 streamers é exibido)

## Estrutura de arquivos sugerida

```
src/
 ├─ App.jsx
 ├─ components/
 │   ├─ StreamerList.jsx
 │   ├─ StreamerCard.jsx
 │   ├─ StreamerCard.css
 │   ├─ Pagination.jsx
 │   └─ Pagination.css
```

## Estilização (Design)

A identidade visual deve remeter a um tabuleiro de xadrez, usando CSS puro:
- Paleta baseada nas cores clássicas do tabuleiro (tons de preto/branco/marrom, ou preto/branco/verde como variação).
- Cards ou o fundo da lista podem usar um padrão quadriculado (semelhante às casas do tabuleiro) como elemento decorativo.
- Bom contraste entre texto e fundo para manter a legibilidade apesar do padrão quadriculado.

## Considerações técnicas

- Verificar se a API aceita requisições diretamente do navegador (CORS). Se não aceitar, avaliar proxy de desenvolvimento ou uma function serverless intermediária.
- Evitar chamadas repetidas/agressivas à API — um fetch por carregamento de página é suficiente para o MVP.