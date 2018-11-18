import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = Constants.api;

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(`${this.baseUrl}/users`);
  }

  signup(data) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data);
  }

  changePassword(data) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data);
  }
}
