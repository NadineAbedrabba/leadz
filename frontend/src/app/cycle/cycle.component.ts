import { Component, OnInit } from '@angular/core';
import { CycleService } from './cycle.service';
import { ProspectService } from '../services/prospect.service';

import * as bootstrap from 'bootstrap';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environnement';
interface Document {
  documentId: number;
  name: string;
  imported: boolean;
  status: string;
}
interface Step {
  name: string;
  completed: boolean;
  documents?: Document[]; 
  type?: string;
}

interface Card {
  id: number;
  name: string;
  steps: Step[];
  status: 'pending' | 'dropped' | 'completed';
}


@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.css']
})
export class CycleComponent implements OnInit {
  

  cards: {  id: number ,name: string, steps: Step[], status: string, progress: number }[] = [];
  constructor(private cycleService: CycleService, private http: HttpClient) {}


  ngOnInit(): void {
    this.loadInterestedProspects(); 
    /*if (this.selectedCard) {
      const savedSteps = localStorage.getItem('steps');
      if (savedSteps) {
        this.selectedCard.steps = JSON.parse(savedSteps);
      }
    } else {
      console.error('Aucune carte sélectionnée.');
    }*/
    
  }


  // Charger les prospects intéressés
  loadInterestedProspects(): void {
    this.cycleService.getInterestedProspects().subscribe((prospects) => {
      console.log('Prospects reçus:', prospects); // Inspectez la structure des données
      this.cards = prospects.map((prospect) => {
        console.log('Prospect ID:', prospect.id); // Vérifiez que l'ID est bien présent
        return {
          id: prospect.prospectId,
          name: prospect.name,
          steps: prospect.steps || [],
          status: prospect.status || 'pending',
          progress: prospect.progress 
      }});
      this.progressValues = this.cards.map(card => card.progress || 0);
    });
  }
  


  

 
  selectedCard: Card | null = null;
  selectedIndex: number = -1;
  progressValues: number[] = this.cards.map(() => 0);// Initialisation des progressions
  clientProjects: Record<string, number> = {}; // Pour suivre les projets par client

  openModal(card: any, index: number): void {
    console.log('Carte sélectionnée:', card);
    this.selectedCard = card;
    this.selectedIndex = index;
    const modalElement = document.getElementById('stepsModal') as HTMLElement;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }


  toggleStep(stepIndex: number) {
    if (this.selectedCard && this.selectedIndex !== -1) {
      this.selectedCard.steps[stepIndex].completed = !this.selectedCard.steps[stepIndex].completed;
      this.updateProgress();
       // Sauvegarder l'état des étapes 
    this.saveStepsState();
    }
  }
  saveStepsState(): void {
    // Convertir les étapes en JSON et les enregistrer 
    if (this.selectedCard) {
      localStorage.setItem('steps', JSON.stringify(this.selectedCard.steps));
    }
  }
  
  

