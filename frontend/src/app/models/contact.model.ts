export interface Contact {
    id: number;
    prenom: string;
    nom: string;
    email: string;
    identifiant: string;
    type: 'physique' | 'moral';
    numero: string;
    adresse: string;
    pays: string;
    typeContact: 'contact' | 'prospect' | 'client';
    createdAt: string; 
  }
  