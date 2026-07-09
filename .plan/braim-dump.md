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

Formato de resposta:
```json
{
  "streamers": [
    {
      "username": "string",
      "avatar": "URL",
      "twitch_url": "URL da Twitch",
      "url": "URL do perfil no Chess.com"
    }
  ]
}
```

Observações importantes sobre a API:
- Não exige autenticação.
- Não possui paginação — retorna a lista inteira de uma vez.
- Dados atualizados a cada ~5 minutos no servidor do Chess.com.
- Só entrega esses 4 campos — não há bio, seguidores, nem status "ao vivo agora".

## Escopo da V1 (MVP)

**Funcionalidades:**
1. Buscar a lista de streamers ao carregar a página.
2. Exibir estado de carregamento (loading) enquanto a requisição está em andamento.
3. Exibir mensagem de erro caso a requisição falhe.
4. Renderizar um card para cada streamer contendo:
   - Avatar
   - Username
   - Link para o canal na Twitch
   - Link para o perfil no Chess.com
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