import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: String = 'http://localhost:3031/api/form/';
  formResult: any = null;

  constructor() { }

  getToken() {
    return localStorage.getItem('shuToken');
  }

  saveToken(token: string) {
    localStorage.setItem('shuToken', token);
  }

  isUserAdmin() {
    let adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      return true;
    }
    return false;
  }

  isUserSubmittedFormBefore() {
    let token = this.getToken();
    if (token) {
      return true;
    }
    return false;
  }
}
