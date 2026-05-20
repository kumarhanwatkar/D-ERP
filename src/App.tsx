import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3Provider } from "@/context/Web3Context";
import { AuthProvider } from "@/context/AuthContext";
import { RealtimeProvider } from "@/context/RealtimeContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import JoinInvitePage from "./pages/JoinInvitePage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import PayrollPage from "./pages/admin/PayrollPage";
import ResourcesPage from "./pages/admin/ResourcesPage";
import TransactionsPage from "./pages/admin/TransactionsPage";
import AIConfigPage from "./pages/admin/AIConfigPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import EmployeeEarningsPage from "./pages/employee/EmployeeEarningsPage";
import EmployeeTransactionsPage from "./pages/employee/EmployeeTransactionsPage";
import EmployeeSettingsPage from "./pages/employee/EmployeeSettingsPage";
import FeaturesPage from "./pages/FeaturesPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import SecurityPage from "./pages/SecurityPage";
import ROICalculatorPage from "./pages/ROICalculatorPage";
import UseCasesPage from "./pages/UseCasesPage";
import CompliancePage from "./pages/CompliancePage";
import NotFound from "./pages/NotFound";

// Components
import AIChat from "./components/ui/AIChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Web3Provider>
      <AuthProvider>
        <RealtimeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/connect-wallet" element={<LoginPage />} />
                <Route path="/employee/join/:inviteCode" element={<JoinInvitePage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/architecture" element={<ArchitecturePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/security" element={<SecurityPage />} />
                <Route path="/roi-calculator" element={<ROICalculatorPage />} />
                <Route path="/use-cases" element={<UseCasesPage />} />
                <Route path="/compliance" element={<CompliancePage />} />

                <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/payroll" element={<ProtectedRoute roles={["admin"]}><PayrollPage /></ProtectedRoute>} />
                <Route path="/admin/resources" element={<ProtectedRoute roles={["admin"]}><ResourcesPage /></ProtectedRoute>} />
                <Route path="/admin/transactions" element={<ProtectedRoute roles={["admin"]}><TransactionsPage /></ProtectedRoute>} />
                <Route path="/admin/ai-config" element={<ProtectedRoute roles={["admin"]}><AIConfigPage /></ProtectedRoute>} />
                <Route path="/admin/settings" element={<ProtectedRoute roles={["admin"]}><AdminSettingsPage /></ProtectedRoute>} />

                <Route path="/employee" element={<ProtectedRoute roles={["employee", "admin"]}><EmployeeDashboard /></ProtectedRoute>} />
                <Route path="/employee/earnings" element={<ProtectedRoute roles={["employee", "admin"]}><EmployeeEarningsPage /></ProtectedRoute>} />
                <Route path="/employee/transactions" element={<ProtectedRoute roles={["employee", "admin"]}><EmployeeTransactionsPage /></ProtectedRoute>} />
                <Route path="/employee/settings" element={<ProtectedRoute roles={["employee", "admin"]}><EmployeeSettingsPage /></ProtectedRoute>} />

                <Route path="*" element={<NotFound />} />
              </Routes>
              <AIChat
                onQuery={(query) => {
                  console.log('User query:', query);
                }}
              />
            </BrowserRouter>
          </TooltipProvider>
        </RealtimeProvider>
      </AuthProvider>
    </Web3Provider>
  </QueryClientProvider>
);

export default App;
