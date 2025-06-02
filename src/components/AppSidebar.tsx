
import { Home, Users, FileText, Settings, BarChart3, UserCheck, LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const adminMenuItems = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Leads', url: '/leads', icon: Users },
  { title: 'Quotations', url: '/quotations', icon: FileText },
  { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  { title: 'User Management', url: '/users', icon: UserCheck },
  { title: 'Settings', url: '/settings', icon: Settings },
];

const agentMenuItems = [
  { title: 'Personal Details', url: '/agent/profile', icon: UserCheck },
  { title: 'My Leads', url: '/agent/leads', icon: Users },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get user data from localStorage (set during login)
  const [currentUser] = useState(() => {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : { name: 'Sarah Johnson', role: 'admin' };
  });

  const isAgent = currentUser.role === 'agent';
  const items = isAgent ? agentMenuItems : adminMenuItems;

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('currentUser');
    console.log('Logging out...');
    navigate('/login');
  };

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg">PestGuard Pro</h2>
            <p className="text-sm text-muted-foreground">Pest Control CRM</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className="w-full justify-start px-3 py-2 rounded-lg"
                  >
                    <button onClick={() => navigate(item.url)} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 space-y-4">
        <div className="bg-accent/50 rounded-lg p-4">
          <div className="text-sm font-medium text-foreground mb-1">
            Welcome back,
          </div>
          <div className="text-xl font-bold text-primary mb-1">
            {currentUser.name}
          </div>
          <div className="text-sm text-muted-foreground capitalize">
            {currentUser.role} Account
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:border-destructive"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
