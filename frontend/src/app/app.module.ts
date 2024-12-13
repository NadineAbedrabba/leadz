import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocModule } from './doc/doc.module';
import { ContactModule } from './contacts/contacts.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,  AppRoutingModule, DocModule, ContactModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
