import { Contact } from './contact.model';
import { Project } from './project.model';

export interface Client extends Contact {
  statut: 'Client' | 'Client fidèle';
  nbProjets: number;
  dateDerniereInteraction: Date | null;
  detailsDerniereInteraction: string | null;
  projets: Project[]; // Liste des projets associés à ce client
}
