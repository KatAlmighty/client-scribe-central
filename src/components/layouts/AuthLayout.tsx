
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Partie visuelle (gauche ou en haut sur mobile) */}
      <div className="bg-brand-50 flex-1 flex items-center justify-center p-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded bg-brand flex items-center justify-center text-white font-bold">
              SC
            </div>
            <h1 className="text-2xl font-bold text-slate-900">ScribeCentral</h1>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Simplifiez la gestion de contenu pour vos clients
          </h2>
          <p className="text-slate-700 mb-8">
            Une interface simple pour vos clients, un back-office puissant pour vous.
            Gérez tous vos sites clients depuis une seule plateforme.
          </p>
          <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-2">✨ Avec ScribeCentral</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 text-green-600 p-1 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-sm">Vos clients peuvent publier facilement sans se perdre</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 text-green-600 p-1 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-sm">Gérez tous vos sites depuis une interface unique</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 text-green-600 p-1 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-sm">SEO optimisé automatiquement pour chaque page</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Partie formulaire (droite ou en bas sur mobile) */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
