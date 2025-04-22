
// Types d'utilisateurs
export type UserRole = "AdminAgence" | "ClientEditor";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  site_id: string;
  role: UserRole;
  created_at: string;
}

// Sites
export interface Site {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  domain?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// Pages
export type PageType = "home" | "about" | "services" | "contact" | "custom";

export interface Page {
  id: string;
  site_id: string;
  type: PageType;
  title: string;
  slug: string;
  content: Record<string, any>; // JSON contenu
  meta_title?: string;
  meta_description?: string;
  og_image_url?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// Articles de blog
export interface Post {
  id: string;
  site_id: string;
  title: string;
  slug: string;
  summary?: string;
  content: string; // Markdown
  cover_image_url?: string;
  author_id: string;
  meta_title?: string;
  meta_description?: string;
  og_image_url?: string;
  published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

// Invitations
export interface Invitation {
  id: string;
  email: string;
  site_id: string;
  role: UserRole;
  token: string;
  expires_at: string;
  created_at: string;
}

// Stats
export interface SiteStats {
  total_posts: number;
  published_posts: number;
  draft_posts: number;
  total_pages: number;
  total_views: number;
}

// Analytics
export interface PostAnalytics {
  post_id: string;
  views: number;
  unique_views: number;
  avg_time_on_page: number;
  data_points: {
    date: string;
    views: number;
  }[];
}
