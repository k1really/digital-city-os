# Digital City OS — Task Backlog

## Task Format

Each task includes:
- **ID:** Unique identifier
- **Title:** Clear task name
- **Phase:** Development phase (1-4)
- **Priority:** CRITICAL / HIGH / MEDIUM / LOW
- **Complexity:** SIMPLE / MEDIUM / COMPLEX
- **Description:** What needs to be done
- **Acceptance Criteria:** Definition of done
- **Dependencies:** Other tasks that must complete first
- **Estimated Effort:** Story points or hours

---

## PHASE 1: Foundation & Architecture

### T1.0 — GitHub Workflow & CI/CD Setup

**Priority:** CRITICAL  
**Complexity:** MEDIUM  
**Phase:** 1  

**Description:**
Set up GitHub branches (master/develop), PR review workflow, and automatic deployment on push to master.

**Acceptance Criteria:**
- `master` branch (production)
- `develop` branch (staging)
- `main` branch protection rules (require PR review)
- GitHub Actions workflow for:
  - Linting (ESLint, Prettier)
  - TypeScript type checking
  - Unit tests (if any)
  - Build verification
- PR template with checklist
- CODEOWNERS file for review routing
- Branch naming convention documented
- Deployment workflow to Vercel (frontend) + Railway/Fly.io (backend)
- Auto-deploy to staging on develop push
- Manual approval for production (master) deployment

**Dependencies:** T1.1 (after initial setup)

**Estimated Effort:** 2 hours

---

### T1.1 — Project Setup & Monorepo Structure

**Priority:** CRITICAL  
**Complexity:** SIMPLE  
**Phase:** 1  

**Description:**
Initialize monorepo with `/apps/frontend` and `/apps/backend` directories. Set up root `package.json` with workspaces, git hooks (husky), and linting.

**Acceptance Criteria:**
- Monorepo structure created and tested
- Root `package.json` with workspaces configured
- ESLint + Prettier configured globally
- Git hooks (pre-commit) set up
- Both frontend and backend can be developed independently
- README with setup instructions

**Dependencies:** None

**Estimated Effort:** 2 hours

---

### T1.2 — Frontend: Next.js Setup & Basic Project Structure

**Priority:** CRITICAL  
**Complexity:** MEDIUM  
**Phase:** 1  

**Description:**
Initialize Next.js project in `/apps/frontend` with TypeScript, Tailwind, Zustand, and Three.js stack. Create basic folder structure (components, pages, store, utils, hooks, 3d).

**Acceptance Criteria:**
- Next.js 14+ with TypeScript
- Tailwind CSS configured
- Zustand store setup with example store
- Three.js + React Three Fiber working
- Basic page template
- Hot reload working
- `npm run dev` starts dev server

**Dependencies:** T1.1

**Estimated Effort:** 3 hours

---

### T1.3 — Backend: Node.js + Fastify Setup

**Priority:** CRITICAL  
**Complexity:** MEDIUM  
**Phase:** 1  

**Description:**
Initialize Node.js backend in `/apps/backend` with Fastify, TypeScript, and basic folder structure (routes, services, simulation, utils, types).

**Acceptance Criteria:**
- Fastify server running on port 3001
- TypeScript compilation working
- Basic health check endpoint (`GET /health`)
- Environment variables configured (.env.example)
- Logging set up (pino or winston)
- Hot reload with nodemon
- `npm run dev` starts server

**Dependencies:** T1.1

**Estimated Effort:** 2 hours

---

### T1.4 — WebSocket Infrastructure (Frontend + Backend)

**Priority:** CRITICAL  
**Complexity:** MEDIUM  
**Phase:** 1  

**Description:**
Set up bidirectional WebSocket communication between frontend and backend. Create message types, handlers, and connection management.

**Acceptance Criteria:**
- WebSocket server running on backend
- Frontend connects to WebSocket server
- Message types defined (TypeScript interfaces)
- Connection state managed (connected/disconnected)
- Heartbeat/ping-pong implemented
- Reconnection logic with exponential backoff
- Message logging in development

**Dependencies:** T1.2, T1.3

**Estimated Effort:** 3 hours

---

