import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('access_token'); // Vérifie si un token existe
    if (token) {
      return true; // Autorise l'accès
    } else {
      this.router.navigate(['/auth']); // Redirige vers la page d'authentification
      return false;
    }
  }
}
