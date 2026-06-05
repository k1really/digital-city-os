# Digital City OS — Frontend

Next.js + React + Three.js real-time visualization of the city simulation.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Structure

- `src/pages` — Next.js pages
- `src/components` — Reusable React components
- `src/3d` — Three.js scenes and utilities
- `src/store` — Zustand state management
- `src/hooks` — Custom React hooks
- `src/utils` — Helper utilities
- `src/types` — TypeScript type definitions

## Development

- `npm run dev` — Start dev server with hot reload
- `npm run build` — Build for production
- `npm run lint` — Run ESLint
- `npm run format` — Format code with Prettier

## Environment

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```
