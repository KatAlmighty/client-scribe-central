
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, LayoutGrid, FileText, Settings, Users, Globe } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  
  // Dans une véritable application, ces données viendraient de Supabase auth
  const user = {
    name: "Sophie Martin",
    email: "sophie@agence.com",
    avatarUrl: "",
  };

  const handleLogout = async () => {
    // Ici nous implémenterions la déconnexion avec Supabase
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-brand flex items-center justify-center text-white font-bold">
                SC
              </div>
              <div className="font-semibold text-lg">ScribeCentral</div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-3 py-4">
            <nav className="space-y-1">
              <Link to="/admin" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100">
                <LayoutGrid size={20} /> 
                <span>Tableau de bord</span>
              </Link>
              <Link to="/admin/sites" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100">
                <Globe size={20} />
                <span>Sites</span>
              </Link>
              <Link to="/admin/pages" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100">
                <FileText size={20} />
                <span>Pages</span>
              </Link>
              <Link to="/admin/users" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100">
                <Users size={20} />
                <span>Utilisateurs</span>
              </Link>
              <Link to="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100">
                <Settings size={20} />
                <span>Paramètres</span>
              </Link>
            </nav>
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback className="bg-brand text-white">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut size={18} />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 p-6 ml-64">
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}
