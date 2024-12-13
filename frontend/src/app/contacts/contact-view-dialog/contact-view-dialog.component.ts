import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'contact-view-dialog',
  templateUrl: './contact-view-dialog.component.html',
  styleUrls: ['./contact-view-dialog.component.scss']
})
export class ContactViewDialogComponent {
  displayedData: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('Données reçues :', data);
    this.prepareDisplayedData();
  }

  prepareDisplayedData() {
    const baseAttributes = {
      prenom: this.data.prenom || 'Non renseigné',
      nom: this.data.nom || 'Non renseigné',
      email: this.data.email || 'Non renseigné',
      identifiant: this.data.identifiant || 'Non renseigné',
      type: this.data.type || 'Non renseigné',
      num: this.data.num || 'Non renseigné',
      type_c: this.data.type_c || 'Non renseigné',
      adresse: this.data.adresse || 'Non renseignée',
      pays: this.data.pays || 'Non renseigné',
    };

    const typeContact = (this.data.type_c || '').toLowerCase();
    const etat = (this.data.etat || '').toLowerCase();

    if (typeContact === 'prospect') {
      this.displayedData = {
        ...baseAttributes,
        etat: this.data.etat,
        derniereInteractionDate: this.data.derniereInteractionDate || 'Non spécifiée',
        derniereInteractionDetails: this.data.derniereInteractionDetails || 'Non spécifiés',
      };

      if (etat === 'intéressé' || etat === 'en négociation') {
        this.displayedData.projetNom = this.data.nom_projet || 'Non spécifié';
        this.displayedData.projetDescription = this.data.description || 'Non spécifiée';
      }
    } else if (typeContact === 'client') {
      this.displayedData = {
        ...baseAttributes,
        statut: this.data.statut || 'Non spécifié',
        derniereInteractionDate: this.data.derniereInteractionDate || 'Non spécifiée',
        derniereInteractionDetails: this.data.derniereInteractionDetails || 'Non spécifiés',
        projetNom: this.data.projetNom || 'Non spécifié',
        projetDescription: this.data.projetDescription || 'Non spécifiée',
        projetDateCreation: this.data.projetDateCreation || 'Non spécifiée',
        projetStatut: this.data.projetStatut || 'Non spécifié',
      };
    } else {
      // Cas par défaut (contact générique)
      this.displayedData = baseAttributes;
    }
  }
}
