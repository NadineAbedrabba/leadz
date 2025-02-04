import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocsService {

private apiUrl = 'http://localhost:3000/projets'; // Remplace avec ton URL d'API réelle

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les projets
  getAllProjets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  private url = 'http://localhost:3000/document/documents';
   getDocuments(): Observable<any[]> {

    return this.http.get<any[]>(this.url);
}
 deleteProjet(id: number): Observable<void> {
  const url = `http://localhost:3000/projets/${id}`;
    return this.http.delete<void>(url);
  }
}
