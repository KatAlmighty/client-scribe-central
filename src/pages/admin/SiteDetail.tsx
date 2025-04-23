import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, ExternalLink, User, Mail, Eye, EyeOff, Edit, ArrowRight, Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FrontendProjectLinkField from "@/components/admin/sites/FrontendProjectLinkField";

export default function SiteDetail() {
  const { siteId } = useParams<{ siteId: string }>();
  const [activeTab, setActiveTab] = useState("general");
  const [frontendUrl, setFrontendUrl] = useState("");

  const site = {
    id: siteId,
    name: "Café des Artistes",
    slug: "cafe-des-artistes",
    domain: "cafe-artistes.fr",
    description: "Café & espace culturel au cœur de Paris proposant des expositions, concerts et ateliers créatifs.",
    frontend_project_url: "https://cafe-des-artistes.lovable.app",
    createdAt: "2023-01-15",
    clientName: "Marie Dubois",
    clientEmail: "marie@cafe-artistes.fr",
  };

  useEffect(() => {
    setFrontendUrl(site.frontend_project_url ?? "");
  }, [site.frontend_project_url]);

  const pages = [
    { id: "1", title: "Accueil", slug: "/", published: true, lastUpdated: "2023-04-01" },
    { id: "2", title: "À propos", slug: "/a-propos", published: true, lastUpdated: "2023-04-02" },
    { id: "3", title: "Services", slug: "/services", published: true, lastUpdated: "2023-04-03" },
    { id: "4", title: "Contact", slug: "/contact", published: true, lastUpdated: "2023-04-04" },
  ];

  const posts = [
    { id: "1", title: "Nouveaux ateliers créatifs pour enfants", slug: "/blog/ateliers-creatifs-enfants", published: true, date: "2023-04-15", author: "Marie Dubois" },
    { id: "2", title: "Exposition photo du mois de mai", slug: "/blog/exposition-photo-mai", published: true, date: "2023-04-10", author: "Marie Dubois" },
    { id: "3", title: "Concert acoustique: programmation été 2023", slug: "/blog/programmation-ete-2023", published: false, date: "2023-04-05", author: "Marie Dubois" },
    { id: "4", title: "Nouveau menu vegan disponible", slug: "/blog/menu-vegan", published: true, date: "2023-03-28", author: "Marie Dubois" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1>{site.name}</h1>
            <p className="text-slate-500">{site.domain}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={`https://${site.domain}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} className="mr-1" />
                Visiter le site
              </a>
            </Button>
            {frontendUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={frontendUrl} target="_blank" rel="noopener noreferrer">
                  <LinkIcon size={14} className="mr-1" />
                  Ouvrir le site frontend
                </a>
              </Button>
            )}
            <Button size="sm">
              Sauvegarder les modifications
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations du site</CardTitle>
                <CardDescription>
                  Informations générales et paramètres du site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du site</Label>
                    <Input id="name" defaultValue={site.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="domain">Domaine</Label>
                    <Input id="domain" defaultValue={site.domain} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" defaultValue={site.description} rows={4} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="seo-title">Titre SEO par défaut</Label>
                    <Input id="seo-title" defaultValue={site.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seo-description">Description SEO par défaut</Label>
                    <Input id="seo-description" defaultValue={site.description?.substring(0, 160)} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="frontend-url">URL projet frontend (Lovable)</Label>
                  <FrontendProjectLinkField value={frontendUrl} onChange={setFrontendUrl} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pages" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Pages du site</h3>
              <Button asChild>
                <Link to={`/admin/sites/${siteId}/pages/new`}>
                  <Plus size={16} className="mr-1" />
                  Nouvelle page
                </Link>
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {pages.map((page) => (
                    <div key={page.id} className="flex items-center justify-between py-4 px-6">
                      <div>
                        <div className="font-medium">{page.title}</div>
                        <div className="text-sm text-slate-500">{page.slug}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={page.published ? "default" : "outline"}>
                          {page.published ? "Publiée" : "Brouillon"}
                        </Badge>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/admin/sites/${siteId}/pages/${page.id}`}>
                            <Edit size={14} className="mr-1" />
                            Modifier
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="blog" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Articles de blog</h3>
              <Button asChild>
                <Link to={`/admin/sites/${siteId}/posts/new`}>
                  <Plus size={16} className="mr-1" />
                  Nouvel article
                </Link>
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {posts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between py-4 px-6">
                      <div>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-slate-500">
                          Par {post.author} • {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={post.published ? "default" : "outline"} className="flex items-center">
                          {post.published ? (
                            <>
                              <Eye size={12} className="mr-1" />
                              Publié
                            </>
                          ) : (
                            <>
                              <EyeOff size={12} className="mr-1" />
                              Brouillon
                            </>
                          )}
                        </Badge>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/admin/sites/${siteId}/posts/${post.id}`}>
                            <Edit size={14} className="mr-1" />
                            Modifier
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Utilisateurs du site</h3>
              <Button asChild>
                <Link to={`/admin/sites/${siteId}/users/invite`}>
                  <Plus size={16} className="mr-1" />
                  Inviter un utilisateur
                </Link>
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-medium">
                        {site.clientName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{site.clientName}</div>
                        <div className="text-sm text-slate-500 flex items-center gap-1">
                          <Mail size={12} />
                          {site.clientEmail}
                        </div>
                      </div>
                    </div>
                    <Badge>ClientEditor</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-medium">
                        SM
                      </div>
                      <div>
                        <div className="font-medium">Sophie Martin</div>
                        <div className="text-sm text-slate-500 flex items-center gap-1">
                          <Mail size={12} />
                          sophie@agence.com
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">AdminAgence</Badge>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" asChild>
                      <Link to={`/admin/sites/${siteId}/users/manage`}>
                        <User size={14} className="mr-1" />
                        Gérer les accès
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
