import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocModule } from './doc/doc.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,  AppRoutingModule, DocModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