### T1.5 — PostgreSQL Setup & Schema (Initial)

**Priority:** CRITICAL  
**Complexity:** MEDIUM  
**Phase:** 1  

**Description:**
Set up PostgreSQL connection pool, migrations system (using typeorm or knex), and initial schema for districts, citizens, events, and statistics.

**Acceptance Criteria:**
- Connection pool configured
- Migration system working
- Initial schema created:
  - `districts` table (id, name, x, y, population, wealth, crime, etc.)
  - `citizens` table (id, name, age, job, home_district, stress, etc.)
  - `events` table (id, type, timestamp, affected_district, description)
  - `statistics` table (id, timestamp, district_id, metric_name, value)
- Migrations can be run and rolled back
- Connection pooling tested

**Dependencies:** T1.3

**Estimated Effort:** 3 hours

---

### T1.6 — Redis Setup & Caching Layer

**Priority:** HIGH  
**Complexity:** MEDIUM  
**Phase:** 1  

**Description:**
Configure Redis connection, set up caching patterns for simulation state, and pub/sub for real-time events.

**Acceptance Criteria:**
- Redis connection established
- Cache utility functions created (get, set, delete, expire)
- Pub/sub channel structure defined
- Simulation state caching strategy
- Memory limits and eviction policies configured
- Redis CLI available for debugging

**Dependencies:** T1.3

**Estimated Effort:** 2 hours

---

### T1.7 — Simulation Loop: Tick System (Core Engine)

**Priority:** CRITICAL  
**Complexity:** COMPLEX  
**Phase:** 1  

**Description:**
Implement core tick-based simulation engine. Define tick mechanics, time scaling, pause/resume, and integration with systems.

**Acceptance Criteria:**
- Tick system processing events at configurable rate (default 1 tick/second)
- Time acceleration modes (1x, 2x, 5x, 20x, 100x)
- Pause/resume controls
- System lifecycle hooks (onTick, onUpdate, onEvent)
- Tick profiling (timing per system)
- Simulation state broadcast to frontend every tick
- Tick counter and timestamp tracking

**Dependencies:** T1.3

**Estimated Effort:** 4 hours

---

### T1.8 — 3D Viewport: Basic Three.js Scene

**Priority:** HIGH  
**Complexity:** MEDIUM  
**Phase:** 1  

**Description:**
Create basic Three.js scene with camera controls, lighting, and a simple ground plane for the city. Prepare for district visualization.

**Acceptance Criteria:**
- Three.js scene initialized
- Orthographic camera with mouse/keyboard controls (pan, zoom)
- Directional lighting + ambient light
- Ground plane (grid or flat surface)
- Camera zoom range limited
- Scene responsive to window resize
- FPS counter visible
- No console errors

**Dependencies:** T1.2

**Estimated Effort:** 2 hours

---

### T1.9 — District Graph Data Structure

**Priority:** CRITICAL  
**Complexity:** MEDIUM  
**Phase:** 1  

**Description:**
Define district system as a graph with nodes (districts) and edges (connections). Create types, utilities, and initial city generation.

**Acceptance Criteria:**
- District type defined (id, name, x, y, type, metrics object)
- Edge type defined (from, to, type: road/subway/logistics)
- City graph structure with adjacency list
- District types: residential, industrial, commercial, elite, slums, suburbs, tech hubs, financial
- Initial city generation (procedural or hardcoded)
- Utilities for neighbor lookup, distance calculation
- TypeScript types exported

**Dependencies:** T1.3

**Estimated Effort:** 2 hours

---

### T1.10 — District Metrics System

**Priority:** CRITICAL  
**Complexity:** MEDIUM  
**Phase:** 1  

**Description:**
Create system for tracking and updating district metrics. Establish baseline values, update rates, and bounds.

**Acceptance Criteria:**
- Metrics defined: population, wealth, crime, pollution, happiness, unemployment, political_leaning, traffic_density, social_tension, education, health, business_activity
- Metric update system (per tick or on-demand)
- Metric bounds (min/max ranges)
- Metric decay/growth functions
- District report generation (JSON with all metrics)
- Frontend receives metric updates via WebSocket
- Metrics persist to PostgreSQL

