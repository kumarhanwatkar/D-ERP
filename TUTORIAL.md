# D-ERP Tutorial (Current Project Status)

This guide is updated for the current codebase and UI behavior.

It includes:
- Exact startup steps
- Exact admin and employee operating steps
- Section-by-section operations
- What is fully working vs demo-only UI behavior

## 1) Current Status Summary

D-ERP is a frontend-first React + TypeScript app with role-based dashboards, public marketing pages, wallet login flow, and a global AI chatbot.

Current implementation level:
- Public pages: navigation and content are working.
- Login and role routing: working.
- Admin and employee dashboards: working UI with many demo datasets.
- Chatbot: open/close, scroll, quick prompts, typed prompts, and simulated replies are working.
- Persistence/backend APIs: not connected yet for most sections.

## 2) Run The Project

1. Open a terminal in the project root.
2. Install dependencies:

```bash
npm install
```

3. Start dev server:

```bash
npm run dev
```

4. Open the local URL shown by Vite (usually `http://127.0.0.1:8080/` or another free port).

5. Optional checks:

```bash
npm run build
npm test
```

## 3) Route Map (What Exists Now)

### Public routes
- `/`
- `/login`
- `/features`
- `/architecture`
- `/about`
- `/pricing`
- `/how-it-works`
- `/security`
- `/roi-calculator`
- `/use-cases`
- `/compliance`

### Admin routes
- `/admin`
- `/admin/payroll`
- `/admin/resources`
- `/admin/transactions`
- `/admin/ai-config`
- `/admin/settings`

### Employee routes
- `/employee`
- `/employee/earnings`
- `/employee/transactions`
- `/employee/settings`

## 4) Login And Role Selection

## Step-by-step

1. Go to `/login`.
2. Click `Connect MetaMask`.
3. If wallet extension exists, it requests accounts and chain.
4. If wallet extension does not exist, app falls back to demo wallet mode automatically.
5. In role step, choose one:
   - `Organization Admin`
   - `Employee`
6. Click `Continue to Dashboard`.
7. App routes to:
   - Admin: `/admin`
   - Employee: `/employee`

## Notes

- Role is controlled by the selected card at login time.
- Demo users are injected by `AuthContext`.

## 5) Global Operations (All Roles)

## A) Navbar

1. Use top nav pills to move between public pages.
2. Use theme toggle (sun/moon) to switch light/dark.
3. Use account dropdown (when authenticated) to:
   - view wallet balance summary
   - open dashboard
   - logout

## B) Sidebar (Dashboard pages)

1. Use left sidebar items to open each dashboard section.
2. On desktop, collapse/expand sidebar with chevron button.
3. On mobile, use hamburger menu to open dashboard navigation.

## C) Logout

1. Click `Logout` in sidebar or navbar dropdown.
2. App clears auth and wallet context and routes to home.

## D) AI Chatbot (Floating)

1. Click floating chat button at bottom-right.
2. Chat window opens.
3. Use one of quick prompts or type your own message.
4. Press `Enter` or click send icon.
5. Assistant replies after short simulated delay.
6. Scroll behavior:
   - message area is independently scrollable
   - auto-scroll follows latest messages while near bottom
   - when scrolled up, `Jump to latest` button appears

## 6) Admin Operations (Detailed)

## 6.1 Admin Dashboard (`/admin`)

### What works
- KPI cards display demo metrics
- streaming number animation for payroll rate
- charts render and are interactive via tooltip
- payroll chart has time-range select (`Last 6 months`, `Last year`)
- transparency dashboard renders and can toggle live/paused
- copy transaction hash works in transparency panel
- external BscScan links in transparency panel work

### Steps

1. Open `/admin`.
2. Review top KPI cards.
3. In `Payroll Overview`, change range using the select box.
4. Hover charts to inspect tooltip values.
5. In `Recent Transactions`, click `View all` (currently visual only, no route action).
6. In `Blockchain Transparency Dashboard`:
   - toggle `Live` / `Paused`
   - copy hash using copy icon
   - open transaction link in BscScan using external-link icon

## 6.2 Payroll (`/admin/payroll`)

