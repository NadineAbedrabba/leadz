import { Component } from '@angular/core';
import { DocsService } from '../docs.service';

interface Document {
  documentId: number;
  projet: string;
  status: string;
  documentNom: string;
  typeDocument: string;
  contenu: string;
  natureDocument: string;
}


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})

export class DocumentsComponent {
    selectedProjet: any;
  openModal(projet: any): void {
    this.selectedProjet = projet;
    console.log('Projet sélectionné:', this.selectedProjet);
  }
  searchTerm: string = '';
  url = 'assets/Compte-renduBlockChain.pdf';
  naturedocuments = ['Propal', 'Cahier des Charges', 'Contrat', 'Devis'];
  images = [
       '/assets/docker.webp',

       '/assets/angular.webp',

       '/assets/springboot.png'
  ];
  image= '/assets/angular.webp';
  projets: any[] = [];
   document: any[] = [];
  selectedDocument: any = null;
  selectedNature: string = '';
  documents: Document[] = [];
  constructor(private docsService: DocsService) { }

  ngOnInit(): void {
    this.loadProjets();
    this.loadDocuments();

  }

  loadProjets(): void {
    this.docsService.getAllProjets().subscribe(
      (data) => {
        this.projets = data;
      console.log('projets chargés avec succès:', this.projets);

      },
      (error) => {
        console.error('Erreur lors de la récupération des projets', error);
      }
    );
  }
  filteredProjets() {
    if (!this.searchTerm) {
      return this.projets;
    }
    return this.projets.filter((projet) =>
      projet.nomProjet.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
   loadDocuments() {
    this.docsService.getDocuments().subscribe(
      (data: Document[]) => {
        this.documents = data;
        console.log('Documents chargés avec succès:', this.documents);
      },
      (error) => {
        console.error('Erreur lors de la récupération des documents', error);
      }
    );}
 openDocument(natureDocument: string , nomProjet :string ): void {
    console.log('natureDocument:', natureDocument);
    const document = this.documents.find(doc =>
    doc.natureDocument === natureDocument && doc.projet === nomProjet);

    if (document) {
       const documentNom = document.documentNom;
    const typeDocument = document.typeDocument;
    const contenu = document.contenu;

    if (typeDocument === 'application/pdf') {
      // Si le contenu est un PDF encodé en base64, vous pouvez l'afficher ainsi :
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        const pdfWindow = newWindow.document.createElement('embed');
        pdfWindow.src = 'data:application/pdf;base64,' + contenu;
        pdfWindow.type = 'application/pdf';
        pdfWindow.style.width = '100%';
        pdfWindow.style.height = '100%';
        newWindow.document.body.appendChild(pdfWindow);
      }
    } else {
      // Pour les autres types de documents comme les fichiers texte
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write('<pre>' + contenu + '</pre>');
      }
    }
  } else {
    console.log('Aucun document trouvé pour cette nature');
  }
  }
deleteProjet(id: number): void {
    this.docsService.deleteProjet(id).subscribe(
      () => {
        console.log(`Projet ${id} supprimé avec succès`);
      },
      (error) => {
        console.error('Erreur lors de la suppression du projet', error);
      }
    );
  }

}
