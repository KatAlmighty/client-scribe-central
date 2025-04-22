
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50">
      <div className="text-center max-w-md p-6">
        <div className="text-8xl font-bold text-brand mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">Page non trouvée</h1>
        <p className="text-slate-600 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Button asChild>
          <Link to="/login">
            <Home size={16} className="mr-2" />
            Retourner à l'accueil
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
