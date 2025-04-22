
import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ExternalLink, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  // Données fictives pour la démo
  const recentSites = [
    { id: "1", name: "Café des Artistes", slug: "cafe-des-artistes", postsCount: 12 },
    { id: "2", name: "Studio Yoga Zen", slug: "studio-yoga-zen", postsCount: 8 },
    { id: "3", name: "Menuiserie Dupont", slug: "menuiserie-dupont", postsCount: 5 },
  ];
  
  const recentPosts = [
    { id: "1", title: "Nouveaux ateliers créatifs", site: "Café des Artistes", published: true, date: "2023-04-15" },
    { id: "2", name: "Cours de yoga en ligne", site: "Studio Yoga Zen", published: false, date: "2023-04-10" },
    { id: "3", name: "Nos réalisations 2023", site: "Menuiserie Dupont", published: true, date: "2023-04-05" },
  ];
  
  const stats = {
    totalSites: 8,
    totalPosts: 42,
    totalClients: 7,
    publishedThisMonth: 12,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1>Tableau de bord</h1>
          <Button asChild>
            <Link to="/admin/sites/new">
              <Plus size={16} className="mr-1" />
              Nouveau site
            </Link>
          </Button>
        </div>
      
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-slate-500">Sites</span>
                <span className="text-3xl font-bold">{stats.totalSites}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-slate-500">Articles</span>
                <span className="text-3xl font-bold">{stats.totalPosts}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-slate-500">Clients</span>
                <span className="text-3xl font-bold">{stats.totalClients}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-slate-500">Publications ce mois</span>
                <span className="text-3xl font-bold">{stats.publishedThisMonth}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sites récents */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Sites récents</CardTitle>
              <CardDescription>Vos sites clients les plus récents</CardDescription>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/admin/sites">
                Voir tous
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {recentSites.map((site) => (
                <div key={site.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div>
                    <div className="font-medium">{site.name}</div>
                    <div className="text-sm text-slate-500">
                      {site.postsCount} articles
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`https://${site.slug}.scribecentral.com`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={14} className="mr-1" />
                        Visiter
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <Link to={`/admin/sites/${site.id}`}>
                        Gérer
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Posts récents */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Articles récents</CardTitle>
              <CardDescription>Les derniers articles publiés sur vos sites</CardDescription>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/admin/posts">
                Voir tous
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div>
                    <div className="font-medium">{post.title}</div>
                    <div className="text-sm text-slate-500">
                      Site: {post.site} | {post.published ? "Publié" : "Brouillon"}
                    </div>
                  </div>
                  <Button size="sm" asChild>
                    <Link to={`/admin/posts/${post.id}`}>
                      Modifier
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
