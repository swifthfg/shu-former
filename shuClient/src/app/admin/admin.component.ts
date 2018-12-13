import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {DataService} from "../data.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private router: Router, public data: DataService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && val.url === '/admin') {
        this.data.getInitialAppData();
      }
    });
  }

  ngOnInit() {
    if (!this.data.isUserAdmin()) {
      this.router.navigate(['admin', 'login']);
    } else {
      this.data.getInitialAppData();
    }
  }

  logout() {
    this.data.submissions = null;
    this.data.questions = null;
    this.data.user = null;
    localStorage.removeItem('adminToken');
    this.router.navigate(['admin', 'login']);
  }

}
