import { Component, OnInit } from '@angular/core';
import {RestService} from "../rest.service";
import {DataService} from "../data.service";
import {Router} from "@angular/router";
import { v1 as uuid } from 'uuid';

@Component({
  selector: 'app-form-questions',
  templateUrl: './form-questions.component.html',
  styleUrls: ['./form-questions.component.css']
})
export class FormQuestionsComponent implements OnInit {
  allQuestions = [];
  isPageLoaded = false;

  constructor(private rest: RestService, private data: DataService, private router: Router) { }

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
          this.allQuestions[i].userScore = null;
        }
        setTimeout(() => {
          this.isPageLoaded = true;
        }, 1500);
      } else {
        alert('Error occured while getting questions!');
      }
    }catch (e) {
      console.log(e);
      alert(e.message);
    }
  }

  async onSubmit() {
    this.isPageLoaded = false;
    let token = this.data.getToken();
    let resObject = {fields: [], shuToken: null};
    resObject.shuToken = token ? token : uuid();
    this.data.saveToken(resObject.shuToken);

    for (let i = 0; i < this.allQuestions.length; i++) {
      let question = this.allQuestions[i];
      if (question.userScore === null) {
        this.isPageLoaded = true;
        alert('All questions must be answered!');
        return;
      }
      resObject.fields.push({fieldName: question.fieldName, score: question.userScore});
    }

    const data = await this.rest.post(this.data.url + 'submission/create', resObject);
    if (data['success']) {
      if (data['code'] && data['code'] === 600) {
        alert('You have already submitted form before. Your previous form result will be shown below.');
      }
      this.data.formResult = data['result'];
      this.isPageLoaded = true;
      this.router.navigate(['form-result']);
    } else {
      this.isPageLoaded = true;
      console.log('Something went wrong');
    }
  }
}
