// src/app/cycle.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CycleService {
  private apiUrl = 'http://localhost:3000/prospects/interested'; // L'URL de ton backend

  constructor(private http: HttpClient) {}

  getInterestedProspects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Appel GET à l'API
  }
  updateProgress(prospectId: number, progress: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/prospects/${prospectId}/progress`, { progress });
  }
}

