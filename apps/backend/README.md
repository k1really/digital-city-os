# Digital City OS — Backend

Node.js + Fastify simulation engine with WebSocket real-time sync.

## Quick Start

```bash
npm install
npm run dev
```

Server runs on [http://localhost:3001](http://localhost:3001)

## Structure

- `src/main.ts` — Entry point
- `src/simulation` — Core simulation loop and systems
- `src/services` — Business logic (economy, traffic, crime, etc.)
- `src/routes` — Fastify API routes
- `src/websocket` — WebSocket handlers
- `src/database` — Database connections and queries
- `src/types` — TypeScript type definitions
- `src/utils` — Helper utilities

## Development

- `npm run dev` — Start dev server with hot reload (nodemon)
- `npm run build` — Build for production
- `npm run lint` — Run ESLint
- `npm run format` — Format code with Prettier

## Environment

Create `.env`:

```env
NODE_ENV=development
PORT=3001
DB_URL=postgresql://user:password@localhost:5432/digital_city_os
REDIS_URL=redis://localhost:6379
LOG_LEVEL=debug
```

## Database

Requires PostgreSQL and Redis.

## WebSocket

WebSocket server on `ws://localhost:3001/ws`