### Working operations
- search by name or department
- filter by status (`All`, `Active`, `Paused`, `Completed`)
- table updates live based on filter/search

### Present but currently UI-only
- `Export` button
- `Add Employee` button
- row action buttons (`Pause`, `Play`, `More`)

### Steps

1. Open `/admin/payroll`.
2. Use search input to find employee.
3. Use status dropdown to filter table.
4. Review employee details: department, wallet, rate, hours, earned, status.
5. Click row action icons if needed (currently no persisted state change).

## 6.3 Resources (`/admin/resources`)

### Working operations
- search resources
- filter by resource type (`All`, `Machines`, `Servers`, `Equipment`)
- card grid updates from filter/search

### Present but currently UI-only
- `Add Resource` button
- card `More` menu button

### Steps

1. Open `/admin/resources`.
2. Search resource by name or department.
3. Filter by type from dropdown.
4. Review each card:
   - status
   - utilization bar
   - efficiency
   - last maintenance date

## 6.4 Transactions (`/admin/transactions`)

### Working operations
- search by hash/address text
- filter by type
- copy full tx hash to clipboard
- open BscScan tx link

### Present but currently UI-only
- `Export CSV` button

### Steps

1. Open `/admin/transactions`.
2. Use search to locate hash/address.
3. Use type filter to narrow table.
4. Click copy icon to copy tx hash.
5. Click external-link icon to open tx on BscScan testnet.

## 6.5 AI Config (`/admin/ai-config`)

### Working operations
- prompt text input
- example prompt chips populate textarea
- `Generate Dashboard` runs simulated generation
- generated JSON is shown
- `Copy` copies generated JSON
- widget preview list appears
- `Apply to Dashboard` shows confirmation alert

### Steps

1. Open `/admin/ai-config`.
2. Enter org description or click one example chip.
3. Click `Generate Dashboard`.
4. Wait for generation.
5. Review JSON config and widget preview.
6. Click `Copy` to copy JSON if needed.
7. Click `Apply to Dashboard` to apply simulated config (alert message).

## 6.6 Admin Settings (`/admin/settings`)

### Working operations
- edit organization name input
- toggle `Require manual payroll approval`
- toggle `Email alerts for failed transactions`
- risk profile selection in `RiskControlPanel`
- risk profile detail panel updates per selection

### Present but currently UI-only
- `Save Changes` button
- `Confirm Risk Level` button

### Steps

1. Open `/admin/settings`.
2. Update `Organization Name` field.
3. Toggle payroll approval and email alert checkboxes.
4. In risk panel, choose profile:
   - Conservative
   - Balanced
   - Aggressive
5. Review expected APY and strategy features.
6. Click `Confirm Risk Level` (UI flow only).
7. Click `Save Changes` (UI flow only).

## 7) Employee Operations (Detailed)

## 7.1 Employee Dashboard (`/employee`)

### What works
- live streaming earnings number animation
- weekly earnings chart with tooltip
- transaction summary list
- `View all` link routes to `/employee/transactions`

### Steps

1. Open `/employee`.
2. Check streaming earnings card (`Payroll Streaming Active`).
3. Review wallet/month figures and KPI cards.
4. Hover weekly chart for daily values.
5. In transaction card, click `View all` to open full list.
6. Review yield status card and lock-period progress.

## 7.2 Earnings (`/employee/earnings`)

### What works
- summary cards render from demo values
- weekly area chart renders with tooltip

### Steps

1. Open `/employee/earnings`.
2. Read summary cards: week total, growth, hourly rate, projection.
3. Hover chart points to inspect exact values.

## 7.3 Employee Transactions (`/employee/transactions`)

### What works
- table and status badges render

### Present but currently UI-only
- hash external-link anchors currently use `#` placeholder (no explorer navigation)

### Steps

1. Open `/employee/transactions`.
2. Review transaction rows and statuses.
3. Use hash column as reference (link is placeholder in current build).

## 7.4 Employee Settings (`/employee/settings`)

### Working operations
- toggle `Salary notifications`
- toggle `Auto-lock after payout`
- fund allocation presets
- allocation slider updates locked/accessible split
- yield estimate updates dynamically

