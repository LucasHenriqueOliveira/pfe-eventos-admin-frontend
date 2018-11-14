import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  get(): Observable<[]> {
    return this.http.get<[]>(`${this.baseUrl}/dashboard`);
  }
}
