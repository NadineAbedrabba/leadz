import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DocumentsComponent } from "./doc/documents/documents.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/guards/auth.guard";
import { DisplayContactListComponent } from "./contacts/display-contact-list/display-contact-list.component";
import { DisplayProjectListComponent } from "./projets/display-project-list/display-project-list.component";

// Définition des routes
const appRoutes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' }, // Redirection par défaut vers '/auth'
    { path: 'auth', component: AuthComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard] },
    { path: 'contacts', component: DisplayContactListComponent ,canActivate: [AuthGuard]}, // Route pour afficher DisplayContactListComponent
    { path: 'projets', component: DisplayProjectListComponent,canActivate: [AuthGuard] }, // Route pour afficher ViewProjectsComponent
    { path: '**', redirectTo: '/auth' } // Route fallback si aucune route ne correspond
];

// Exportation de RouterModule configuré avec les routes
export const routing = RouterModule.forRoot(appRoutes);
