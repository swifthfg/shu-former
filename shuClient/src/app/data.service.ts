import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: String = 'http://localhost:3031/api/form/';
  constructor() { }

  getToken() {
    return localStorage.getItem('shuToken');
  }
}