  updateProgress() {
    if (this.selectedCard  && this.selectedIndex !== -1) {
      const totalSteps = this.selectedCard.steps.length;
  
      // Nombre d'étapes complétées
      const completedSteps = this.selectedCard.steps.filter(step => step.completed).length;
  
      // Limite de progression à 50 % pour les étapes initiales
      const maxProgress = 100; // Maximum pour atteindre "Client"
      const progressPerStep = maxProgress / totalSteps; // Proportion par étape
  
      // Calcul de la progression en fonction des étapes complétées
      this.progressValues[this.selectedIndex] = completedSteps * progressPerStep;
      // Console log pour vérifier le contenu de selectedCard
    console.log('selectedCard:', this.selectedCard);
    console.log('selectedCardName:', this.selectedCard.name);
    console.log('selectedCardId:', this.selectedCard.id);

    // Utilisez l'ID du prospect à partir de selectedCard
    if (this.selectedCard.id) {
      console.log('Prospect ID:', this.selectedCard.id); // Afficher l'ID du prospect
      this.updateProgressInBackend(this.selectedCard.id, this.progressValues[this.selectedIndex]);
    } else {
      console.error('Prospect ID est manquant!');
      return;
    }
     //this.selectedCard.prospectId
      // Si ce prospect devient un "client"
      if (this.progressValues[this.selectedIndex] >= maxProgress) {
        const clientName = this.selectedCard.name;

        // Incrémente les projets du client
        if (!this.clientProjects[clientName]) {
          this.clientProjects[clientName] = 1;
        } else {
          this.clientProjects[clientName]++;
        }

        
      }
     
    }
  }
  getProgress(): number {
    if (this.selectedCard && Array.isArray(this.selectedCard.steps)) {
      const totalSteps = this.selectedCard.steps.length;
      const completedSteps = this.selectedCard.steps.filter((step: Step) => step.completed).length;
      return (completedSteps / totalSteps) * 100;
    }
    return 0;
  }
  updateProgressInBackend(prospectId: number, progress: number): void {
    console.log('Tentative de mise à jour de la progression pour le prospect:', prospectId);
    console.log('Nouvelle valeur de progression:', progress);
  
    if (!prospectId) {
      console.error('Erreur: L\'ID du prospect est manquant!');
      return;
    }
  
    // Afficher l'URL de la requête pour vérifier que l'ID est bien intégré
    const url = `http://localhost:3000/prospects/${prospectId}/progress`;
    console.log('URL de la requête:', url);
  
    this.cycleService.updateProgress(prospectId, progress).subscribe(
      response => {
        console.log('Réponse reçue après mise à jour de la progression:', response);
        console.log('Progression mise à jour dans la base de données avec succès:', response);
      },
      error => {
        console.error('Erreur lors de la mise à jour de la progression:', error);
        // Afficher l'erreur complète pour mieux comprendre ce qui se passe
        console.error('Détails de l\'erreur:', error);
      }
    );
  }
  
  
  saveProgress(prospectId: number, progress: number): void {
    this.http.patch(`${environment.apiUrl}/prospects/${prospectId}/progress`, { progress })
      .subscribe(
        response => console.log('Progression enregistrée avec succès', response),
        error => console.error('Erreur lors de l’enregistrement de la progression', error)
      );
  }
  canActivateStep(index: number): boolean {
    if (this.selectedCard) {
      // Permettre uniquement la première étape ou celles déjà complétées immédiatement avant.
      return index === 0 || this.selectedCard.steps[index - 1]?.completed;
    }
    return false;
  }

  importDocument(documentType: string, stepIndex: number): void {
    // Créez un élément input de type fichier de manière dynamique
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    
    // Obtenez l'étape sélectionnée
    const step = this.selectedCard?.steps[stepIndex];
  
    // Si l'étape et les documents existent
    if (step && step.documents) {
      // Trouver le document spécifique en fonction du type
      const document = step.documents.find(doc => doc.name === documentType);
      
      // Vérifier si le document est trouvé
      if (document) {
        // Créez un gestionnaire d'événement pour capturer le fichier sélectionné
        fileInput.onchange = (event: Event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          
          if (file) {
            console.log(`Fichier importé pour ${documentType} à l'étape ${stepIndex + 1}: ${file.name}`);
            alert(`Fichier "${file.name}" importé pour ${documentType} à l'étape ${stepIndex + 1}`);
            
            // Traitez le fichier 
            this.processFile(file, documentType, stepIndex);
  
            // Marquer le document comme importé
            document.imported = true;
  
            // Afficher un message pour indiquer que le document a été importé
            alert(`${documentType} a été importé pour l'étape "${step.name}"`);
          } else {
            alert('Aucun fichier sélectionné.');
          }
        };
        
        // Déclenche l'élément input pour que l'utilisateur puisse sélectionner un fichier
        fileInput.click();
      } else {
        alert(`Document "${documentType}" non trouvé pour l'étape "${step.name}"`);
      }
    } else {
      alert('Cette étape ne contient pas de documents à importer.');
    }
  }
    
