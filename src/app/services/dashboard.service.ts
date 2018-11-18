import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = Constants.api;

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(`${this.baseUrl}/dashboard`);
  }
}
