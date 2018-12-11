import {Component, DoCheck, OnInit} from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-form-navigation',
  templateUrl: './form-navigation.component.html',
  styleUrls: ['./form-navigation.component.css']
})
export class FormNavigationComponent implements OnInit, DoCheck {
  showQuestionButton = true;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.showQuestionButton = !this.data.isUserSubmittedFormBefore();
  }

  ngDoCheck() {
    this.showQuestionButton = !this.data.isUserSubmittedFormBefore();
  }

}
