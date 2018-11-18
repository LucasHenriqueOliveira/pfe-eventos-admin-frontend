import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UsoService {

  private baseUrl = Constants.api;

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(`${this.baseUrl}/uso`);
  }

  save(data) {
    return this.http.post(`${this.baseUrl}/uso`, data);
  }

  remove(id) {
    return this.http.delete(`${this.baseUrl}/uso/${id}`);
  }

  edit(data) {
    return this.http.put(`${this.baseUrl}/uso`, data);
  }
}
