import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
import { ContactService } from '../../services/contact.service';
import { ProspectService } from '../../services/prospect.service';
import { ClientService } from '../../services/client.service';
import { ProjectService } from '../../services/project.service';
import { Contact } from '../../models/contact.model';
import { Prospect } from '../../models/prospect.model';
import { Client } from '../../models/client.model';
import { Project } from '../../models/project.model';

@Component({
  selector: 'contact-emp-add-edit',
  templateUrl: './contact-add-edit.component.html',
  styleUrls: ['./contact-add-edit.component.css'],
})
export class ContactAddEditComponent implements OnInit {
  contactForm: FormGroup;
  Type: string[] = ['contact', 'prospect', 'client'];

  // Champs supplémentaires pour Prospect et Client
  showProspectFields = false;
  showClientFields = false;
  showProjectFieldForProspect = false;
  showProjectFieldsForClient = false;
  showProjectDescFieldForProspect = false;
  WasProspectNegotiating = false;
  isTypeChanged = false;


  // Etat de Prospect
  etatProspect: string[] = ['Non intéressé', 'Intéressé', 'En négociation'];
  statutProjet: string[] = ['non décroché', 'décroché', 'en cours de négociation', 'terminé', 'résilié'];

  constructor(
    private _fb: FormBuilder,
    private _ContactService: ContactService,
    private _ProspectService: ProspectService,
    private _ClientService: ClientService,
    private _ProjectService: ProjectService,
    private _dialogRef: MatDialogRef<ContactAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact | Prospect | Client,
    private _coreService: CoreService
  ) {
    this.contactForm = this._fb.group({
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      identifiant: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      type: ['', Validators.required],
      numero: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      typeContact: ['', Validators.required],
      adresse: ['', Validators.required],
      pays: ['', Validators.required],
      etat: [''], // Pour Prospect
      dateDerniereInteraction: [''], // Pour Prospect et Client
      detailsDerniereInteraction: [''], // Pour Prospect et Client
      statut: ['client'], // Par défaut, "Client"
      nbProjets: [0], // Par défaut, 1
      nomProjet: [''], // Pour Prospect si intéressé ou en négociation
      description: [''], // Description pour Client
      dateCreationProjet: [''], // Date de création du projet pour Client
      statutProjet: ['en cours de négociation'],
    });
  }

  ngOnInit(): void {
    console.log('Données initiales:', this.data); 
    this.contactForm.patchValue(this.data);
    this.onTypeCChange();


    if (this.data.typeContact === 'prospect') {
      console.log('Données récupérées pour le prospect:', this.data);
      this.contactForm.patchValue({
        etat: (this.data as Prospect).etat || 'En négociation',
        dateDerniereInteraction: (this.data as Prospect).dateDerniereInteraction,
        detailsDerniereInteraction: (this.data as Prospect).detailsDerniereInteraction || 'lolo',
      });
    }

 
    if (this.data.typeContact === 'client') {
      this.contactForm.patchValue({
        dateDerniereInteraction: (this.data as Client).dateDerniereInteraction,
        detailsDerniereInteraction: (this.data as Client).detailsDerniereInteraction,
      });
    }
  }

  onTypeCChange() {
    const typeContact = this.contactForm.get('typeContact')?.value;
    const etat = this.contactForm.get('etat')?.value;
  
    this.showProspectFields = typeContact === 'prospect';
    this.showClientFields = typeContact === 'client';
  
    
    this.showProjectFieldForProspect = this.showProspectFields && etat == 'En négociation';
  }
  

