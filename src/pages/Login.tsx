import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Dans une véritable application, nous utiliserions Supabase Auth
      // const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      // Simulation de connexion
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulation d'un succès de connexion
      // Dans un vrai cas, nous vérifierions le rôle de l'utilisateur pour rediriger vers /admin ou /client

      // Pour cette démo, on vérifie manuellement
      if (email.includes("admin") || email.includes("agence")) {
        navigate("/admin");
      } else {
        navigate("/client");
      }
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe invalide",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Connexion</h1>
          <p className="text-slate-500">Entrez vos identifiants pour vous connecter</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mot de passe</Label>
              <a href="#" className="text-sm text-brand hover:underline">
                Mot de passe oublié?
              </a>
            </div>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </form>
        
        <div className="text-center text-sm">
          <span className="text-slate-500">Pour créer un compte, vous devez d'abord avoir reçu une invitation</span>
          <a href="/invitation" className="text-brand hover:underline"></a>
        </div>
      </div>
    </AuthLayout>;
}