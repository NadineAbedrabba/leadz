import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocModule } from './doc/doc.module';
import { ContactModule } from './contacts/contacts.module';
import { ProjetsModule } from './projets/projets.module';
import { RouterModule, Routes } from '@angular/router';
import { ViewProjectsComponent } from './contacts/view-projects/view-projects.component';

const routes: Routes = [
  { path: 'view-projects/:id', component: ViewProjectsComponent },];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,  AppRoutingModule, DocModule, ContactModule, OverlayModule,ProjetsModule, RouterModule.forRoot(routes),],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