  onFormSubmit() {

    this.markFormGroupTouched(this.contactForm);

   
    if (this.contactForm.invalid) {
   
      const invalidFields = this.getInvalidFields();

      
      this._coreService.openSnackBar(
        `Formulaire invalide`,
        'Fermer'
      );
      return; 
    }

    
    const formData = this.contactForm.value;
    const typeC = formData.typeContact;
    const isProspect = typeC === 'prospect';
    const isClient = typeC === 'client';

    const updateData: any = {
      prenom: formData.prenom,
      nom: formData.nom,
      email: formData.email,
      identifiant: formData.identifiant,
      type: formData.type,
      numero: formData.numero,
      typeContact: formData.typeContact,
      adresse: formData.adresse,
      pays: formData.pays,
      dateDerniereInteraction: formData.dateDerniereInteraction,
      detailsDerniereInteraction: formData.detailsDerniereInteraction,
      statut: formData.statut,
    };

  
    if (isProspect && 'etat' in formData) {
      updateData.etat = formData.etat;
    }

    if (this.data && this.data.id) {
      updateData.id = this.data.id;
      let nbProjets = (this.data as Client).nbProjets;

      this.isTypeChanged = this.data.typeContact !== formData.typeContact;
      this.WasProspectNegotiating = this.data.typeContact == 'prospect' && (this.data as Prospect).etat === 'En négociation';
      const previousType = this.data.typeContact;
      console.log((this.data as Prospect).etat);

      if (this.isTypeChanged) {
        if (isClient && this.WasProspectNegotiating ) {
          updateData.nbProjets = (updateData.nbProjets || 0) + 1;

          this._ContactService.updateContact(this.data.id, updateData).subscribe({
            next: () => {
     
              this._ProjectService.getProjectsByContactId(this.data.id).subscribe({
                next: (projects) => {
                  if (projects.length > 0) {
                    const project = projects[0];  
                    console.log('Projet récupéré:', project); 

                
                    project.statutProjet = 'décroché';

              
                    this._ProjectService.updateProject(project.id, project).subscribe({
                      next: () => {
                        console.log(`Le projet du contact ${this.data.id} a été mis à jour.`);
                      },
                      error: (err: any) => {
                        console.error(`Erreur lors de la mise à jour du projet du contact ${this.data.id}:`, err);
                      }
                    });
                  } else {
                    console.log('Aucun projet trouvé pour ce contact');
                  }
                },
                error: (err: any) => {
                  console.error('Erreur lors de la récupération du projet du client:', err);
                }
              });

              this._coreService.openSnackBar('Succées');
              this._dialogRef.close(true);
            },
            error: (err: any) => console.error('Erreur lors de la mise à jour du contact:', err),
          });
        } else if (isProspect && updateData.etat === 'En négociation') {
          this._ContactService.updateContact(this.data.id, updateData).subscribe({
            next: (updatedContact: Contact) => {
              const projetData: Project = {
                id: 0,
                nomProjet: formData.nomProjet,
                description: formData.description,
                statutProjet: 'en cours de négociation',
                dateCreation: undefined,
                contactId: updatedContact.id,
              };
              this._ProjectService.createProject(projetData).subscribe({
                next: () => {
                  this._coreService.openSnackBar(
                    'Succées'
                  );
                  this._dialogRef.close({ success: true });
                },
                error: (err: any) => console.error(err),
              });
            },
            error: (err: any) => console.error(err),
          });
        } else {
          this._ContactService.updateContact(this.data.id, updateData).subscribe({
            next: () => {
              this._coreService.openSnackBar('Succées');
              this._dialogRef.close(true);
            },
            error: (err: any) => console.error(err),
          });
        }
      } else if (isProspect && updateData.etat === 'En négociation' && !this.WasProspectNegotiating) {
        this._ContactService.updateContact(this.data.id, updateData).subscribe({
          next: (updatedContact: Contact) => {
            const projetData: Project = {
              id: 0,
              nomProjet: formData.nomProjet,
              description: formData.description,
              statutProjet: 'en cours de négociation',
              dateCreation: undefined,
              contactId: updatedContact.id,
            };
            this._ProjectService.createProject(projetData).subscribe({
              next: () => {
                this._coreService.openSnackBar(
                  'Succées'
                );
                this._dialogRef.close({ success: true });
              },
              error: (err: any) => console.error(err),
            });
          },
          error: (err: any) => console.error(err),
        });
      } else {
        this._ContactService.updateContact(this.data.id, updateData).subscribe({
          next: () => {
            this._coreService.openSnackBar('Succées');
            this._dialogRef.close(true);
          },
          error: (err: any) => console.error(err),
        });
      }
    } else {
      // Création d'un nouveau contact
      if (isProspect) {
        this._ProspectService.createProspect(formData).subscribe({
          next: (prospect: Prospect) => {
            if (formData.etat === 'En négociation') {
              const projetData = {
                id: 0,
                nomProjet: formData.nomProjet,
                description: formData.description,
                statutProjet: formData.statutProjet,
                dateCreation: undefined,
                contactId: prospect.id,
              };
              this._ProjectService.createProject(projetData).subscribe({
                next: () => {
                  this._coreService.openSnackBar('Succées');
                  this._dialogRef.close({ success: true });
                },
                error: (err: any) => console.error(err),
              });
            } else {
              this._coreService.openSnackBar('Succées');
              this._dialogRef.close(true);
            }
          },
          error: (err: any) => console.error(err),
        });
      } else if (isClient) {
        this._ClientService.createClient(formData).subscribe({
          next: () => {
            this._coreService.openSnackBar('Succées');
            this._dialogRef.close(true);
          },
          error: (err: any) => console.error(err),
        });
      } else {
        this._ContactService.createContact(formData).subscribe({
          next: () => {
            this._coreService.openSnackBar('Succées');
            this._dialogRef.close(true);
          },
          error: (err: any) => console.error(err),
        });
      }
    }
  }

  // Méthode pour récupérer les champs invalides
  getInvalidFields(): string[] {
    const invalidFields: string[] = [];
    Object.keys(this.contactForm.controls).forEach((field) => {
      const control = this.contactForm.get(field);
      if (control?.invalid) {
        invalidFields.push(field);
      }
    });
    return invalidFields;
  }

  // Méthode pour marquer tous les champs d'un formulaire comme "touched"
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      // Si le contrôle est un FormGroup, marquer récursivement ses champs
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  closeDialog() {
    this._dialogRef.close();
  }
}