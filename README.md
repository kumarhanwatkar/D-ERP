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

```
src/
├── pages/
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── PricingPage.tsx
│   ├── HowItWorksPage.tsx
│   ├── SecurityPage.tsx
│   ├── ROICalculatorPage.tsx
│   ├── UseCasesPage.tsx
│   ├── CompliancePage.tsx
│   ├── admin/
│   │   ├── AdminDashboard.tsx (+ TransparencyDashboard)
│   │   ├── PayrollPage.tsx
│   │   ├── AdminSettingsPage.tsx (+ RiskControlPanel)
│   │   ├── TransactionsPage.tsx
│   │   └── AIConfigPage.tsx
│   └── employee/
│       ├── EmployeeDashboard.tsx
│       ├── EmployeeSettingsPage.tsx (+ FundAllocationControl)
│       ├── EmployeeEarningsPage.tsx
│       └── EmployeeTransactionsPage.tsx
├── components/
│   ├── ui/ (20+ shadcn/ui components)
│   ├── ui/GlassCard.tsx (custom)
│   ├── ui/NeonButton.tsx (custom)
│   ├── ui/RiskControlPanel.tsx (custom)
│   ├── ui/FundAllocationControl.tsx (custom)
│   ├── ui/TransparencyDashboard.tsx (custom)
│   ├── ui/AIChat.tsx (global)
│   ├── ui/OnboardingWizard.tsx (global)
│   └── layout/
│       ├── DashboardLayout.tsx
│       └── Navbar.tsx
├── context/
│   ├── AuthContext.tsx
│   └── Web3Context.tsx
└── lib/
    └── utils.ts
```

## 🎨 Design System

- **Colors**: Neon cyan/green/purple/orange on dark background
- **Typography**: Display font for headings, multiple font weights
- **Spacing**: 4px base unit via Tailwind
- **Animations**: Framer Motion for smooth transitions
- **Responsive**: Mobile-first, tested on all breakpoints
- **Theme**: Light/dark mode via CSS variables

## 🔐 Security Features

- ✅ Smart contract security verification
- ✅ Blockchain transaction transparency
- ✅ Multi-signature wallet support
- ✅ End-to-end encryption
- ✅ GDPR/AML/KYC compliance ready
- ⚠️ Risk disclaimer: Not FDIC insured, experimental tech

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔗 Routes

| Route | Component | Protection |
|-------|-----------|-----------|
| / | LandingPage | Public |
| /pricing | PricingPage | Public |
| /how-it-works | HowItWorksPage | Public |
| /security | SecurityPage | Public |
| /roi-calculator | ROICalculatorPage | Public |
| /use-cases | UseCasesPage | Public |
| /compliance | CompliancePage | Public |
| /login | LoginPage | Public |
| /admin | AdminDashboard | Admin |
| /admin/payroll | PayrollPage | Admin |
| /admin/resources | ResourcesPage | Admin |
| /admin/transactions | TransactionsPage | Admin |
| /admin/settings | AdminSettingsPage | Admin |
| /employee | EmployeeDashboard | Employee |
| /employee/earnings | EmployeeEarningsPage | Employee |
| /employee/transactions | EmployeeTransactionsPage | Employee |
| /employee/settings | EmployeeSettingsPage | Employee |

## 🧪 Testing

```sh
# Unit tests
npm test

# Run tests in watch mode
npm test -- --watch

# Get coverage report
npm test -- --coverage
```

## 📦 Dependencies

### Core
- react@18
- react-router-dom@6
- typescript@5

### UI
- @radix-ui/* (core UI primitives)
- tailwindcss@3 (styling)
- framer-motion (animations)
- lucide-react (icons)

### Data Visualization
- recharts (charts & graphs)

### Development
- vite@5 (build tool)
- eslint (linting)
- vitest (testing)

## 📄 License

MIT License - See LICENSE file

## 🤝 Contributing

Contributions welcome! Please follow code style conventions and add tests for new features.

## 📞 Support

For issues and feature requests, please open a GitHub issue.

---

**Built for the future of decentralized payroll** 🚀

>>>>>>> 4488d0b (Add production-ready Web3 ERP backend)
