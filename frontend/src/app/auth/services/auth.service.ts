import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environnement';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`; // Base URL pour les requêtes

  constructor(private http: HttpClient) {}

  // Fonction de connexion
  login(credentials: { username: string; password: string }): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, credentials);
  }

  // Récupérer le profil utilisateur
  getProfile(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }
}
