import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: String = 'http://localhost:3031/api/form/';
  accUrl: String = 'http://localhost:3031/api/accounts/';
  formResult: any = null;
  user: any = null;
  questions: any = null;
  submissions: any = null;

  constructor(private rest: RestService, private router: Router) {}

  getToken() {
    return localStorage.getItem('shuToken');
  }

  getAdminToken() {
    return localStorage.getItem('adminToken');
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

  async getInitialAppData() {
    if (this.isUserAdmin()) {
      try {
        const data = await this.rest.get(this.accUrl + 'app-data');
        if (data['success']) {
          this.user = data['result']['user'];
          this.questions = data['result']['questions'];
          this.questions = data['result']['submissions'];
        } else {
          console.error(data);
        }
      } catch (error) {
        alert(error.message);
        console.error(error);
        this.router.navigate(['admin', 'login']);
      }
    }
  }

}