**Dependencies:** T1.3, T1.9

**Estimated Effort:** 2 hours

---

## PHASE 2: Core Systems

### T2.1 — Citizen AI: Agent Structure & State

**Priority:** CRITICAL  
**Complexity:** COMPLEX  
**Phase:** 2  

**Description:**
Define citizen agent type with personality, status, and state. Create agent pool and lifecycle management.

**Acceptance Criteria:**
- Citizen type defined: id, name, age, personality (traits), home_district, work_district, job, income, stress, ideology, happiness, relationships, political_alignment, memory (recent events)
- Agent lifecycle: birth, daily routines, aging, death
- Personality system: 5-10 core traits affecting behavior
- Agent pooling for performance (reuse agent objects)
- Serialization/deserialization for save states
- Frontend can query agent state
- Initial citizen population generation

**Dependencies:** T1.3, T1.9

**Estimated Effort:** 4 hours

---

### T2.2 — Daily Routines: Agent Behavior Loop

**Priority:** HIGH  
**Complexity:** COMPLEX  
**Phase:** 2  

**Description:**
Implement daily routine system for citizens. Define activities (sleep, commute, work, eat, socialize, rest) and state transitions.

**Acceptance Criteria:**
- Routine timeline: wake (6-8am), commute (8-9am), work (9am-5pm), lunch (12-1pm), commute home (5-6pm), socialize (6-7pm), rest (10pm+)
- State machine for agent actions
- Location tracking (home, work, transit, public)
- Stress generation during commute/work based on traffic/conditions
- Activity logging for analytics
- Variability in routine (not all agents follow same schedule)
- Routine affected by district conditions

**Dependencies:** T2.1

**Estimated Effort:** 3 hours

---

### T2.3 — Traffic Simulation: Road Network & Movement

**Priority:** CRITICAL  
**Complexity:** COMPLEX  
**Phase:** 2  

**Description:**
Implement traffic simulation using district graph. Model movement between districts, congestion, and traffic effects.

**Acceptance Criteria:**
- Road network based on district graph edges
- Movement cost calculation (distance + congestion)
- Queue-based traffic modeling (agents waiting at intersections)
- Congestion metrics per road/district
- Commute time calculation
- Traffic stress on agents
- Traffic visualization ready (heatmap data)
- Performance: 1000+ agents moving without frame drops

**Dependencies:** T1.7, T1.9, T2.2

**Estimated Effort:** 4 hours

---

### T2.4 — Economy: Business & Employment System

**Priority:** CRITICAL  
**Complexity:** COMPLEX  
**Phase:** 2  

**Description:**
Implement business system with creation, operation, hiring, and failure mechanics. Link to citizen employment and district wealth.

**Acceptance Criteria:**
- Business types: cafe, factory, logistics, tech startup, hospital, bank, retail, entertainment
- Business lifecycle: open, operate (hiring, revenue), fail, relocate
- Employment system: citizens have jobs, receive salaries
- Business decision-making: hire/fire based on profitability
- District wealth calculation from business activity
- Unemployment tracking
- Business relocation based on district conditions
- Economic reports per district
- Salary distribution (income inequality)

**Dependencies:** T1.10, T2.1

**Estimated Effort:** 5 hours

---

### T2.5 — Crime System: Emergence from Conditions

**Priority:** HIGH  
**Complexity:** COMPLEX  
**Phase:** 2  

**Description:**
Implement crime system where crime emerges from poverty, stress, and inequality. Create crime types and impacts.

**Acceptance Criteria:**
- Crime types: theft, organized crime, cybercrime, corruption, riots
- Crime probability based on: district poverty, unemployment, inequality, stress levels
- Police resource allocation system
- Crime impacts: business loss, citizen fear, property damage
- Crime reporting system (events)
- Police efficiency (limited resources)
- Crime trends over time
- Crime statistics per district

**Dependencies:** T1.10, T2.1, T2.4

**Estimated Effort:** 3 hours

---

### T2.6 — Media System: News & Public Opinion

**Priority:** HIGH  
**Complexity:** MEDIUM  
**Phase:** 2  

**Description:**
Generate news headlines and social media narratives. Track public opinion and sentiment.