### Present but currently UI-only
- `Save Preferences` button
- `Save Allocation` button

### Steps

1. Open `/employee/settings`.
2. Review profile read-only fields.
3. Toggle preferences checkboxes as needed.
4. In `Fund Allocation Control`:
   - use slider to set locked percentage
   - or click preset buttons
5. Review updated monthly estimate panel.
6. Click `Save Allocation` (UI flow only).
7. Click `Save Preferences` (UI flow only).

## 8) Public Pages And Their Operations

Public pages are mostly informational in current build, with navigation and CTA links.

## `/` Landing

1. Use `Start for Free` to open login.
2. Use `Calculate Your ROI` to open calculator.
3. Use footer quick links for product/learn/legal pages.

## `/pricing`

1. Review pricing cards and fee table.
2. Use plan CTA buttons (UI-focused marketing actions).

## `/how-it-works`

1. Read step cards and workflow timeline.
2. Use CTA buttons in final section (primarily UI/marketing).

## `/security`

1. Review security architecture/risk content.
2. Use support/legal action buttons (currently informational UI actions).

## `/roi-calculator`

### Working operations
- input fields update calculations live
- sliders update APY and bank rate assumptions
- charts and table recompute dynamically

### Steps

1. Set annual salary.
2. Set number of employees.
3. Set time period in months.
4. Adjust DERP APY slider.
5. Adjust bank-rate slider.
6. Review:
   - total payroll
   - yield generated
   - platform fees
   - net savings vs bank
   - monthly projection chart

## `/use-cases`

1. Browse industry use-case cards and examples.
2. Use CTA buttons for conversion flow.

## `/features`

1. Review feature groups and implementation highlights.
2. Navigate to next page via navbar/CTAs.

## `/architecture`

1. Review architecture and platform design description.
2. Use navbar to move to related pages.

## `/compliance`

### Working operations
- expandable compliance sections (accordion-like behavior)

### Steps

1. Click a compliance section card to expand it.
2. Click it again to collapse.
3. Read regional considerations cards.
4. Use support CTA button (UI only in current build).

## `/about`

1. Review project background, goals, and context.
2. Navigate to other pages via navbar.

## 9) Chatbot Full Operation Checklist

Use this checklist to verify all chatbot operations quickly.

1. Open any page.
2. Click floating chatbot button.
3. Confirm panel opens with assistant intro message.
4. Scroll inside message area.
5. Click one quick prompt (for example `Optimize payroll`).
6. Wait for assistant reply.
7. Type a custom message and press `Enter`.
8. Confirm fallback assistant response appears.
9. Scroll upward in message history.
10. Confirm `Jump to latest` appears.
11. Click `Jump to latest` and verify it returns to bottom.
12. Close chat using `X` button.
13. Re-open chat and confirm message history remains in current session state.

## 10) What Is Demo vs Production-Ready Right Now

## Working well now
- Routing and role-based UI structure
- Wallet connect flow with fallback demo mode
- Chatbot interaction and scroll mechanics
- Interactive calculations/charts in multiple pages
- Search/filter/copy interactions where implemented

## Not yet backend-persisted
- Most `Save`, `Add`, `Export`, and row action buttons
- Many admin/employee table edits
- Employee transaction explorer links
- Long-term data persistence for changed settings

## 11) Troubleshooting

## App does not start

1. Run `npm install`.
2. Run `npm run dev`.
3. If port is busy, use the new port shown by Vite.

## Chatbot looks stuck

1. Close and reopen chat.
2. Send a quick prompt first.
3. Ensure you are scrolling inside the chat panel area (not the page).

## Wallet not available

1. Install/enable MetaMask.
2. Refresh page.
3. If still unavailable, demo fallback mode is used for local development.

## 12) Suggested Next Implementation Steps (Optional)

1. Connect admin/employee actions to real backend APIs.
2. Persist settings and payroll/resource edits.
3. Replace placeholder links/buttons with real operations.
4. Add notifications/toasts for all state-changing actions.
5. Add end-to-end tests for each section flow.
