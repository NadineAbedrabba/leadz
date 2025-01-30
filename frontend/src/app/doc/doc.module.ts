import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from './documents/documents.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DocumentsComponent],
  imports: [CommonModule, FormsModule],
  exports: [DocumentsComponent],
})
export class DocModule {}
