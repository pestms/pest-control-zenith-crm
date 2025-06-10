import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Quotations from "./pages/Quotations";
import Analytics from "./pages/Analytics";
import UserManagement from "./pages/UserManagement";
import UserDetails from "./pages/UserDetails";
import ServicesManagement from "./pages/ServicesManagement";
import AgentProfile from "./pages/AgentProfile";
import AgentLeads from "./pages/AgentLeads";
import SalesProfile from "./pages/SalesProfile";
import SalesLeads from "./pages/SalesLeads";
import SalesQuotations from "./pages/SalesQuotations";
import Schedule from "./pages/Schedule";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [location.pathname]);

  // If on login page or not authenticated, show login
  if (location.pathname === "/login") {
    return <Login />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {isAuthenticated && <AppSidebar />}
        <main className="flex-1">
          <div className="p-6">
            {isAuthenticated && (
              <div className="mb-4">
                <SidebarTrigger className="mb-4" />
              </div>
            )}
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/quotations" element={<Quotations />} />
              <Route path="/services" element={<ServicesManagement />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/users/:userId" element={<UserDetails />} />
              <Route path="/agent/profile" element={<AgentProfile />} />
              <Route path="/agent/leads" element={<AgentLeads />} />
              <Route path="/sales/profile" element={<SalesProfile />} />
              <Route path="/sales/leads" element={<SalesLeads />} />
              <Route path="/sales/quotations" element={<SalesQuotations />} />
              <Route path="/sales/schedule" element={<Schedule />} />
              <Route path="/login" element={<Login />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
