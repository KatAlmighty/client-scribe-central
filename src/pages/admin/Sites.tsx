
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Edit, Trash, ExternalLink, Copy, Users, Link as LinkIcon } from "lucide-react";

export default function Sites() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Données fictives pour la démo
  const sites = [
    { 
      id: "1", 
      name: "Café des Artistes", 
      slug: "cafe-des-artistes", 
      domain: "cafe-artistes.fr",
      description: "Café & espace culturel au cœur de Paris",
      postsCount: 12,
      clientName: "Marie Dubois",
      createdAt: "2023-01-15",
      frontend_project_url: "https://cafe-des-artistes.lovable.app"
    },
    { 
      id: "2", 
      name: "Studio Yoga Zen", 
      slug: "studio-yoga-zen", 
      domain: "yoga-zen-studio.fr",
      description: "Studio de yoga et bien-être",
      postsCount: 8,
      clientName: "Sophie Legrand",
      createdAt: "2023-02-20",
      frontend_project_url: ""
    },
    { 
      id: "3", 
      name: "Menuiserie Dupont", 
      slug: "menuiserie-dupont", 
      domain: "menuiserie-dupont.fr",
      description: "Artisan menuisier depuis 1980",
      postsCount: 5,
      clientName: "Jean Dupont",
      createdAt: "2023-03-10",
      frontend_project_url: ""
    },
    { 
      id: "4", 
      name: "Fleuriste Les Roses", 
      slug: "fleuriste-les-roses", 
      domain: "lesroses-fleurs.fr",
      description: "Fleuriste artisanal et compositions",
      postsCount: 7,
      clientName: "Rose Martin",
      createdAt: "2023-01-05",
      frontend_project_url: "https://roses.lovable.app"
    },
  ];
  
  const filteredSites = sites.filter(site => 
    site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1>Sites clients</h1>
          <Button asChild>
            <Link to="/admin/sites/new">
              <Plus size={16} className="mr-1" />
              Nouveau site
            </Link>
          </Button>
        </div>
        
        {/* Recherche */}
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Rechercher un site..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        
        {/* Liste des sites */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSites.map((site) => (
            <Card key={site.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Link to={`/admin/sites/${site.id}`}>
                    <CardTitle>{site.name}</CardTitle>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/sites/${site.id}`}>
                          <Edit size={14} className="mr-2" />
                          Modifier
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href={`https://${site.domain}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={14} className="mr-2" />
                          Visiter
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/sites/${site.id}/users`}>
                          <Users size={14} className="mr-2" />
                          Gérer les accès
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/sites/clone/${site.id}`}>
                          <Copy size={14} className="mr-2" />
                          Cloner
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash size={14} className="mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>{site.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-slate-500 w-24">Domaine:</span>
                    <span>{site.domain}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-slate-500 w-24">Client:</span>
                    <span>{site.clientName}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-slate-500 w-24">Articles:</span>
                    <span>{site.postsCount} articles</span>
                  </div>
                  {/* Colonne Projet frontend lié */}
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-slate-500 w-24 flex items-center gap-1">
                      <LinkIcon size={14} />
                      Frontend :
                    </span>
                    {site.frontend_project_url 
                      ? (
                        <a
                          href={site.frontend_project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-green-700 hover:underline gap-1"
                        >
                          Oui
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      )
                      : <span className="text-slate-400">Non</span>
                    }
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3 flex justify-between">
                <Badge variant="outline">{new Date(site.createdAt).toLocaleDateString()}</Badge>
                <Button asChild>
                  <Link to={`/admin/sites/${site.id}`}>
                    Gérer
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredSites.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 mb-4">Aucun site ne correspond à votre recherche.</p>
            <Button asChild>
              <Link to="/admin/sites/new">
                <Plus size={16} className="mr-1" />
                Créer un nouveau site
              </Link>
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
