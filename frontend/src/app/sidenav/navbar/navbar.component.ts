import { computed, Output, signal } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar' ;
import {MatButtonModule  } from '@angular/material/button' ;
import { MatIconModule } from '@angular/material/icon' ;
import { MatSidenavModule } from '@angular/material/sidenav' ;
import { CustomSidenavComponent } from '../custom-sidenav/custom-sidenav.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone : true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CustomSidenavComponent,
    RouterModule
] , 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  collapsed=signal(false);
  sidenavWidth = computed( ()=> this.collapsed()? '73px' : '250px') ;
}
