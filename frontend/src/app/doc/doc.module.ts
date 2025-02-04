import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from './documents/documents.component';
import { FormsModule } from '@angular/forms';
import { DocsService } from './docs.service';



@NgModule({
  declarations: [DocumentsComponent],
  imports: [CommonModule, FormsModule],
  exports: [DocumentsComponent],
   providers: [DocsService]
})
export class DocModule {}
