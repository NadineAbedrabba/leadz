import { Component } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent {
  searchTerm: string = '';
  url = 'assets/Compte-renduBlockChain.pdf';
  documents = ['Propal', 'Cahier des Charges', 'Contrat', 'Facture'];
  projets = [
    {
      nom: 'Projet Docker',
      description: 'Gestion des conteneurs avec Docker.',
      image: '/assets/docker.webp',
    },
    {
      nom: 'Projet Angular',
      description: 'Application web développée avec Angular.',
      image: '/assets/angular.webp',
    },
    {
      nom: 'Projet Spring Boot',
      description: ' Application API REST avec Spring Boot.',
      image: '/assets/springboot.png',
    },
    {
      nom: 'Projet Docker',
      description: 'Gestion des conteneurs avec Docker.',
      image: '/assets/docker.webp',
    },
    {
      nom: 'Projet Angular',
      description: 'Application web développée avec Angular.',
      image: '/assets/angular.webp',
    },
    {
      nom: 'Projet Spring Boot',
      description: ' Application API REST avec Spring Boot.',
      image: '/assets/springboot.png',
    },
    {
      nom: 'Projet Docker',
      description: 'Gestion des conteneurs avec Docker.',
      image: '/assets/docker.webp',
    },
    {
      nom: 'Projet Angular',
      description: 'Application web développée avec Angular.',
      image: '/assets/angular.webp',
    },
    {
      nom: 'Projet Spring Boot',
      description: ' Application API REST avec Spring Boot.',
      image: '/assets/springboot.png',
    },
  ];
  filteredProjets() {
    if (!this.searchTerm) {
      return this.projets;
    }
    return this.projets.filter((projet) =>
      projet.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  openDocument(url: string): void {
    // Ouvrir le document dans une nouvelle fenêtre ou un nouvel onglet
    window.open(url, '_blank');
  }
}
