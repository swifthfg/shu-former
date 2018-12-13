import { Component, OnInit } from '@angular/core';
import {RestService} from "../../rest.service";
import {Router} from "@angular/router";
import {DataService} from "../../data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  btnDisabled = false;

  constructor(private rest: RestService, private router:  Router, private data: DataService) { }

  ngOnInit() {
  }

  validate() {
    return (this.email && this.password);
  }

  async login() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data = await this.rest.post(
          this.data.accUrl + 'login',
          {
            email: this.email,
            password: this.password
          }
        );
        if (data['success']) {
          localStorage.setItem('adminToken', data['adminToken']);
          this.router.navigate(['admin']);
        } else {
          alert(data['message']);
        }
      }
    } catch (error) {
      alert(error['message']);
    }
    this.btnDisabled = false;
  }

  onSubmit() {
    this.login();
  }
}