**Acceptance Criteria:**
- News headline generation based on events (procedural or template-based)
- Trending topics tracking
- Public opinion system: citizens read news and form opinions
- Opinion influence on behavior (voting, migration, protest)
- Social media posts (citizen quotes, opinions)
- Media sentiment analysis
- Narrative influence on district metrics
- News archive/history

**Dependencies:** T2.1, T1.10

**Estimated Effort:** 3 hours

---

### T2.7 — Event System: Cascading Events & Propagation

**Priority:** CRITICAL  
**Complexity:** COMPLEX  
**Phase:** 2  

**Description:**
Implement probabilistic event system with cascade mechanics. Events affect multiple systems and propagate consequences.

**Acceptance Criteria:**
- Event types: power outage, pandemic, economic crash, protest, fire, infrastructure failure, scandal, strike, natural disaster
- Event triggering (probability-based on conditions)
- Cascade mechanics: events trigger other events
- Scope: local (district) or city-wide
- Event lifecycle: start, escalate, resolve
- Impact calculation (affected metrics, businesses, citizens)
- Event logging and history
- Frontend event notifications
- Replay system foundation

**Dependencies:** T1.7, T1.10

**Estimated Effort:** 4 hours

---

### T2.8 — Social System: Opinions, Protests, & Sentiment

**Priority:** MEDIUM  
**Complexity:** MEDIUM  
**Phase:** 2  

**Description:**
Implement social sentiment and collective behavior. Citizens form opinions and organize protests.

**Acceptance Criteria:**
- Opinion formation: citizens influenced by news, conditions, peers
- Opinion spread: social contagion mechanics
- Protest triggering: unhappiness + media + coordination
- Protest behavior: citizens gather, make noise, disperse
- Sentiment aggregation (district mood)
- Political polarization tracking
- Celebration events (positive sentiment)
- Panic/fear mechanics (negative sentiment)

**Dependencies:** T2.1, T2.6

**Estimated Effort:** 3 hours

---

## PHASE 3: Integration & Visualization

### T3.1 — District Visualization: 3D Rendering

**Priority:** CRITICAL  
**Complexity:** MEDIUM  
**Phase:** 3  

**Description:**
Render districts as 3D objects in Three.js with colors/heights representing metrics.

**Acceptance Criteria:**
- Districts rendered as cubes/boxes with height = population
- Color represents metric (wealth, crime, happiness, etc.)
- Metric color picker
- District labels
- Interactive selection (click to focus)
- Zoom to district
- Smooth color transitions
- Performance: 50+ districts rendered at 60 FPS

**Dependencies:** T1.8, T1.9

**Estimated Effort:** 2 hours

---

### T3.2 — Traffic Visualization: Movement & Heatmaps

**Priority:** HIGH  
**Complexity:** MEDIUM  
**Phase:** 3  

**Description:**
Visualize traffic flow and congestion through animated particles or heat overlays.

**Acceptance Criteria:**
- Agent movement visible on map
- Traffic density heatmap
- Road congestion visualization
- Animated flow arrows (direction of traffic)
- Toggle between detailed and aggregated view
- Performance: smooth with 1000+ agents
- Heatmap updates every tick

**Dependencies:** T2.3, T3.1

**Estimated Effort:** 3 hours

---

### T3.3 — Dashboard: Analytics & Metrics Panel

**Priority:** HIGH  
**Complexity:** MEDIUM  
**Phase:** 3  

**Description:**
Create UI dashboard showing city-wide and district-specific metrics, graphs, and trends.

**Acceptance Criteria:**
- City overview panel (total population, wealth, crime, happiness)
- District selector and detail view
- Metric charts (line/bar graphs with history)
- Time range controls (last hour, last day, etc.)
- Export data functionality
- Alerts for critical metrics (thresholds)
- Responsive design (works on different screen sizes)

**Dependencies:** T1.2, T1.10

**Estimated Effort:** 3 hours

---

### T3.4 — Live Feed: Events & News Display

**Priority:** MEDIUM  
**Complexity:** SIMPLE  
**Phase:** 3  

**Description:**
Display real-time stream of events, news, and alerts.

