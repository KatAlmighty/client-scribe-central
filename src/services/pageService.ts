
import { Page, PageType } from "@/types";

// Simulation de données - dans une application réelle, ceci serait remplacé par des appels à Supabase
const allPages: Page[] = [
  // Pages du site 1
  {
    id: "1",
    site_id: "1",
    type: "home",
    title: "Accueil - Café des Artistes",
    slug: "home",
    content: { sections: [] }, // Contenu JSON structuré
    meta_title: "Café des Artistes - Espace culturel à Paris",
    meta_description: "Un lieu unique pour les amateurs d'art et de culture à Paris",
    published: true,
    created_at: "2023-01-15",
    updated_at: "2023-01-15"
  },
  {
    id: "2",
    site_id: "1",
    type: "about",
    title: "À propos - Café des Artistes",
    slug: "about",
    content: { sections: [] },
    meta_title: "À propos du Café des Artistes - Notre histoire",
    meta_description: "Découvrez l'histoire et la philosophie du Café des Artistes à Paris",
    published: true,
    created_at: "2023-01-15",
    updated_at: "2023-01-15"
  },
  // Pages du site 2
  {
    id: "3",
    site_id: "2",
    type: "home",
    title: "Studio Yoga Zen - Accueil",
    slug: "home",
    content: { sections: [] },
    meta_title: "Studio Yoga Zen - Cours de yoga à Paris",
    meta_description: "Cours de yoga et méditation dans un cadre apaisant",
    published: true,
    created_at: "2023-02-20",
    updated_at: "2023-02-20"
  }
];

// Fonction pour récupérer les pages en fonction du site_id
export const getPagesBySiteId = (siteId: string): Page[] => {
  return allPages.filter(page => page.site_id === siteId);
};

// Fonction pour récupérer une page spécifique
export const getPageById = (pageId: string, siteId?: string): Page | undefined => {
  const page = allPages.find(page => page.id === pageId);
  
  // Si un siteId est fourni, vérifier que la page appartient au site
  if (siteId && page && page.site_id !== siteId) {
    return undefined; // L'utilisateur n'a pas accès à cette page
  }
  
  return page;
};

// Fonction pour récupérer une page par son slug et le site_id
export const getPageBySlug = (slug: string, siteId: string): Page | undefined => {
  return allPages.find(page => page.slug === slug && page.site_id === siteId);
};

// Fonction pour sauvegarder une page (admin uniquement)
export const savePage = (page: Partial<Page>): Page | null => {
  // Dans une vraie application, vérifier ici que l'utilisateur est admin
  
  // Logique de sauvegarde (dans une vraie app, ce serait un appel à Supabase)
  // Pour la démo, on simule juste un succès
  return {
    id: page.id || "new-id",
    site_id: page.site_id || "1",
    type: page.type || "custom" as PageType,
    title: page.title || "Nouvelle page",
    slug: page.slug || "nouvelle-page",
    content: page.content || {},
    meta_title: page.meta_title,
    meta_description: page.meta_description,
    og_image_url: page.og_image_url,
    published: page.published || false,
    created_at: page.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
};
