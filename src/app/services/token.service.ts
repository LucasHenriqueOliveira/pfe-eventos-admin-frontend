import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';

@Injectable()
export class TokenService {
  private iss = {
    login: Constants.api + '/login',
    signup: Constants.api + '/signup'
  };

  constructor() { }

  handle(token, user) {
    this.set(token, user);
  }

  set(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}
