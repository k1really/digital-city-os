# Digital City OS — Product Requirements Document

## Executive Summary

**Digital City OS** is a real-time megapolis simulation platform where thousands of AI-driven agents interact through interconnected systems: economy, transport, media, politics, and crime. The experience prioritizes **emergence** and **organic behavior** over scripted gameplay.

**Core Feeling:** "I am observing a living civilization."

---

## Core Concept

This is **NOT** a city builder. It is:

- An **operating system** for a city
- A **social simulation** engine
- A **sandbox** for emergent behavior
- An **AI-driven civilization** engine
- A blend of Bloomberg Terminal + SimCity + Cyberpunk control room

**Core Goal:** Create the sensation that the city lives independently of player intervention.

---

## Player Experience

The player takes on multiple roles:

- **Mayor** — making policy decisions
- **Analyst** — observing patterns and consequences
- **Operator** — managing city systems
- **Architect** — designing social processes
- **Observer** — watching organic behavior unfold

### Primary Loop

1. Observe city behavior
2. Identify patterns/problems
3. Intervene (policies, budgets, controls)
4. Watch cascading consequences
5. Adapt to emergent situations

---

## Visual & UI Philosophy

**Aesthetic:** Sci-fi operations center, cyberpunk urban analytics, futuristic control dashboard

**References:**
- Blade Runner interfaces
- Deus Ex UI
- Bloomberg Terminal
- Watch Dogs ctOS
- Neural network dashboards
- GIS systems
- Real-time intelligence maps

**Key Principle:** Visualize hidden systems. Make invisible mechanics visible through:
- Traffic heatmaps
- Crime overlays
- Economic flow maps
- Social tension maps
- Pollution layers
- District mood colors
- Migration flows

---

## Technical Architecture

### Frontend Stack
- **Framework:** Next.js + React + TypeScript
- **3D Rendering:** Three.js + React Three Fiber
- **2D Rendering:** PixiJS (performance-critical layers)
- **State:** Zustand
- **Styling:** Tailwind CSS
- **Communication:** WebSocket

### Backend Stack
- **Runtime:** Node.js
- **Framework:** Fastify or NestJS
- **Architecture:** Event-driven
- **Simulation:** Custom tick-based engine
- **Communication:** WebSocket, Server-Sent Events

### Databases
- **PostgreSQL:** Historical events, saves, statistics, district data, simulation history
- **Redis:** Real-time state, agent memory, queues, pub/sub, live state caching

### Infrastructure Patterns
- **Entity Pooling:** Reuse agent objects
- **Spatial Partitioning:** Chunk-based updates
- **Aggregation:** Background population vs. detailed simulation
- **Worker Threads:** Offload heavy computation
- **GPU Rendering:** Where applicable (Three.js + WebGL)

---

## Core Systems Overview

### 1. District System
Every district has metrics and evolves over time:
- Population, wealth, crime, pollution, happiness, unemployment
- Political leaning, traffic density, social tension, education, health, business activity

Districts affect each other through edges (roads, transport, trade flows).

### 2. Citizen AI System
Citizens are autonomous agents with:
- Personality, income, job, stress, ideology, habits, routines
- Home, workplace, relationships, political alignment
- Memory, goals, risk tolerance

Optimization: High-detail simulation for camera-visible agents, aggregated simulation for background population.

### 3. Daily Life Simulation
Citizens have routines:
- Wake → Commute → Work → Eat → Socialize → Rest
- Traffic patterns emerge naturally
- Rush hours create congestion, stress, economic inefficiency

### 4. Transport System
Simulates roads, intersections, public transport, traffic flow.
- Traffic affects economy, happiness, pollution, emergency response
- Route optimization and pedestrian density

### 5. Economy System
Businesses:
- Open, compete, fail, relocate
- Hire workers, react to district conditions
- Supply/demand, taxes, inflation, rent, salaries, unemployment

Economic events cascade: higher taxes → business migration → unemployment → district decline

### 6. Media System
AI-generated news that influences public opinion:
- Headlines, social media posts, trending narratives
- Affects public mood, politics, migration, business confidence

### 7. Social System
Citizens form opinions, trends, movements:
- Protests, panic, riots, celebrations
- Social contagion: ideas spread between agents
- Political polarization

### 8. Crime System
Emerges from poverty, stress, inequality, gang presence, policing:
- Theft, organized crime, cybercrime, corruption, riots
- Police resources are limited and must be allocated strategically

