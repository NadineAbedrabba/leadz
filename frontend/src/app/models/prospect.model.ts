import { Contact } from './contact.model';
import { Project } from './project.model';

export interface Prospect extends Contact {
  etat: 'Non intéressé' | 'Intéressé' | 'En négociation';
  dateDerniereInteraction: Date | null;
  detailsDerniereInteraction: string | null;
}
