import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private baseUrl = Constants.api;

  constructor(private http: HttpClient) { }

  status() {
    return this.http.get(`${this.baseUrl}/status`);
  }

  save(data) {
    return this.http.post(`${this.baseUrl}/status`, data);
  }

  getPerguntas(id) {
    return this.http.get(`${this.baseUrl}/status/${id}`);
  }
}
