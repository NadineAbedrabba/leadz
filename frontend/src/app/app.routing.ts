import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthComponent } from "./auth/auth.component";
import { DocumentsComponent } from "./doc/documents/documents.component";

const APP_ROUTING : Routes= [
    { path: '', redirectTo: '/auth', pathMatch: 'full' }, // Redirige vers la route 'auth' par défaut

    { path: 'auth' , component :AuthComponent},
    { path: 'dashboard' , component :DashboardComponent},
    { path: 'documents' , component : DocumentsComponent}




]
export const routing = RouterModule.forRoot(APP_ROUTING);
