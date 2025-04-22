
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublishedPostsBySiteSlug } from "@/services/postService";
import { Post } from "@/types";

// Ce composant simule un endpoint API (en JSON)
export default function ApiPosts() {
  const { siteSlug } = useParams<{ siteSlug: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPosts = async () => {
      if (!siteSlug) {
        setError("Site slug manquant");
        setIsLoading(false);
        return;
      }
      
      try {
        const publishedPosts = await getPublishedPostsBySiteSlug(siteSlug);
        setPosts(publishedPosts);
      } catch (err) {
        setError("Erreur lors du chargement des articles");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, [siteSlug]);
  
  // Forcer l'affichage en tant que JSON
  useEffect(() => {
    document.title = `API - Posts ${siteSlug || ""}`;
    
    // Définir le type de contenu comme application/json (dans une vraie API)
    // Ceci est juste pour la simulation
    const style = document.createElement("style");
    style.innerHTML = `
      body {
        font-family: monospace;
        white-space: pre;
        background-color: #f5f5f5;
        padding: 20px;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [siteSlug]);
  
  // Préparer les données à exposer (on retire les informations sensibles)
  const publicPosts = posts.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    summary: post.summary,
    content: post.content,
    cover_image_url: post.cover_image_url,
    meta_title: post.meta_title,
    meta_description: post.meta_description,
    og_image_url: post.og_image_url,
    published_at: post.published_at,
  }));
  
  if (isLoading) {
    return <div>Chargement...</div>;
  }
  
  if (error) {
    return <div>{JSON.stringify({ error }, null, 2)}</div>;
  }
  
  return (
    <div>
      {JSON.stringify({ posts: publicPosts }, null, 2)}
    </div>
  );
}
