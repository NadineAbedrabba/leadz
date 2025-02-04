import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ProjectService } from '../../services/project.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-project-add-edit',
  templateUrl: './project-add-edit.component.html',
  styleUrls: ['./project-add-edit.component.css']
})
export class ProjectAddEditComponent {
  ProjectForm: FormGroup;

  statutProjet: string[] = [
    'non décroché', 'décroché', 'en cours de négociation', 'terminé', 'résilié'
  ];

  constructor(
    private _fb: FormBuilder,
    private ProjectService: ProjectService,
    private ContactService: ContactService,
    private _dialogRef: MatDialogRef<ProjectAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.ProjectForm = this._fb.group({
      nomProjet: ['',Validators.required],
      description: '',
      statutProjet: ['',Validators.required],
      dateCreation: '' // Laisser vide par défaut
    });
  }

  ngOnInit(): void {
    // Remplir le formulaire avec les données existantes (pour la mise à jour)
    this.ProjectForm.patchValue(this.data);
  }

  onFormSubmit() {
    // Marquer tous les champs comme "touched" pour déclencher les validations
    this.markFormGroupTouched(this.ProjectForm);

    // Vérifier si le formulaire est invalide
    if (this.ProjectForm.invalid) {
      // Récupérer les champs invalides
      const invalidFields = this.getInvalidFields();

      // Afficher un message SnackBar avec les champs manquants
      this._coreService.openSnackBar(
        `Formulaire invalide`,
        'Fermer'
      );
      return; // Arrêter l'exécution de la méthode
    }
    if (this.ProjectForm.valid) {
      const formData = this.ProjectForm.value;

      // Supprimer dateCreation si elle est vide ou undefined
      if (!formData.dateCreation) {
        delete formData.dateCreation;
      }

      if (this.data && this.data.id) {
        // Mise à jour d'un projet existant
        this.ProjectService.updateProject(this.data.id, formData).subscribe({
          next: (projectResponse: any) => {
            // Vérifier si le statut est "décroché"
            if (formData.statutProjet === 'décroché' && this.data.contact) {
              const contactId = this.data.contact.id;
              const updatedContact = {
                ...this.data.contact,
                typeContact: 'client',
                nbProjets: (this.data.contact.nbProjets || 0) + 1
              };

              // Mettre à jour le contact
              this.ContactService.updateContact(contactId, updatedContact).subscribe({
                next: (contactResponse: any) => {
                  this._coreService.openSnackBar('Project and contact details updated successfully!');
                  this._dialogRef.close(true);
                },
                error: (err: any) => {
                  console.error('Error updating contact:', err);
                  this._coreService.openSnackBar('Project updated but failed to update contact.');
                  this._dialogRef.close(true);
                },
              });
            } else {
              this._coreService.openSnackBar('Project detail updated!');
              this._dialogRef.close(true);
            }
          },
          error: (err: any) => {
            console.error('Error updating project:', err);
            this._coreService.openSnackBar('Failed to update project.');
          },
        });
      } else {
        // Création d'un nouveau projet
        const projectData = {
          id: 0, // Valeur temporaire,
          nomProjet: formData.nomProjet,
          description: formData.description,
          statutProjet: formData.statutProjet,
          dateCreation: formData.dateCreation || undefined, // undefined si non fourni
          contactId: this.data.contactId // Assurez-vous que this.data.contactId est correct
        };

        this.ProjectService.createProject(projectData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Project added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Error creating project:', err);
            this._coreService.openSnackBar('Failed to add project.');
          },
        });
      }
    }
  }
  // Méthode pour récupérer les champs invalides
  getInvalidFields(): string[] {
    const invalidFields: string[] = [];
    Object.keys(this.ProjectForm.controls).forEach((field) => {
      const control = this.ProjectForm.get(field);
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
}