
import React, { useState, useEffect } from "react";
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
import { getPostsBySiteId } from "@/services/postService";
import { Post } from "@/types";

export default function ClientPosts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [posts, setPosts] = useState<Post[]>([]);
  
  // Dans une app réelle, nous récupérerions ces informations de Supabase Auth
  const currentUser = {
    id: "current-user-id",
    siteId: "1", // Le site auquel l'utilisateur a accès
  };
  
  // Dans une app réelle, nous chargerions les données du site avec React Query
  const site = {
    name: "Café des Artistes",
    id: currentUser.siteId,
  };
  
  // Charger les articles de l'utilisateur courant
  useEffect(() => {
    // Dans une vraie app, nous utiliserions useQuery de @tanstack/react-query
    const loadPosts = async () => {
      const userPosts = getPostsBySiteId(currentUser.siteId);
      setPosts(userPosts);
    };
    
    loadPosts();
  }, [currentUser.siteId]);
  
  // Filtrage des articles
  const filteredPosts = posts.filter(post => {
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
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      {post.published && (
                        <span className="flex items-center">
                          <Eye size={12} className="mr-1" />
                          {post.view_count} vues
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
