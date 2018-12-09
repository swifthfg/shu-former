import { Component, OnInit } from '@angular/core';
import {RestService} from "../rest.service";
import {DataService} from "../data.service";

@Component({
  selector: 'app-form-questions',
  templateUrl: './form-questions.component.html',
  styleUrls: ['./form-questions.component.css']
})
export class FormQuestionsComponent implements OnInit {
  allQuestions = [];

  constructor(private rest: RestService, private data: DataService) { }

  ngOnInit() {
    this.getAllQuestions();
  }

  async getAllQuestions() {
    try{
      const data = await this.rest.get(this.data.url + 'question/get-all');
      if (data['success']) {
        this.allQuestions = data['result'];
        for (let i = 0; i < this.allQuestions.length; i++) {
          let tempMaxScore = this.allQuestions[i].maxScore;
          this.allQuestions[i].numbers = Array(tempMaxScore).fill(0).map((x,i)=>i);
        }
      } else {
        alert('Error occured while getting questions!');
      }
    }catch (e) {
      console.log(e);
      alert(e.message);
    }
  }

}
