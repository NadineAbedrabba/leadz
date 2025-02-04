import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prospect } from '../models/prospect.model';  // Assurez-vous que le modèle est bien importé
import { environment } from 'src/environnement';

@Injectable({
  providedIn: 'root'
})
export class ProspectService {
  private apiUrl = `${environment.apiUrl}/prospects`;

  constructor(private http: HttpClient) {}

  createProspect(prospect: Prospect): Observable<Prospect> {
    return this.http.post<Prospect>(this.apiUrl, prospect);
  }

  getAllProspects(): Observable<Prospect[]> {
    return this.http.get<Prospect[]>(this.apiUrl);
  }

  getProspectById(id: number): Observable<Prospect> {
    return this.http.get<Prospect>(`${this.apiUrl}/${id}`);
  }

  updateProspect(id: number, prospect: Prospect): Observable<Prospect> {
    return this.http.put<Prospect>(`${this.apiUrl}/${id}`, prospect);
  }

  deleteProspect(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
