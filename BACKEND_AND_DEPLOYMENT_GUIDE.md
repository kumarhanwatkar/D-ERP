# D-ERP Backend And Deployment Guide

This guide explains how the current frontend connects to the backend, where the sample database is stored, and how to publish the project using free services only.

## 1) Current Architecture

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express
- Database: file-backed JSON sample database
- Database: seeded enterprise JSON store locally; Atlas-ready via `MONGO_URI`
- Local API path: `/api/*`
- Development proxy: Vite forwards `/api` calls to `http://127.0.0.1:3001`
- Authentication: JWT with role-based route protection
- Realtime: Socket.io broadcasts for payroll, resource, settings, and dashboard updates

The backend provides demo data and working endpoints for:
- login
- chatbot replies
- admin dashboard data
- payroll controls
- resources
- blockchain transactions
- AI dashboard generation
- admin settings
- employee dashboard/settings

## 2) Where The Sample Data Is Stored

The sample database is stored here:

- [backend/data/derp.json](backend/data/derp.json)

That file contains:
- users
- payroll entries
- resources
- transactions
- admin settings
- employee settings
- saved AI configs

If you edit the JSON file, the backend will immediately use the new sample data.

## 3) How Frontend Connects To Backend

The frontend uses a small API helper at:

- [src/lib/backendApi.ts](src/lib/backendApi.ts)

That helper sends requests to `/api/...`.

For local development, Vite proxy is configured in:

- [vite.config.ts](vite.config.ts)

This means:
- frontend runs on port `8080`
- backend runs on port `3001`
- frontend requests like `/api/chat/respond` are forwarded to the backend automatically

## 4) Local Development Steps

### Backend

1. Open a terminal.
2. Go to the backend folder:

```bash
cd backend
```

3. Start the backend:

```bash
npm run start
```

4. Backend should run on:

```text
http://127.0.0.1:3001
```

5. Seed the enterprise dataset when you need a fresh database:

```bash
npm run seed
```

### Frontend

1. Open another terminal.
2. Go to the project root.
3. Start the frontend:

```bash
npm run dev
```

4. Open the Vite URL shown in terminal, usually:

```text
http://127.0.0.1:8081
```

The login flow now stores a JWT in localStorage and attaches it to API requests automatically.

### Run checks

```bash
npm run build
npm test
```

## 5) Required Accounts For Publishing

For a no-cost or low-cost public demo, you should create:

1. A GitHub account
2. A hosting account for the frontend, such as GitHub Pages, Vercel, or Netlify
3. A hosting account for the backend, such as Render, Railway, or another free-tier Node host

Optional, only if you want a real persistent database:

4. A free database account such as Supabase or Neon

For the current codebase, MongoDB Atlas is the intended free-tier path. If you want that path, create:

5. A MongoDB Atlas free cluster and connection string
6. A long random `JWT_SECRET`
7. Optional `VITE_SOCKET_URL` and `CORS_ORIGIN` values if frontend and backend are deployed separately

## 6) Recommended No-Cost Publishing Strategy

### Option A: Simplest demo publish

- Frontend on GitHub Pages, Vercel, or Netlify
- Backend on a free Node host
- Sample database committed in GitHub repository

This is the easiest route if you want to publish quickly.

### Option B: Full public app with backend

- Frontend on Vercel or Netlify
- Backend on Render or similar free Node host
- Sample database stored in `backend/data/derp.json`
- Optional real database later if you need persistence

## 7) GitHub Publishing Steps

1. Create a GitHub repository.
2. Push this project to GitHub.
3. Commit the backend folder, frontend folder, blockchain scaffold, and deployment config files.
4. Make sure `backend/data/derp.json` is included in the repo so the free demo has sample data immediately.
5. Add the free deployment config files already included in this repo: [render.yaml](render.yaml) and [vercel.json](vercel.json).
6. Set `VITE_API_BASE_URL` to your Render backend URL after you deploy the backend.

## 8) Deployment Steps For Backend

1. Create a free MongoDB Atlas M0 cluster.
2. Create a database user and whitelist your current IP address.
3. Copy the Atlas connection string and replace the password placeholder.
4. Set the backend environment variables in Render: `MONGO_URI`, `JWT_SECRET`, `CORS_ORIGIN`, and optionally `ALLOW_DEMO_LOGIN`.
5. Choose Render as the free Node host and connect your GitHub repository.
6. Set the backend root folder to `backend`.
7. Use the start command from [render.yaml](render.yaml):

```bash
npm run start
```

8. Seed the database after the first deploy by running the backend seed command from Render Shell or locally with the same `MONGO_URI`.

9. Deploy.

## 9) Deployment Steps For Frontend

1. Choose Vercel as the free frontend host.
2. Connect the same GitHub repository.
3. Leave the project root at the repo root.
4. Build the app using:

```bash
npm run build
```

5. Add `VITE_API_BASE_URL=https://your-render-backend-url/api` as a Vercel environment variable.
6. If the backend is hosted elsewhere, also add `VITE_SOCKET_URL=https://your-render-backend-url`.
7. Deploy.

If you keep backend and frontend on the same domain, you can continue using `/api`.

## 10) How To Update Sample Data

1. Open [backend/data/derp.json](backend/data/derp.json).
2. Edit users, payroll entries, transactions, resources, or settings.
3. Save the file.
4. Restart the backend if needed.

### Important storage note

- The backend supports a free JSON seed mode locally and a MongoDB Atlas mode in production.
- Use JSON for quick local demos and Atlas for a persistent free-tier cloud database.
- If you later need a more normalized model, split the current `AppState` document into dedicated collections.

## 11) Endpoint Overview

### Public and bootstrap

- `GET /api/health`
- `GET /api/bootstrap`

### Login and chatbot

- `POST /api/auth/login`
- `GET /api/auth/demo-users`
- `POST /api/chat/respond`
- `GET /api/chat/suggestions`

### Admin

- `GET /api/admin/dashboard`
- `GET /api/admin/payroll`
- `PATCH /api/admin/payroll/:id`
- `PATCH /api/admin/payroll/:id/status`
- `GET /api/admin/resources`
- `PATCH /api/admin/resources/:id`
- `GET /api/admin/transactions`
- `GET /api/admin/settings`
- `PATCH /api/admin/settings`
- `POST /api/admin/ai-config/generate`
- `GET /api/admin/ai-configs`
- `POST /api/admin/ai-configs`

### Employee

- `GET /api/employee/dashboard/:userId`
- `GET /api/employee/earnings/:userId`
- `GET /api/employee/transactions/:userId`
- `GET /api/employee/settings/:userId`
- `PATCH /api/employee/settings/:userId`

## 12) What Still Uses Demo Data In The Frontend

The project is now connected to a real backend for the main interactive actions, but some UI sections may still use in-memory/demo rendering patterns until you decide to fully convert them to API-driven state.

Good next candidates for full backend binding:
- Admin dashboard charts
- Employee dashboard charts
- Public marketing metrics
- Onboarding wizard persistence

## 13) Troubleshooting

### Backend does not respond

1. Check that `backend` server is running.
2. Confirm port `3001` is free.
3. Open `http://127.0.0.1:3001/api/health`.

### Frontend cannot reach backend

1. Confirm Vite is running on `8080`.
2. Confirm the proxy exists in [vite.config.ts](vite.config.ts).
3. Restart both frontend and backend.

### Data does not update

1. Confirm you edited [backend/data/derp.json](backend/data/derp.json).
2. Restart backend.
3. Refresh the browser.
