
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages d'authentification
import Login from "@/pages/Login";

// Pages Admin
import AdminDashboard from "@/pages/admin/Dashboard";
import Sites from "@/pages/admin/Sites";
import SiteDetail from "@/pages/admin/SiteDetail";

// Pages Client
import ClientDashboard from "@/pages/client/Dashboard";
import ClientPosts from "@/pages/client/Posts";
import PostEditor from "@/pages/client/PostEditor";

// Page 404
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} /> {/* Rediriger la racine vers login */}
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/sites" element={<Sites />} />
          <Route path="/admin/sites/:siteId" element={<SiteDetail />} />
          
          {/* Client routes */}
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/client/posts" element={<ClientPosts />} />
          <Route path="/client/posts/:postId" element={<PostEditor />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
