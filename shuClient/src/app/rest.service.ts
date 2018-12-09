import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getHeaders() {
    const token = localStorage.getItem('dossToken');
    return token ? new HttpHeaders().set('Authorization', token) : null;
  }

  get(link: string) {
    return this.http.get(link, {headers: this.getHeaders()}).toPromise();
  }

  post(link: string, body: any) {
    return this.http.post(link, body, {headers: this.getHeaders()}).toPromise();
  }

}
