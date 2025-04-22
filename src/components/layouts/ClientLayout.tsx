
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, LayoutGrid, FileText, Settings, Home } from "lucide-react";

interface ClientLayoutProps {
  children: React.ReactNode;
  siteName: string;
}

export default function ClientLayout({ children, siteName }: ClientLayoutProps) {
  const navigate = useNavigate();
  
  // Dans une véritable application, ces données viendraient de Supabase auth
  const user = {
    name: "Jean Dupont",
    email: "jean@dupont.fr",
    avatarUrl: "",
  };

  const handleLogout = async () => {
    // Ici nous implémenterions la déconnexion avec Supabase
    navigate("/login");
  };

  return (
    <div className="client-layout">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-client-primary flex items-center justify-center text-white font-bold">
              {siteName.substring(0, 1).toUpperCase()}
            </div>
            <div className="font-medium">{siteName}</div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/client">
                <Home size={18} className="mr-2" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/client/posts">
                <FileText size={18} className="mr-2" />
                Articles
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/client/settings">
                <Settings size={18} className="mr-2" />
                Paramètres
              </Link>
            </Button>
            
            <div className="flex items-center gap-2 pl-4 border-l">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="bg-client-primary text-white">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm hidden md:block">
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-slate-500">{user.email}</div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="ml-2">
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
