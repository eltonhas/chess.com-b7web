# 🏁 React FIRT - Chess.com Streamers App

Uma aplicação React moderna que exibe streamers de xadrez em tempo real da Chess.com, com interface temática de xadrez, paginação inteligente e tratamento robusto de erros.

## 📋 Visão Geral

**React FIRT** (Front-end Interface React Template) é um aplicativo que:
- Busca dados de streamers em tempo real da [API Chess.com](https://www.chess.com/news/view/published-api-doesnt-include-the-puzzle-rush-api)
- Exibe 20 streamers por página com paginação
- Mostra informações de plataformas ativas (Twitch, YouTube)
- Destaca streamers ao vivo com badge animado
- Oferece interface responsiva com tema xadrez

## 🚀 Início Rápido

### Pré-requisitos
- Node.js ≥ 18
- npm ≥ 10

### Instalação

```bash
# Clonar repositório
git clone <repository-url>
cd react-firt

# Instalar dependências
npm install
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento (hot reload)
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) no navegador.

### Build para Produção

```bash
# Compilar TypeScript e build com Vite
npm run build

# Testar aplicação em produção
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── App.tsx              # Componente raiz com gerenciamento de estado
├── App.css              # Estilos globais (tema xadrez, grid background)
├── components/
│   ├── StreamerList.tsx  # Lista de streamers com slice por página
│   ├── StreamerList.css  # Estilos da lista
│   ├── StreamerCard.tsx  # Card individual de streamer
│   ├── StreamerCard.css  # Estilos do card (avatar, badges, links)
│   ├── Pagination.tsx    # Componente de paginação
│   └── Pagination.css    # Estilos dos botões de página
├── types/
│   └── index.ts         # Tipos TypeScript (Streamer, Platform)
└── main.tsx            # Entry point React
dist/                   # Build compilado (gerado por npm run build)
```

## 🎮 Componentes Principais

### `App.tsx`
- **Responsabilidade:** Gerenciamento de estado global e API
- **Estado:**
  - `streamers: Streamer[]` - Array de streamers
  - `loading: boolean` - Estado de carregamento
  - `error: string | null` - Mensagem de erro
  - `currentPage: number` - Página atual
- **Efeito:** Busca dados da Chess.com na montagem

### `StreamerCard.tsx`
- **Props:** `streamer: Streamer`
- **Exibe:** Avatar, username, badges (LIVE), links dinâmicos por plataforma
- **Features:**
  - Avatar fallback para imagens quebradas
  - Badge 🔴 LIVE animado para streamers ao vivo
  - Links com `target="_blank"` e `rel="noopener noreferrer"`

### `StreamerList.tsx`
- **Props:** `streamers, loading, error, currentPage`
- **Renderiza:** 20 cards por página (slice calculado)
- **Estados:**
  - Loading: "Carregando..."
  - Error: Mensagem de erro
  - Empty: "Nenhum streamer disponível"
  - Success: Lista de cards

### `Pagination.tsx`
- **Props:** `totalItems, currentPage, onPageChange`
- **Features:**
  - Botões "Anterior" e "Próxima" (desabilitados nos limites)
  - Números de página clicáveis
  - Indicador "Página X de Y"

## 🎨 Design & Identidade Visual

### Tema Xadrez
- **Paleta:** Preto (#1a1a1a), Branco (#f5f5f5), Marrom (#8b4513)
- **Background:** Padrão quadriculado CSS puro (repeating-linear-gradient)
- **Contraste:** WCAG AA (≥4.5:1)

### Responsividade
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## 📊 API Consumida

**Endpoint:** `https://api.chess.com/pub/streamers`

**Estrutura de Resposta:**
```json
{
  "streamers": [
    {
      "username": "string",
      "avatar": "string (URL)",
      "twitch_url": "string | null",
      "url": "string",
      "is_live": boolean,
      "platforms": [
        {
          "name": "twitch" | "youtube",
          "url": "string",
          "is_live": boolean
        }
      ]
    }
  ]
}
```

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Dev server com HMR
npm run build    # Build TypeScript + Vite
npm run preview  # Servir build local
npm run lint     # Lint com ESLint
npm run tsc      # Type check TypeScript
```

## ✅ Critérios de Qualidade

- ✅ **TypeScript:** Zero erros de tipo
- ✅ **ESLint:** Zero erros de linting
- ✅ **Bundle Size:** ~63KB gzipped (< 500KB)
- ✅ **Performance:** Renderiza 100+ cards sem lag
- ✅ **Acessibilidade:** WCAG AA (contraste, focus states)
- ✅ **Sem Dependências Pesadas:** Apenas React + Vite
- ✅ **CSS Puro:** Nenhuma biblioteca de UI (Tailwind, Bootstrap)
- ✅ **Fetch API:** Nenhuma biblioteca HTTP (Axios)

## 🐛 Tratamento de Erros

A aplicação trata graciosamente:
- Erro de rede (offline, timeout)
- HTTP errors (4xx, 5xx)
- JSON inválido
- Resposta sem campo `streamers`
- Lista vazia (`streamers: []`)

Usuários recebem mensagens amigáveis e a app permanece funcional (não quebra).

## 📱 Testes de Funcionalidade

### Verificação Básica
1. Abrir app → exibe "Carregando..."
2. Aguardar → lista com até 20 streamers
3. Clicar "Próxima" → avança para página 2
4. Clicar número de página → vai direto para página

### Edge Cases
- Link de Twitch quebrado → button desabilitado (não renderiza)
- Avatar não carrega → mostra placeholder
- API retorna erro → mensagem e retry possível
- Lista vazia → "Nenhum streamer disponível"

## 📦 Build & Deploy

### GitHub Pages

```bash
# Build está pronto em dist/
npm run build

# Deploy (se configurado com gh-pages):
npm run deploy
```

**Configuração em `vite.config.ts`:**
```ts
export default defineConfig({
  base: '/react-firt/' // seu repo
  ...
})
```

## 📝 Notas Técnicas

### Por que CSS Puro?
- Sem dependências externas
- Controle total do bundle
- WCAG accessibility built-in

### Por que Fetch API?
- Native no navegador
- Sem overhead de bibliotecas
- Promise-based

### Decisões Arquiteturais
- **Componentização:** Cada componente tem uma responsabilidade (SRP)
- **Estado:** Centralizado em App.tsx (não precisa Context para essa escala)
- **Tipagem:** Props com TypeScript para segurança de tipo
- **Performance:** useEffect com cleanup, sem re-renders desnecessários

## 🤝 Contribuindo

1. Crie uma branch (`git checkout -b feature/nova-feature`)
2. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
3. Push para a branch (`git push origin feature/nova-feature`)
4. Abra um Pull Request

## 📄 Licença

MIT

## 🔗 Recursos

- [Chess.com API](https://www.chess.com/news/view/published-api)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
