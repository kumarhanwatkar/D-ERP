import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3Provider } from "@/context/Web3Context";
import { AuthProvider } from "@/context/AuthContext";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import PayrollPage from "./pages/admin/PayrollPage";
import ResourcesPage from "./pages/admin/ResourcesPage";
import TransactionsPage from "./pages/admin/TransactionsPage";
import AIConfigPage from "./pages/admin/AIConfigPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Web3Provider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/payroll" element={<PayrollPage />} />
              <Route path="/admin/resources" element={<ResourcesPage />} />
              <Route path="/admin/transactions" element={<TransactionsPage />} />
              <Route path="/admin/ai-config" element={<AIConfigPage />} />
              
              {/* Employee Routes */}
              <Route path="/employee" element={<EmployeeDashboard />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </Web3Provider>
  </QueryClientProvider>
);

export default App;
