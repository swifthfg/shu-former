import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent implements OnInit {

  constructor(public data: DataService) { }

  ngOnInit() {
  }

}
