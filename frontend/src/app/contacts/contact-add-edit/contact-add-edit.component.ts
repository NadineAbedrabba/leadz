import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact-emp-add-edit',
  templateUrl: './contact-add-edit.component.html',
  styleUrls: ['./contact-add-edit.component.scss'],
})
export class ContactAddEditComponent implements OnInit {
  contactForm: FormGroup;
  Type: string[] = ['Contact', 'Prospect', 'Client'];

  // Champs supplémentaires pour Prospect et Client
  showProspectFields = false;
  showClientFields = false;
  showProjectFieldForProspect = false;
  showProjectFieldsForClient = false;
  showProjectDescFieldForProspect = false;

  // Etat de Prospect
  etatProspect: string[] = ['Non intéressé', 'Intéressé', 'En négociation'];
  statutProjet: string[] = ['en cours', 'terminé', 'annulé'];

  constructor(
    private _fb: FormBuilder,
    private _ContactService: ContactService,
    private _dialogRef: MatDialogRef<ContactAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.contactForm = this._fb.group({
      prenom: '',
      nom: '',
      email: '',
      identifiant: '',
      type: '',
      num: '',
      type_c: '',
      adresse: '',
      pays: '',
      etat: '', // Pour Prospect
      dateDernierInteraction: '', // Pour Prospect et Client
      detailsDernierInteraction: '', // Pour Prospect et Client
      statut: 'Client', // Par défaut, "Client"
      nb_projet: 1, // Par défaut, 1
      nom_projet: '', // Pour Prospect si intéressé ou en négociation
      description: '', // Description pour Client
      dateCreationProjet: '', // Date de création du projet pour Client
    });
  }

  ngOnInit(): void {
    this.contactForm.patchValue(this.data);
    this.onTypeCChange(); // Appel pour initialiser la visibilité des champs
  }

  onTypeCChange() {
    const typeC = this.contactForm.get('type_c')?.value;
    
    // Afficher les champs spécifiques pour Prospect
    this.showProspectFields = typeC === 'Prospect';
    
    // Afficher les champs spécifiques pour Client et Client fidèle
    this.showClientFields = typeC === 'Client';
    
    // Réinitialiser la visibilité des champs de projet
    this.showProjectFieldForProspect = false;
    this.showProjectDescFieldForProspect = false;
    this.showProjectFieldsForClient = false;
    
    // Logique pour Prospect - afficher le nom du projet si état est "Intéressé" ou "En négociation"
    if (this.showProspectFields) {
      const etat = this.contactForm.get('etat')?.value;
      if (etat === 'Intéressé' || etat === 'En négociation') {
        this.showProjectFieldForProspect = true; // Afficher le champ du nom du projet
        this.showProjectDescFieldForProspect =true;
      }
    }
  
    // Logique pour Client - Toujours afficher les champs du projet
    if (this.showClientFields) {
      this.contactForm.get('statut')?.setValue('Client'); // Statut par défaut "Client"
      this.contactForm.get('nb_projet')?.setValue(1); // nb_projet par défaut 1
      this.showProjectFieldsForClient = true; // Toujours afficher les champs du projet pour Client
    }
  }

  onFormSubmit() {
    if (this.contactForm.valid) {
      if (this.data) {
        // Mettre à jour un contact existant
        this._ContactService.updateContact(this.data.id, this.contactForm.value).subscribe({
          next: (val: any) => {
            alert('Contact detail updated');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        // Ajouter un nouveau contact
        this._ContactService.addContact(this.contactForm.value).subscribe({
          next: (val: any) => {
            alert('Contact added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }


}