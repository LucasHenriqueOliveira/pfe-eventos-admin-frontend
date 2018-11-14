import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramacaoService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  get(): Observable<[]> {
    return this.http.get<[]>(`${this.baseUrl}/programacao`);
  }

  getList(id): Observable<[]> {
    return this.http.get<[]>(`${this.baseUrl}/programacao/${id}`);
  }

  save(data) {
    return this.http.post(`${this.baseUrl}/programacao`, data);
  }

  remove(id) {
    return this.http.delete(`${this.baseUrl}/programacao/${id}`);
  }

  edit(data) {
    return this.http.post(`${this.baseUrl}/programacao-edit`, data);
  }

  finalizar(data) {
    return this.http.post(`${this.baseUrl}/programacao-finalizar`, data);
  }

  desabilitar(data) {
    return this.http.post(`${this.baseUrl}/programacao-desabilitar`, data);
  }
}
