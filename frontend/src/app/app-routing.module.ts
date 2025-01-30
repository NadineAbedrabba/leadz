import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProjectsComponent } from './contacts/view-projects/view-projects.component';
import { DisplayContactListComponent } from './contacts/display-contact-list/display-contact-list.component';
import { DisplayProjectListComponent } from './projets/display-project-list/display-project-list.component';

const routes: Routes = [
  { path: 'contacts', component: DisplayContactListComponent }, // Route pour afficher DisplayContactListComponent
  { path: 'projets', component: DisplayProjectListComponent }, // Route pour afficher ViewProjectsComponent
  { path: '', redirectTo: '/contacts', pathMatch: 'full' }, // Redirection par défaut vers /contacts
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