    processFile(file: File, documentType: string, stepIndex: number): void {
      if (!this.selectedCard) {
        console.error("Aucune carte sélectionnée.");
        return;
      }
    
      console.log(`Traitement du fichier: ${file.name}`);
      
    if (!this.selectedCard) {
      console.error("Aucune carte sélectionnée.");
      return;
    }
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentNom', file.name);
      formData.append('projet', 'Projet par défaut')  
      formData.append('status', this.selectedCard.status || 'pending');
      formData.append('typeDocument', documentType);
      //formData.append('contenu', fileContent.toString());
      formData.append('natureDocument', this.getNatureDocument(documentType));
    
      const apiUrl = `${environment.apiUrl}/document/upload/${this.selectedCard.id}`;
    
      this.http.post(apiUrl, formData).subscribe(
        (response: any) => {
          console.log(`${documentType} uploaded successfully`, response);
          alert(`${documentType} importé avec succès!`);
          if (!this.selectedCard) {
            console.error("Aucune carte sélectionnée.");
            return;
          }
          const step = this.selectedCard.steps[stepIndex];
          if (step && step.documents) {
            const doc = step.documents.find((d: { name: string; imported: boolean }) => d.name === documentType);
            if (doc) {
              doc.imported = true;
            }
          }
          this.updateProgress();
        },
        (error) => {
          console.error(`${documentType} upload failed`, error);
          alert('Une erreur est survenue lors de l\'importation du fichier.');
        }
      );
    } 
    getNatureDocument(typeDocument: string): 'Propal' | 'Devis' | 'Contrat' | 'Cahier de charge' {
      switch (typeDocument) {
        case 'Proposition commerciale':
          return 'Propal';
        case 'Devis':
          return 'Devis';
        case 'Contrat':
          return 'Contrat';
        case 'CDC':
          return 'Cahier de charge';
        default:
          return 'Propal'; // Valeur par défaut
      }
    }
    hasContractOrCDC(step: Step): boolean {
      return step.documents?.some(doc => doc.name === 'Contrat' || doc.name === 'CDC') ?? false;
    }
  
    
    validateStep(stepIndex: number): void {
      const step = this.selectedCard?.steps[stepIndex];
      if (step && step.type === 'validation') {
        step.completed = true; 
        this.selectedCard!.status = 'completed';
        this.updateProgress(); 
        alert('Contrat et CDC validés avec succès !');
      } else {
        console.error('L\'étape sélectionnée n\'est pas valide ou n\'a pas le type "validation".');
      }
    }
  
  rejectStep(stepIndex: number): void {
    const step = this.selectedCard?.steps[stepIndex];
    if (step && step.type === 'validation') {
      step.completed = false;
      this.selectedCard!.status = 'dropped'; 
      this.updateProgress(); 
      alert('Contrat et CDC refusés. Le client est maintenant marqué comme "dropped".');
    }
  }
   // Méthode pour déclencher la validation d'un document (contrat ou CDC)
   validateDocument(documentId: number): void {
    if (!documentId) {
        console.error("Erreur : documentId est invalide.");
        alert("Une erreur est survenue : documentId est invalide.");
        return;
    }

    // Vérification de la carte sélectionnée
    if (!this.selectedCard || !this.selectedCard.steps || this.selectedCard.steps.length < 2) {
        console.error(" Impossible de valider : Pas assez d'étapes pour identifier l'étape précédente.");
        alert("Aucune étape précédente disponible pour validation.");
        return;
    }

    // Trouver l'étape qui contient ce document
    let currentStepIndex = -1;
    this.selectedCard.steps.forEach((step, index) => {
        if (step.documents?.some(doc => doc.documentId === documentId)) {
            currentStepIndex = index;
        }
    });

    if (currentStepIndex <= 0) { // Vérifie s'il y a une étape précédente
        console.error(" Il n'y a pas d'étape précédente pour valider ce document.");
        alert("Il n'y a pas d'étape précédente pour valider ce document.");
        return;
    }

    // Étape précédente
    const previousStep = this.selectedCard.steps[currentStepIndex - 1];

    // Vérifier si l'étape précédente a des documents
    if (!previousStep.documents || previousStep.documents.length === 0) {
        console.warn(" L'étape précédente ne contient aucun document à valider.");
        alert("L'étape précédente ne contient aucun document à valider.");
        return;
    }

    // Trouver le document à valider dans l'étape précédente
    const documentToValidate = previousStep.documents.find(doc => doc.documentId === documentId);

    if (!documentToValidate) {
        console.warn(" Document non trouvé dans l'étape précédente.");
        alert("Document non trouvé dans l'étape précédente.");
        return;
    }

    // Appel API pour valider le document
    this.http.put(`${environment.apiUrl}/document/validate/${documentId}`, {}).subscribe(
      (response: any) => {
        console.log(' Document validé avec succès', response);
        alert(' Document validé avec succès !');

        // Mettre à jour l'interface utilisateur
        documentToValidate.imported = true;
        documentToValidate.status = 'Valide';
      },
      (error) => {
        console.error(' Erreur lors de la validation du document', error);
        alert(' Une erreur est survenue lors de la validation du document.');
      }
    );
}





}
