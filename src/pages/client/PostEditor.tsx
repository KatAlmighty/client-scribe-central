
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClientLayout from "@/components/layouts/ClientLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Save, Sparkles, ImagePlus, Eye, ArrowLeft } from "lucide-react";

export default function PostEditor() {
  const { postId } = useParams<{ postId: string }>();
  const isNew = postId === "new";
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Dans une app réelle, nous chargerions les données du site avec React Query
  const site = {
    name: "Café des Artistes",
  };
  
  // État initial pour un nouveau post ou pour l'édition
  const [post, setPost] = useState({
    title: isNew ? "" : "Nouveaux ateliers créatifs pour enfants",
    slug: isNew ? "" : "ateliers-creatifs-enfants",
    summary: isNew ? "" : "Découvrez nos nouveaux ateliers créatifs pour les enfants de 6 à 12 ans.",
    content: isNew ? "" : `# Nouveaux ateliers créatifs pour enfants

À partir de ce mois-ci, le Café des Artistes propose une nouvelle série d'ateliers créatifs spécialement conçus pour les enfants de 6 à 12 ans.

## Au programme

- **Ateliers peinture** : Tous les mercredis de 14h à 16h
- **Ateliers sculpture** : Les samedis de 10h à 12h
- **Ateliers BD** : Un dimanche par mois de 14h à 17h

Nos animateurs sont tous des artistes professionnels qui adorent partager leur passion avec les plus jeunes.

## Tarifs et inscriptions

- Atelier unique : 15€
- Carte 5 ateliers : 65€
- Carte 10 ateliers : 120€

Pour inscrire votre enfant, rendez-vous à l'accueil du café ou contactez-nous par téléphone.`,
    coverImage: isNew ? null : "https://example.com/placeholder.jpg",
    metaTitle: isNew ? "" : "Nouveaux ateliers créatifs pour enfants au Café des Artistes",
    metaDescription: isNew ? "" : "Découvrez les nouveaux ateliers créatifs pour enfants proposés par le Café des Artistes à Paris. Peinture, sculpture, BD et plus encore!",
    published: isNew ? false : true,
  });
  
  // Mise à jour des champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };
  
  // Génération automatique du slug à partir du titre
  const generateSlug = () => {
    if (!post.title) return;
    
    const slug = post.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    setPost(prev => ({ ...prev, slug }));
  };
  
  // Génération automatique des métadonnées SEO
  const generateSeoMeta = () => {
    if (!post.title) return;
    
    setPost(prev => ({
      ...prev,
      metaTitle: post.title,
      metaDescription: post.summary || post.content.substring(0, 157) + "...",
    }));
    
    toast({
      title: "Métadonnées SEO générées",
      description: "Les champs SEO ont été automatiquement remplis.",
    });
  };
  
  // Enregistrement du post
  const handleSave = (publish: boolean = false) => {
    // Dans une app réelle, nous sauvegarderions les données avec React Query et Supabase
    
    setPost(prev => ({
      ...prev,
      published: publish,
    }));
    
    toast({
      title: publish ? "Article publié" : "Brouillon enregistré",
      description: publish 
        ? "Votre article est maintenant visible sur votre site." 
        : "Votre brouillon a été enregistré.",
    });
    
    // Redirection vers la liste des articles
    navigate("/client/posts");
  };

  return (
    <ClientLayout siteName={site.name}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/client/posts")}>
            <ArrowLeft size={16} className="mr-1" />
            Retour aux articles
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleSave(false)}>
              <Save size={16} className="mr-1" />
              Enregistrer
            </Button>
            <Button onClick={() => handleSave(true)}>
              <Eye size={16} className="mr-1" />
              Publier
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations principales</CardTitle>
                <CardDescription>
                  Titre, résumé et contenu de votre article
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre de l'article</Label>
                  <Input
                    id="title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    onBlur={generateSlug}
                    placeholder="Titre de votre article"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="slug"
                      name="slug"
                      value={post.slug}
                      onChange={handleChange}
                      placeholder="slug-de-votre-article"
                      className="font-mono text-sm"
                    />
                    <Button variant="outline" size="sm" onClick={generateSlug} type="button">
                      Générer
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500">
                    L'URL de votre article sera: {`https://${site.name.toLowerCase().replace(/\s+/g, '-')}.com/blog/${post.slug}`}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="summary">Résumé de l'article</Label>
                  <Textarea
                    id="summary"
                    name="summary"
                    value={post.summary}
                    onChange={handleChange}
                    placeholder="Un court résumé de votre article (facultatif)"
                    rows={2}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Contenu de l'article</Label>
                  <Tabs defaultValue="write">
                    <TabsList className="mb-2">
                      <TabsTrigger value="write">Écrire</TabsTrigger>
                      <TabsTrigger value="preview">Aperçu</TabsTrigger>
                    </TabsList>
                    <TabsContent value="write">
                      <Textarea
                        id="content"
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                        placeholder="Écrivez le contenu de votre article ici..."
                        rows={15}
                        className="font-mono"
                      />
                      <p className="text-xs text-slate-500 mt-2">
                        Utilisez la syntaxe Markdown pour formater votre texte.
                        <Button variant="link" size="sm" className="p-0 h-auto text-xs" asChild>
                          <a href="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noopener noreferrer">
                            Guide Markdown
                          </a>
                        </Button>
                      </p>
                    </TabsContent>
                    <TabsContent value="preview">
                      <div className="prose max-w-none border rounded-md p-4 min-h-[300px] bg-white">
                        {/* Ici, nous afficherions le Markdown rendu */}
                        <h1>Aperçu du contenu</h1>
                        <p>Cette fonctionnalité afficherait le rendu de votre contenu Markdown.</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Colonne latérale */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Image de couverture</CardTitle>
                <CardDescription>
                  Image principale de votre article
                </CardDescription>
              </CardHeader>
              <CardContent>
                {post.coverImage ? (
                  <div className="relative group">
                    <img
                      src={post.coverImage}
                      alt="Cover"
                      className="rounded-md w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                      <Button variant="ghost" className="text-white">
                        <ImagePlus size={20} className="mr-1" />
                        Changer l'image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border border-dashed rounded-md p-8 text-center bg-slate-50">
                    <ImagePlus size={24} className="mx-auto text-slate-400 mb-2" />
                    <p className="text-sm text-slate-500 mb-2">
                      Aucune image de couverture
                    </p>
                    <Button size="sm">
                      Ajouter une image
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>SEO</CardTitle>
                  <Button size="sm" variant="ghost" onClick={generateSeoMeta}>
                    <Sparkles size={16} className="mr-1" />
                    Auto-générer
                  </Button>
                </div>
                <CardDescription>
                  Optimisation pour les moteurs de recherche
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Titre SEO</Label>
                  <Input
                    id="metaTitle"
                    name="metaTitle"
                    value={post.metaTitle}
                    onChange={handleChange}
                    placeholder="Titre pour les moteurs de recherche"
                  />
                  <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        post.metaTitle.length > 70 ? "bg-red-500" : 
                        post.metaTitle.length > 50 ? "bg-yellow-500" : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min(100, (post.metaTitle.length / 70) * 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    {post.metaTitle.length}/70 caractères (idéalement entre 50-60)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Description SEO</Label>
                  <Textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={post.metaDescription}
                    onChange={handleChange}
                    placeholder="Description pour les moteurs de recherche"
                    rows={3}
                  />
                  <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        post.metaDescription.length > 160 ? "bg-red-500" : 
                        post.metaDescription.length > 130 ? "bg-yellow-500" : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min(100, (post.metaDescription.length / 160) * 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    {post.metaDescription.length}/160 caractères (idéalement entre 130-160)
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Publication</CardTitle>
                <CardDescription>
                  Options de publication de votre article
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-50 p-3 rounded-md">
                  <div className="font-medium mb-1">Statut</div>
                  <div className="text-sm">
                    {post.published ? "Publié" : "Brouillon (non publié)"}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" onClick={() => handleSave(true)}>
                  <Eye size={16} className="mr-1" />
                  {post.published ? "Mettre à jour la publication" : "Publier"}
                </Button>
                <Button variant="outline" className="w-full" onClick={() => handleSave(false)}>
                  <Save size={16} className="mr-1" />
                  Enregistrer comme brouillon
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