**Acceptance Criteria:**
- Event feed (latest first)
- News headlines
- Incident alerts
- Citizen quotes/social media posts
- Severity indicators (color coded)
- Filter by type/district
- Clickable events link to details
- Scrollable history

**Dependencies:** T2.6, T2.7

**Estimated Effort:** 2 hours

---

### T3.5 — Camera System: Multi-Level Zoom & Movement

**Priority:** HIGH  
**Complexity:** MEDIUM  
**Phase:** 3  

**Description:**
Implement smooth camera system with multiple zoom levels and focus modes.

**Acceptance Criteria:**
- Zoom levels: macro city, district, street, citizen
- Smooth camera transitions (lerp)
- Pan controls (mouse/keyboard)
- Focus on district (auto-center and zoom)
- Focus on citizen (follow agent)
- Keyboard shortcuts (1/2/3/4 for zoom levels)
- Mouse wheel for zoom
- Bounds checking (can't go outside city)

**Dependencies:** T1.8, T3.1

**Estimated Effort:** 2 hours

---

### T3.6 — Policy Control Panel: Player Interventions

**Priority:** HIGH  
**Complexity:** MEDIUM  
**Phase:** 3  

**Description:**
UI for player to control policies: taxes, budgets, police, transport, welfare.

**Acceptance Criteria:**
- Tax rate slider (0-50%)
- Police budget slider
- Transport budget slider
- Welfare program toggle
- Surveillance toggle
- Media control options
- Budget summary (revenue/spending)
- Policy impact forecast (estimated consequences)
- Policy history log
- Ability to undo recent decisions (limited)

**Dependencies:** T1.2, T2.4

**Estimated Effort:** 2 hours

---

### T3.7 — Performance Optimization: Profiling & Tuning

**Priority:** HIGH  
**Complexity:** COMPLEX  
**Phase:** 3  

**Description:**
Profile simulation and rendering, identify bottlenecks, optimize for 1000+ agents.

**Acceptance Criteria:**
- Simulation frame time < 16ms (60 FPS)
- Rendering frame time < 16ms
- Memory usage < 500MB frontend, < 1GB backend
- Agent update optimized (spatial partitioning, batch updates)
- Network bandwidth optimized (delta updates only)
- Profiling tools available (Chrome DevTools, backend flamegraph)
- Load testing with 5000+ agents
- Documented performance targets

**Dependencies:** All previous tasks

**Estimated Effort:** 4 hours

---

## PHASE 4: Polish & Release

### T4.1 — System Integration & Balancing

**Priority:** HIGH  
**Complexity:** COMPLEX  
**Phase:** 4  

**Description:**
Ensure all systems interact correctly. Tune feedback loops for emergent behavior. Test cascade mechanics.

**Acceptance Criteria:**
- All system interactions verified
- Feedback loops identified and balanced
- Cascade events observable
- No obvious exploits or softlocks
- Natural disaster chains working
- Economic collapse/recovery cycles realistic
- City feels "alive" in standard playtests
- Balance spreadsheet created

**Dependencies:** T2.1–T2.8, T3.1–T3.6

**Estimated Effort:** 5 hours

---

### T4.2 — Emergent Behavior Testing & Iteration

**Priority:** HIGH  
**Complexity:** COMPLEX  
**Phase:** 4  

**Description:**
Play-test extensively. Identify surprising behaviors. Tune systems for emergence.

**Acceptance Criteria:**
- 10+ hours playtesting completed
- Emergent behaviors documented
- At least 3 unexpected cascade chains observed
- No two cities feel identical
- Interesting scenarios arise naturally
- Player surprised by outcomes (positive)
- Balance issues identified and logged

**Dependencies:** T4.1

**Estimated Effort:** 6 hours

---

### T4.3 — Replay & Save System

**Priority:** MEDIUM  
**Complexity:** MEDIUM  
**Phase:** 4  

**Description:**
Implement city save/load and replay functionality.

**Acceptance Criteria:**
- Save city state (agents, district metrics, events, time)
- Load city state from save
- Save to PostgreSQL with metadata
- Multiple save slots
- Replay mode: watch past events in sequence
- Speed controls for replay
- Export replay data

**Dependencies:** T1.5, T1.7

**Estimated Effort:** 3 hours

---

### T4.4 — UI/UX Polish & Accessibility

**Priority:** MEDIUM  
**Complexity:** MEDIUM  
**Phase:** 4  

**Description:**
Polish UI, improve accessibility, ensure responsive design.

**Acceptance Criteria:**
- All UI elements styled consistently
- Keyboard navigation working
- Color contrast meets WCAG standards
- Mobile/tablet responsive layout
- Tooltips on all controls
- Tutorial/onboarding UX
- Settings panel (volume, graphics, language)

**Dependencies:** T3.1–T3.6

**Estimated Effort:** 3 hours

---

### T4.5 — Documentation & Deployment Prep

**Priority:** MEDIUM  
**Complexity:** SIMPLE  
**Phase:** 4  

**Description:**
Document code, API, deployment steps. Prepare for release.

**Acceptance Criteria:**
- README.md updated with features and controls
- Architecture doc created
- API documentation (WebSocket messages)
- Code comments for complex systems
- Deployment guide (Docker, env vars)
- Release notes prepared
- Known issues documented

**Dependencies:** All previous tasks

**Estimated Effort:** 3 hours

---

### T4.6 — Bug Fixes & Stability Pass

**Priority:** HIGH  
**Complexity:** MEDIUM  
**Phase:** 4  

**Description:**
Final stability pass. Fix identified bugs, memory leaks, edge cases.

**Acceptance Criteria:**
- No crashes on 12+ hour session
- Memory stable (no leaks)
- Network reconnection stable
- Save/load cycle tested 10+ times
- All UI elements functional
- Edge cases handled (empty city, max agents, etc.)
- Performance stable under load

**Dependencies:** All previous tasks

**Estimated Effort:** 4 hours

---

### T4.7 — MVP Release

**Priority:** CRITICAL  
**Complexity:** SIMPLE  
**Phase:** 4  

**Description:**
Tag and release MVP version. Publish to repository.

**Acceptance Criteria:**
- Version tagged (v0.1.0 or v1.0.0-mvp)
- Release notes published
- GitHub release created
- Demo video recorded
- Instructions for running locally
- License added

**Dependencies:** T4.1–T4.6

**Estimated Effort:** 1 hour

---

## Task Dependency Graph Summary

```txt
T1.1 (Setup)
├── T1.2 (Frontend Setup)
│   ├── T1.4 (WebSocket) → T2.1, T2.2, T2.3, etc.
│   ├── T1.8 (3D Viewport) → T3.1, T3.5
│   └── T3.3 (Dashboard)
├── T1.3 (Backend Setup)
│   ├── T1.4 (WebSocket)
│   ├── T1.5 (PostgreSQL) → T1.10, T2.4
│   ├── T1.6 (Redis)
│   ├── T1.7 (Simulation Loop) → T2.1–T2.8
│   └── T1.9 (District Graph) → T1.10, T2.1–T2.8
└── Core Systems (Phase 2): T2.1–T2.8
    └── Integration (Phase 3): T3.1–T3.6
        └── Polish (Phase 4): T4.1–T4.7
```

---

## Notes

- Tasks in Phase 1 can be parallelized where dependencies allow
- Phase 2 systems depend heavily on Phase 1 foundation
- Phase 3 integration depends on Phase 2 systems
- Phase 4 is iterative and may require returning to Phase 2/3 for tuning
- Estimated efforts are relative (story points)
- Complexity is subjective and may change during implementation

---

## Execution Order (Recommended)

1. **Week 1 (Phase 1):** T1.1 → T1.2 → T1.3 → T1.4 → T1.5 → T1.6 → T1.7 → T1.9 (parallel: T1.8, T1.10)
2. **Week 2 (Phase 2):** T2.1 → T2.2 → T2.3 → T2.4 → T2.5 → T2.6 (parallel: T2.7, T2.8)
3. **Week 3 (Phase 3):** T3.1 → T3.2 → T3.3 → T3.4 → T3.5 → T3.6 → T3.7
4. **Week 4 (Phase 4):** T4.1 → T4.2 → T4.3 → T4.4 → T4.5 → T4.6 → T4.7
