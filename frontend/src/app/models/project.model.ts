import { Client } from './client.model';
import { Prospect } from './prospect.model';

export interface Project {
  id: number;
  nomProjet: string;
  description: string;
  dateCreation?: Date;
  statutProjet: 'non décroché' | 'décroché' | 'en cours de négociation' | 'terminé' | 'résilié';
  contactId: Number | null;  // Référence à un client
}
