# Digital City OS

A real-time megapolis simulation platform where thousands of AI-driven agents interact through interconnected systems: economy, transport, media, politics, and crime.

## 🎯 Overview

Digital City OS is **not** a city builder. It's an operating system for a living civilization where emergent behavior and complex system interactions are the primary product.

- 📊 **Real-time simulation** of a metropolis with AI agents
- 🌐 **Interconnected systems** (economy, traffic, crime, politics, media)
- 🎮 **Interactive control** of city policies and interventions
- 📈 **Analytics dashboard** for understanding city dynamics
- 🎨 **Cyberpunk UI** inspired by Bloomberg Terminal and ctOS

## 📁 Project Structure

Monorepo with two main applications:

```txt
digital-city-os/
├── apps/
│   ├── frontend/          # Next.js + React + Three.js UI
│   └── backend/           # Node.js + Fastify simulation engine
├── PRD.md                 # Product requirements & vision
├── BACKLOG.md             # Task backlog with phases
└── docs/                  # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18
- npm >= 9
- PostgreSQL (for persistence)
- Redis (for real-time state)

### Development

```bash
# Install dependencies
npm install

# Start frontend (localhost:3000)
npm run dev -w apps/frontend

# Start backend (localhost:3001) - in another terminal
npm run dev -w apps/backend
```

### Build & Deploy

```bash
# Build all apps
npm run build

# Lint & format
npm run lint
npm run format
```

## 📋 Development Workflow

1. Create feature branch from `develop`
2. Make changes and commit
3. Push to remote and create PR
4. Code review & merge to `develop`
5. Once stable, merge `develop` → `master` for production release

**Branch strategy:**
- `master` — production (auto-deployed to Vercel)
- `develop` — staging (auto-deployed to Vercel preview)
- Feature branches — development

## 📚 Documentation

- [PRD.md](./PRD.md) — Product vision, systems, architecture
- [BACKLOG.md](./BACKLOG.md) — Task breakdown by phase
- [apps/frontend/README.md](./apps/frontend/README.md) — Frontend setup
- [apps/backend/README.md](./apps/backend/README.md) — Backend setup

## 🎮 Features (MVP)

- Real-time city simulation with 500-1000 AI agents
- District system with interconnected metrics
- Traffic & transport simulation
- Economy & business system
- Crime emergence from social conditions
- Media system (procedural news generation)
- Event cascading & emergence
- Analytics dashboard
- Policy controls
- 3D visualization with camera controls

## 🔧 Tech Stack

### Frontend
- Next.js 14+ (React framework)
- React 18 (UI)
- Three.js + React Three Fiber (3D rendering)
- Zustand (state management)
- Tailwind CSS (styling)
- TypeScript (type safety)

### Backend
- Node.js + Fastify (HTTP/WebSocket server)
- PostgreSQL (persistent storage)
- Redis (real-time state & caching)
- TypeScript (type safety)

### Deployment
- Vercel (frontend)
- Railway/Fly.io (backend - free tier)

## 📖 Phases

1. **Phase 1** — Foundation & architecture
2. **Phase 2** — Core systems (AI, economy, traffic, crime, events)
3. **Phase 3** — Integration & visualization
4. **Phase 4** — Polish & MVP release

See [BACKLOG.md](./BACKLOG.md) for detailed task breakdown.

## 🤝 Contributing

- Follow ESLint + Prettier rules (enforced in CI)
- Write clear commit messages
- Test locally before pushing
- All PRs require review

## 📝 License

MIT

## 🙋 Questions?

See PRD.md for design philosophy and long-term vision.