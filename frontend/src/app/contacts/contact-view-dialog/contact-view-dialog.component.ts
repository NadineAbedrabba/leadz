import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ContactService } from '../../services/contact.service';
import { ProspectService } from '../../services/prospect.service';
import { ClientService } from '../../services/client.service';
import { ProjectService } from '../../services/project.service';
import { Contact } from '../../models/contact.model';
import { Prospect } from '../../models/prospect.model';
import { Client } from '../../models/client.model';
import { Project } from '../../models/project.model';

@Component({
  selector: 'contact-view-dialog',
  templateUrl: './contact-view-dialog.component.html',
  styleUrls: ['./contact-view-dialog.component.css'],
})
export class ContactViewDialogComponent implements OnInit {
  displayedData: any = {};
  
  contact$: Observable<Contact> = new Observable();
  prospect$: Observable<Prospect> = new Observable();
  client$: Observable<Client> = new Observable();
  project$: Observable<Project[]> = new Observable();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contactService: ContactService,
    private prospectService: ProspectService,
    private clientService: ClientService,
    private projectService: ProjectService,
    private _dialog: MatDialog,
    private router: Router,
    private dialogRef: MatDialogRef<ContactViewDialogComponent> // Ajout de MatDialogRef
  ) {}

  ngOnInit() {
    this.prepareDisplayedData();
  }

  private prepareDisplayedData() {
    const baseAttributes = this.getBaseAttributes();
    const typeContact = this.getTypeContact();

    switch (typeContact) {
      case 'prospect':
        this.prospect$ = this.prospectService.getProspectById(this.data.id);
        this.prospect$.subscribe((prospect) => {
          this.prepareProspectData(baseAttributes, prospect);
        });
        break;
      case 'client':
        this.client$ = this.clientService.getClientById(this.data.id);
        this.client$.subscribe((client) => {
          this.prepareClientData(baseAttributes, client);
        });
        break;
      default:
        this.contact$ = this.contactService.getContactById(this.data.id);
        this.contact$.subscribe((contact) => {
          this.displayedData = { ...baseAttributes, ...contact };
        });
        break;
    }
  }

  private getBaseAttributes() {
    return {
      id: this.data.id,
      prenom: this.data.prenom || 'Non renseigné',
      nom: this.data.nom || 'Non renseigné',
      email: this.data.email || 'Non renseigné',
      identifiant: this.data.identifiant || 'Non renseigné',
      type: this.data.type || 'Non renseigné',
      numero: this.data.numero || 'Non renseigné',
      typeContact: this.data.typeContact || 'Non renseigné',
      adresse: this.data.adresse || 'Non renseignée',
      pays: this.data.pays || 'Non renseigné',
    };
  }

  private getTypeContact() {
    return (this.data.typeContact || '').toLowerCase();
  }

  private prepareProspectData(baseAttributes: any, prospect: Prospect) {
    this.displayedData = {
      ...baseAttributes,
      etat: prospect.etat || 'Non spécifié',
      dateDerniereInteraction: prospect.dateDerniereInteraction || 'Non spécifiée',
      detailsDerniereInteraction: prospect.detailsDerniereInteraction || 'Non spécifiés',
    };
  }

  private prepareClientData(baseAttributes: any, client: Client) {
    this.displayedData = {
      ...baseAttributes,
      statut: client.statut || 'Non spécifié',
      dateDerniereInteraction: client.dateDerniereInteraction || 'Non spécifiée',
      detailsDerniereInteraction: client.detailsDerniereInteraction || 'Non spécifiés',
      nbProjets: client.nbProjets || '0',
    };
  }

  ShowAddProjectButton(): boolean {
    return this.displayedData.projets && this.displayedData.projets.length === 0;
  }
 

  navigateToProjects(): void {
    console.log('Bouton "Voir projets" cliqué');
    if (this.displayedData && this.displayedData.id) {
      console.log('ID du contact:', this.displayedData.id);
      this.dialogRef.close(); // Ferme le dialogue avant de naviguer
      this.router.navigate(['/view-projects', this.displayedData.id]).then((success) => {
        if (success) {
          console.log('Navigation réussie vers /view-projects');
        } else {
          console.error('Échec de la navigation vers /view-projects');
        }
      });
    } else {
      console.error('The contact id is not available', this.displayedData);
    }
  }

  
}
