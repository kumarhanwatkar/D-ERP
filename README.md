# D-ERP - Decentralized Enterprise Resource Planning

Real-time payroll, yield tracking, and blockchain-inspired ERP dashboards.

## What’s included

- React + Vite frontend with public marketing pages and protected admin/employee areas
- Node.js + Express backend with JWT auth, invite flow, and realtime Socket.io updates
- Atlas-ready persistence with local JSON fallback for free local development
- Blockchain scaffold for payroll stream simulation and future contract deployment

## Run locally

```sh
npm i
npm run dev
```

Backend:

```sh
cd backend
npm i
npm run seed
npm run start
```

## Key docs

- [BACKEND_AND_DEPLOYMENT_GUIDE.md](BACKEND_AND_DEPLOYMENT_GUIDE.md)
- [TUTORIAL.md](TUTORIAL.md)
- [COMPLETION_REPORT.md](COMPLETION_REPORT.md)

## Deployment

- Frontend: Vercel via [vercel.json](vercel.json)
- Backend: Render via [render.yaml](render.yaml)
- Database: MongoDB Atlas free tier, or local JSON seed data for development
  - "Show employee stats" → Department breakdowns
  - "Calculate ROI" → Financial projections
  - "Compare departments" → Performance metrics
- **Onboarding Wizard** - 5-step guided setup (role, organization, risk profile, notifications)

## 📊 Project Stats

| Metric | Value |
|--------|-------|
| React Components | 19+ |
| UI Components | shadcn/ui + 6 custom |
| Public Pages | 6 |
| Admin Pages | 6 |
| Employee Pages | 4 |
| TypeScript Files | 50+ |
| Build Time | ~19s |
| Bundle Size | 1.05 MB (295 KB gzipped) |
| Dev Server | Vite 5.4.19 |
| Status | ✅ Production Ready |

## 🏗️ Architecture
# D-ERP — Project Guide

This single-guide README replaces older standalone docs. It explains the tech stack, how the project works, how to run it locally, deploy, and key implementation and runtime notes. No code was changed.

---

## Quick Summary
- Full-stack demo application:
  - Frontend: React (TypeScript) + Vite + TailwindCSS
  - Backend: Node.js (ESM) + Express + Socket.io
  - Auth: Web3 (MetaMask nonce + signature) + JWT
  - Persistence: MongoDB Atlas (production) with a local JSON fallback (`backend/data/derp.json`)
  - Realtime: Socket.io for live updates between admin and employees

## What’s in this repo
- `src/` — Frontend app (Vite + React + TypeScript)
- `backend/` — Backend server (Express) with routes and seed data
- `backend/data/derp.json` — Local JSON seed used for local development
- `render.yaml` — Render deployment definition for backend
- `vercel.json` — Vercel rewrite config for frontend SPA

## How the system works (high level)
1. Frontend connects to backend API endpoints under `/api/*`. In production, `VITE_API_BASE_URL` points to the Render backend URL.
2. Authentication uses a nonce flow:
   - Client requests a nonce (`POST /api/auth/request-nonce`) for a wallet address.
   - The wallet owner signs the nonce in their Web3 wallet (MetaMask).
   - Client submits signature (`POST /api/auth/verify-signature`) which the backend verifies using `ethers`.
   - On success, backend issues a JWT (`jsonwebtoken`) that the frontend stores and sends on subsequent requests.
3. Realtime: Socket.io is attached to the backend HTTP server and uses the same CORS origin rules as the API. The frontend connects using `VITE_SOCKET_URL`.
4. Persistence: If `MONGO_URI` is set (production), the backend uses MongoDB via Mongoose. If not or if Mongo is unreachable, the backend now falls back to `backend/data/derp.json` so the app remains functional for demos.

## Environment variables (most important)
- Backend (Render):
  - `MONGO_URI` — MongoDB Atlas connection string (optional; when absent or failing, local JSON fallback is used)
  - `MONGO_DB_NAME` — database name (default: `derp`)
  - `JWT_SECRET` — long secret for signing JWTs (required for secure production)
  - `ALLOW_DEMO_LOGIN` — `false` in production (when `true`, demo fallback allows sign-in without real wallets)
  - `CORS_ORIGIN` — frontend origin (e.g., `https://your-frontend.vercel.app`)
  - `SOCKET_CORS_ORIGIN` — allowed origin for socket connections
  - `CHAIN_ID`, `RPC_URL` — optional blockchain network settings used by sample features
- Frontend (Vercel):
  - `VITE_API_BASE_URL` — `https://<render-backend>/api`
  - `VITE_SOCKET_URL` — `https://<render-backend>`

## Run locally (development)
1. Install deps and start frontend:
```bash
npm install
npm run dev
```
2. Backend in separate terminal:
```bash
cd backend
npm install
npm run seed    # populate backend/data/derp.json
npm run start
```
3. Open the frontend URL shown by Vite (usually `http://127.0.0.1:8081`) and use the login page. If MetaMask isn't available, set `ALLOW_DEMO_LOGIN=true` locally for demo sign-ins.

## Seed and production setup
- Seed locally with `npm run seed` (in `backend/`).
- For production, create a MongoDB Atlas cluster and set `MONGO_URI` on Render. After deployment, run the seed command with the same `MONGO_URI` (Render shell or locally) to populate the Atlas database.

## Deployment notes
- Backend: Render service uses `backend` as root and `npm start` as the start command. Use `render.yaml` to configure env vars; Render will assign a dynamic port and set `PORT` automatically.
- Frontend: Vercel project uses `npm run build` with `dist` output. Set `VITE_API_BASE_URL` and `VITE_SOCKET_URL` in Vercel environment settings.

## Real-time behavior details
- Socket.io emits updates on payroll/resource changes. Admin actions trigger server-side events that broadcast to connected clients.
- The backend attaches `socket.io` to the same HTTP server that serves API endpoints.

## Key files to inspect (implementation pointers)
- `backend/src/routes/auth.js` — Web3 nonce/signature and JWT issuance flow
- `backend/src/lib/store.js` — data access layer; handles JSON fallback and Mongo persistence
- `backend/src/lib/mongoStore.js` — Mongoose connection, AppState model
- `src/lib/backendApi.ts` — client API wrapper that reads `VITE_API_BASE_URL`
- `src/context/AuthContext.tsx` — token storage and auth helpers
- `src/context/RealtimeContext.tsx` — Socket.io connection logic

## Troubleshooting & quick checks
- Backend health: `GET /api/health`
- Bootstrap data: `GET /api/bootstrap` (returns seed data and dashboard payloads)
- Nonce: `POST /api/auth/request-nonce` with `{ "walletAddress": "0x..." }`
- If you encounter 500s on auth routes, check `MONGO_URI`, `JWT_SECRET`, and Render logs.

## Safety & production recommendations
- Rotate MongoDB user password and keep it out of Git.
- Use a long `JWT_SECRET` and mark it as secret in Render.
- Set `ALLOW_DEMO_LOGIN=false` in production.
- Enable backup for Atlas and enable monitoring/logging on Render.

---

If you want any sections expanded (deploy screenshots, a minimal diagram, or a short video script for testing), tell me which and I’ll add it to this single guide.

