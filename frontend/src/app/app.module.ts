import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocModule } from './doc/doc.module';
import { CycleComponent } from './cycle/cycle.component';
import { CardComponent } from './card/card.component';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    AppComponent,
    CycleComponent,
    CardComponent,

  ],
  imports: [BrowserModule,  AppRoutingModule, DocModule , HttpClientModule ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
