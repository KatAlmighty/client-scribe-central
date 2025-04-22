
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ClientLayout from "@/components/layouts/ClientLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Edit, Trash, Plus, Search } from "lucide-react";

export default function ClientPosts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Dans une app réelle, nous chargerions les données du site avec React Query
  const site = {
    name: "Café des Artistes",
  };
  
  // Données fictives pour la démo
  const allPosts = [
    { id: "1", title: "Nouveaux ateliers créatifs pour enfants", slug: "ateliers-creatifs-enfants", published: true, views: 187, date: "2023-04-15" },
    { id: "2", title: "Exposition photo du mois de mai", slug: "exposition-photo-mai", published: true, views: 124, date: "2023-04-10" },
    { id: "3", title: "Concert acoustique: programmation été 2023", slug: "programmation-ete-2023", published: false, views: 0, date: "2023-04-05" },
    { id: "4", title: "Nouveau menu vegan disponible", slug: "menu-vegan", published: true, views: 89, date: "2023-03-28" },
    { id: "5", title: "Interview avec l'artiste du mois", slug: "interview-artiste", published: false, views: 0, date: "2023-03-20" },
    { id: "6", title: "Horaires spéciaux pendant les vacances", slug: "horaires-vacances", published: true, views: 76, date: "2023-03-15" },
    { id: "7", title: "Retour sur la soirée poésie", slug: "soiree-poesie", published: true, views: 45, date: "2023-03-10" },
    { id: "8", title: "Appel aux artistes locaux", slug: "appel-artistes", published: false, views: 0, date: "2023-03-05" },
  ];
  
  // Filtrage des articles
  const filteredPosts = allPosts.filter(post => {
    // Filtre par titre
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtre par statut
    let matchesStatus = true;
    if (statusFilter === "published") {
      matchesStatus = post.published;
    } else if (statusFilter === "draft") {
      matchesStatus = !post.published;
    }
    
    return matchesSearch && matchesStatus;
  });

  return (
    <ClientLayout siteName={site.name}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1>Articles de blog</h1>
          <Button asChild>
            <Link to="/client/posts/new">
              <Plus size={16} className="mr-1" />
              Nouvel article
            </Link>
          </Button>
        </div>
        
        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="published">Publiés</SelectItem>
              <SelectItem value="draft">Brouillons</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Liste des articles */}
        <Card>
          <CardHeader>
            <CardTitle>Vos articles ({filteredPosts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {filteredPosts.map((post) => (
                <div key={post.id} className="py-4 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium">{post.title}</div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Badge variant={post.published ? "default" : "outline"} className="text-xs">
                        {post.published ? "Publié" : "Brouillon"}
                      </Badge>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      {post.published && (
                        <span className="flex items-center">
                          <Eye size={12} className="mr-1" />
                          {post.views} vues
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {post.published ? (
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        <EyeOff size={14} className="mr-1" />
                        Dépublier
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800 h-8">
                        <Eye size={14} className="mr-1" />
                        Publier
                      </Button>
                    )}
                    
                    <Button size="sm" className="h-8" asChild>
                      <Link to={`/client/posts/${post.id}`}>
                        <Edit size={14} className="mr-1" />
                        Modifier
                      </Link>
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8">
                      <Trash size={14} />
                    </Button>
                  </div>
                </div>
              ))}
              
              {filteredPosts.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-slate-500 mb-4">Aucun article ne correspond à vos critères.</p>
                  <Button asChild>
                    <Link to="/client/posts/new">
                      <Plus size={16} className="mr-1" />
                      Créer un nouvel article
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
}
