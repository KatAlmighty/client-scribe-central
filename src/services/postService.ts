
import { Post } from "@/types";

// Simulation de données - dans une application réelle, ceci serait remplacé par des appels à Supabase
const allPosts: Post[] = [
  // Exemple pour le site 1
  { 
    id: "1", 
    site_id: "1", 
    title: "Nouveaux ateliers créatifs pour enfants", 
    slug: "ateliers-creatifs-enfants", 
    content: "# Contenu markdown...", 
    author_id: "user1", 
    published: true, 
    view_count: 187, 
    created_at: "2023-04-15", 
    updated_at: "2023-04-15" 
  },
  { 
    id: "2", 
    site_id: "1", 
    title: "Exposition photo du mois de mai", 
    slug: "exposition-photo-mai", 
    content: "# Contenu markdown...", 
    author_id: "user1", 
    published: true, 
    view_count: 124, 
    created_at: "2023-04-10", 
    updated_at: "2023-04-10" 
  },
  // Exemple pour le site 2
  { 
    id: "3", 
    site_id: "2", 
    title: "Cours de yoga en plein air", 
    slug: "cours-yoga-plein-air", 
    content: "# Contenu markdown...", 
    author_id: "user2", 
    published: true, 
    view_count: 85, 
    created_at: "2023-04-08", 
    updated_at: "2023-04-08" 
  },
];

// Fonction pour récupérer les articles en fonction du site_id
export const getPostsBySiteId = (siteId: string): Post[] => {
  return allPosts.filter(post => post.site_id === siteId);
};

// Fonction pour récupérer un article spécifique (vérification de l'accès au site_id)
export const getPostById = (postId: string, siteId?: string): Post | undefined => {
  const post = allPosts.find(post => post.id === postId);
  
  // Si un siteId est fourni (mode client), vérifier que l'article appartient au site
  if (siteId && post && post.site_id !== siteId) {
    return undefined; // L'utilisateur n'a pas accès à cet article
  }
  
  return post;
};

// Fonction pour récupérer les articles publiés d'un site pour l'API externe
export const getPublishedPostsBySiteSlug = async (siteSlug: string): Promise<Post[]> => {
  // Dans une vraie application, on rechercherait d'abord le site par son slug
  // puis on filtrerait les articles par site_id
  
  // Pour la démo, on assume que le site_id est égal au siteSlug
  return allPosts.filter(post => post.site_id === siteSlug && post.published);
};

// Fonction pour créer/modifier un article (avec vérification de sécurité)
export const savePost = (post: Partial<Post>, currentSiteId?: string): Post | null => {
  // Si un siteId est fourni (mode client), vérifier que l'article appartient au site
  if (currentSiteId && post.site_id && post.site_id !== currentSiteId) {
    return null; // Tentative d'accès non autorisé
  }
  
  // Logique de sauvegarde (dans une vraie app, ce serait un appel à Supabase)
  // Pour la démo, on simule juste un succès
  return {
    id: post.id || "new-id",
    site_id: post.site_id || "1",
    title: post.title || "Nouvel article",
    slug: post.slug || "nouvel-article",
    content: post.content || "",
    author_id: post.author_id || "current-user",
    published: post.published || false,
    view_count: post.view_count || 0,
    created_at: post.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
};
