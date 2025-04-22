
import React from "react";
import { Link } from "react-router-dom";
import ClientLayout from "@/components/layouts/ClientLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Edit, TrendingUp } from "lucide-react";

export default function ClientDashboard() {
  // Dans une app réelle, nous chargerions les données du site avec React Query
  const site = {
    name: "Café des Artistes",
    description: "Café & espace culturel au cœur de Paris",
  };
  
  // Données fictives pour la démo
  const stats = {
    totalPosts: 8,
    publishedPosts: 5,
    draftPosts: 3,
    totalViews: 2457,
    thisMonthViews: 342,
  };
  
  const recentPosts = [
    { id: "1", title: "Nouveaux ateliers créatifs pour enfants", published: true, views: 187, date: "2023-04-15" },
    { id: "2", title: "Exposition photo du mois de mai", published: true, views: 124, date: "2023-04-10" },
    { id: "3", title: "Concert acoustique: programmation été 2023", published: false, views: 0, date: "2023-04-05" },
  ];

  return (
    <ClientLayout siteName={site.name}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1>Tableau de bord</h1>
            <p className="text-slate-500">{site.description}</p>
          </div>
          <Button asChild>
            <Link to="/client/posts/new">
              <Plus size={16} className="mr-1" />
              Nouvel article
            </Link>
          </Button>
        </div>
        
        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-slate-500">Total des articles</span>
                <span className="text-3xl font-bold">{stats.totalPosts}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-slate-500">Articles publiés</span>
                <span className="text-3xl font-bold">{stats.publishedPosts}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-slate-500">Brouillons</span>
                <span className="text-3xl font-bold">{stats.draftPosts}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-slate-500">Vues totales</span>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">{stats.totalViews}</span>
                  <span className="text-xs text-green-600 flex items-center mb-1">
                    <TrendingUp size={12} className="mr-0.5" />
                    +{stats.thisMonthViews} ce mois
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Articles récents */}
        <Card>
          <CardHeader>
            <CardTitle>Articles récents</CardTitle>
            <CardDescription>Vos derniers articles de blog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-md">
                  <div>
                    <div className="font-medium">{post.title}</div>
                    <div className="text-sm text-slate-500">
                      {post.published ? (
                        <span className="flex items-center">
                          <Eye size={12} className="mr-1" />
                          {post.views} vues • {new Date(post.date).toLocaleDateString()}
                        </span>
                      ) : (
                        <span>Brouillon • {new Date(post.date).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <Button size="sm" asChild>
                    <Link to={`/client/posts/${post.id}`}>
                      <Edit size={14} className="mr-1" />
                      Modifier
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/client/posts">
                Voir tous les articles
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Guide rapide */}
        <Card className="bg-client-tertiary border-client-secondary">
          <CardHeader>
            <CardTitle>Guide rapide</CardTitle>
            <CardDescription>Comment gérer votre blog efficacement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-medium mb-2">Créer un nouvel article</h4>
                <p className="text-sm text-slate-500 mb-3">
                  Cliquez sur le bouton "Nouvel article" en haut à droite de votre écran.
                  Vous pouvez ensuite ajouter un titre, un résumé, le contenu de l'article et une image.
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/client/posts/new">
                    <Plus size={14} className="mr-1" />
                    Nouvel article
                  </Link>
                </Button>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-medium mb-2">Publier ou enregistrer comme brouillon</h4>
                <p className="text-sm text-slate-500">
                  Lors de la création ou de la modification d'un article, vous pouvez l'enregistrer comme brouillon
                  ou le publier directement sur votre site.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-medium mb-2">Optimiser pour le référencement (SEO)</h4>
                <p className="text-sm text-slate-500">
                  Complétez les champs titre SEO et description SEO pour améliorer le référencement
                  de vos articles dans les moteurs de recherche.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
}
