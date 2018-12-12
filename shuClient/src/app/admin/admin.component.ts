import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../data.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private data: DataService) { }

  ngOnInit() {
    if (!this.data.isUserAdmin()) {
      this.router.navigate(['admin', 'login']);
    }
  }

}
