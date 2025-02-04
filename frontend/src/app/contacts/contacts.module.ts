import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Ajoutez CommonModule si nécessaire
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ContactAddEditComponent } from './contact-add-edit/contact-add-edit.component';
import { ContactViewDialogComponent } from './contact-view-dialog/contact-view-dialog.component';
import { DisplayContactListComponent } from './display-contact-list/display-contact-list.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ContactAddEditComponent,
    ContactViewDialogComponent,
    DisplayContactListComponent,
    ViewProjectsComponent,
  ],
  imports: [
    CommonModule, // Import nécessaire pour ngIf, ngFor, etc.
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    RouterModule.forChild([ // Utilisez forChild pour les modules enfants
      { path: 'view-projects/:id', component: ViewProjectsComponent },
    ]),
  ],
  exports: [
    ContactAddEditComponent,
    ContactViewDialogComponent,
    DisplayContactListComponent,
  ],
})
export class ContactModule {}