### 9. Politics System
Player can:
- Raise taxes, subsidize industries, expand police
- Improve transport, introduce welfare, enforce surveillance
- Manipulate media

Political consequences emerge naturally from decisions.

### 10. Event System
Events cascade and create chains:
- Power outages, pandemics, economic crashes, protests
- Fires, infrastructure collapse, political scandals, transport strikes
- Events propagate through systems creating emergent situations

---

## Simulation Architecture

### Tick-Based System
- Each tick updates: traffic, economy, citizen moods, district metrics, events, businesses, social trends, media
- Time scales: 1 second realtime or accelerated (x2, x5, x20, x100)

### Probabilistic Systems
NOT: "every citizen runs independently every frame"
INSTEAD:
- Discrete ticks
- State transitions
- Probabilistic events
- Cascading consequences
- Aggregated background simulation

### Emergence Over Scripts
- Interactions between systems generate emergent behavior
- No hardcoded event chains
- Cities should surprise both players and developers
- The city itself becomes the main character

---

## MVP Scope

### Initial Release Features
- One medium-sized city
- 500–1,000 simulated citizens
- District system with metrics
- Basic traffic simulation
- Economy with businesses and employment
- Daily life routines for citizens
- Real-time visualization
- News/media system
- Crime emerging from system interactions
- Basic event system
- Simple policy controls (taxes, budgets)
- Live analytics dashboard

### MVP Does NOT Include
- Weather/seasons
- Elections
- Stock market
- Corporations
- Multi-city trading
- Disasters
- Advanced surveillance mechanics
- Custom district creation

---

## Success Metrics

### Technical
- Simulation loop maintains 60 FPS (or target framerate) at 1000 agents
- Network latency < 100ms (WebSocket updates)
- Memory footprint < 500MB frontend, < 1GB backend

### Player Experience
- Player should feel city is "alive" within first 5 minutes
- Cascade events observable within 10 minutes
- Policy impact visible within 1-2 simulation minutes

### Emergence
- At least 3 observable feedback loops active simultaneously
- Unexpected cascade events at least once per 5-minute session
- No two city simulations should feel identical

---

## Development Roadmap

### Phase 1: Foundation (Weeks 1-2)
- Project setup and architecture
- Core tick-based simulation loop
- District graph structure
- PostgreSQL + Redis setup
- WebSocket infrastructure
- Basic 3D viewport (Three.js)

### Phase 2: Core Systems (Weeks 3-4)
- Citizen AI and daily routines
- Traffic simulation
- Economy and businesses
- Crime system (emerging from conditions)
- Media generation system
- Basic event cascading

### Phase 3: Integration & Polish (Weeks 5-6)
- Full system integration and balancing
- Analytics dashboard
- Visualization layers (heatmaps, overlays)
- Performance optimization
- Emergent behavior tuning
- Initial playtesting and iteration

### Phase 4: Polish & Release
- Visual refinement
- UI/UX polish
- Stability and bug fixes
- Documentation
- MVP Release

---

## AI Use Cases

**LLMs are NOT the core simulation.**

LLMs are **flavor/intelligence layers** for:
- News headline generation
- Citizen dialogue
- Social media posts
- Political speeches
- District reports
- Storytelling/narrative

Core simulation remains **deterministic/probabilistic** for reproducibility and performance.

---

## Long-Term Vision

Future systems (not MVP):
- Weather and seasonal cycles
- Elections and political campaigns
- Stock market and financial instruments
- Mega-corporations as agents
- Autonomous criminal organizations
- Global trade networks
- Neighboring cities and diplomacy
- Natural disasters
- Smart infrastructure
- Surveillance state mechanics
- Climate change systems

---

## Design Philosophy

### DO Prioritize
1. Systems and emergence
2. Simulation depth and interconnection
3. Visualization of hidden mechanics
4. Atmosphere and feel
5. Performance optimization

### DO NOT Prioritize
- Graphics photorealism
- Asset quantity
- Scripted gameplay
- Tutorial/handholding
- Single "winning" condition

---

## Final Experience Goals

When complete, Digital City OS should feel like:
- A living civilization evolving in real-time
- A cyberpunk neural ecosystem
- A digital organism with its own logic
- A real-time social simulation
- An AI-driven megapolis consciousness

**The city should appear alive even when the player does nothing.**
