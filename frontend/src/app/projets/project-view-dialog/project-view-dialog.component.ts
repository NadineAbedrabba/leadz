import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { ProjectService } from '../../services/project.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-project-view-dialog',
  templateUrl: './project-view-dialog.component.html',
  styleUrls: ['./project-view-dialog.component.css']
})
export class ProjectViewDialogComponent implements OnInit {
  displayedData: any = {};
  contactName: string = ''; // Nom du contact par défaut

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contactService: ContactService, // Pour récupérer les infos du contact
    private projectService: ProjectService // Si d'autres détails du projet sont nécessaires
  ) {}

  ngOnInit() {
    console.log('Données reçues dans la boîte de dialogue:', this.data); // Debugging
    this.prepareDisplayedData();
    this.loadContactDetails();
  }

  private prepareDisplayedData() {
    this.displayedData = {
      nomProjet: this.data.nomProjet || 'Non renseigné',
      description: this.data.description || 'Non renseigné',
      statutProjet: this.data.statutProjet || 'Non renseigné',
      dateCreation: this.data.dateCreation || 'Non renseigné',
    };
  }

  private loadContactDetails() {
    if (this.data.contact.id) {
      this.contactService.getContactById(this.data.contact.id).subscribe({
        next: (contact: Contact) => {
          console.log('Contact récupéré:', contact); // Pour vérifier les données
          this.contactName = contact.nom + ' ' + contact.prenom || 'Non renseigné';
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du contact:', err);
          this.contactName = 'Erreur lors du chargement';
        }
      });
    } else {
      console.warn('Aucun contactId fourni');
      this.contactName = 'ID contact manquant';
    }
  }
  
}
