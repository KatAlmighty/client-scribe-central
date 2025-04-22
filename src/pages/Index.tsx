
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Rediriger vers la page de login
    navigate("/login");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Redirection...</h1>
        <p className="text-xl text-slate-600">Vous allez être redirigé vers la page de connexion</p>
      </div>
    </div>
  );
};

export default Index;
