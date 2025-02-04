import { computed, Output, signal } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar' ;
import {MatButtonModule  } from '@angular/material/button' ;
import { MatIconModule } from '@angular/material/icon' ;
import { MatSidenavModule } from '@angular/material/sidenav' ;
import { CustomSidenavComponent } from '../custom-sidenav/custom-sidenav.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone : true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CustomSidenavComponent,
    RouterModule] , 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  collapsed=signal(false);
  sidenavWidth = computed( ()=> this.collapsed()? '73px' : '250px') ;

  isLoggedIn = signal(false);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus(); // Vérifier l'état de la connexion au démarrage
  }

  // Fonction pour vérifier si l'utilisateur est connecté
  checkLoginStatus(): void {
    const token = localStorage.getItem('access_token');
    this.isLoggedIn.set(!!token); // Si un jeton existe, l'utilisateur est connecté
    if (!this.isLoggedIn()) {
      this.collapsed.set(true); // Si non connecté, la sidebar est repliée
    }
  }  
}
