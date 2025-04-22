
import { Invitation, UserRole } from "@/types";
import { v4 as uuidv4 } from 'uuid'; // Nous devrons ajouter cette dépendance

// Simulation de données - dans une application réelle, ceci serait remplacé par des appels à Supabase
const invitations: Invitation[] = [
  {
    id: "1",
    email: "client@example.com",
    site_id: "1",
    role: "ClientEditor",
    token: "token123",
    expires_at: "2023-12-31",
    created_at: "2023-04-01"
  }
];

// Fonction pour créer une invitation
export const createInvitation = (email: string, siteId: string, role: UserRole): Invitation => {
  // Générer un token unique
  const token = uuidv4();
  
  // Définir une date d'expiration (7 jours à partir de maintenant)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  
  const newInvitation: Invitation = {
    id: uuidv4(),
    email,
    site_id: siteId,
    role,
    token,
    expires_at: expiresAt.toISOString(),
    created_at: new Date().toISOString()
  };
  
  // Dans une vraie app, sauvegarder dans Supabase ici
  invitations.push(newInvitation);
  
  return newInvitation;
};

// Fonction pour valider une invitation
export const validateInvitation = (token: string): Invitation | null => {
  const invitation = invitations.find(inv => inv.token === token);
  
  if (!invitation) {
    return null; // Invitation non trouvée
  }
  
  // Vérifier que l'invitation n'a pas expiré
  const now = new Date();
  const expiresAt = new Date(invitation.expires_at);
  
  if (now > expiresAt) {
    return null; // Invitation expirée
  }
  
  return invitation;
};

// Fonction pour accepter une invitation (création du rôle utilisateur)
export const acceptInvitation = (token: string, userId: string): boolean => {
  const invitation = validateInvitation(token);
  
  if (!invitation) {
    return false;
  }
  
  // Dans une vraie application :
  // 1. Créer un enregistrement dans user_roles
  // 2. Supprimer l'invitation
  
  return true;
};

// Fonction pour récupérer les invitations d'un site
export const getInvitationsBySiteId = (siteId: string): Invitation[] => {
  return invitations.filter(inv => inv.site_id === siteId);
};

// Fonction pour supprimer une invitation
export const deleteInvitation = (invitationId: string): boolean => {
  const index = invitations.findIndex(inv => inv.id === invitationId);
  
  if (index === -1) {
    return false;
  }
  
  // Dans une vraie app, supprimer de Supabase ici
  invitations.splice(index, 1);
  
  return true;
};
