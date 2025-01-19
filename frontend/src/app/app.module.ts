import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocModule } from './doc/doc.module';
import { NavbarComponent } from './sidenav/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomSidenavComponent } from "./sidenav/custom-sidenav/custom-sidenav.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { routing } from './app.routing';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotEmptyDirective } from './directives/not-empty.directive'; // Importer les formulaires réactifs
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/services/auth.service';
import { AuthGuard } from './auth/guards/auth.guard';

@NgModule({
  declarations: [AppComponent, AuthComponent, DashboardComponent, LoginComponent, NotEmptyDirective ],
  imports: [BrowserModule, AppRoutingModule, DocModule, BrowserAnimationsModule, NavbarComponent, CustomSidenavComponent ,routing ,ReactiveFormsModule ,FormsModule , HttpClientModule],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
