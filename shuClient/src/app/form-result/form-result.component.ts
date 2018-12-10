import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {RestService} from "../rest.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-result',
  templateUrl: './form-result.component.html',
  styleUrls: ['./form-result.component.css']
})
export class FormResultComponent implements OnInit {
  isPageLoaded = false;
  formResult: any = null;

  constructor(private data: DataService, private rest: RestService, private router: Router) { }

  ngOnInit() {
    this.getScoreIfItExists();
  }

  async getScoreIfItExists() {
    this.isPageLoaded = false;
    if (this.data.isUserSubmittedFormBefore()) {
      try {
        const data = await this.rest.post(this.data.url + 'submission/get-by-token', {shuToken: this.data.getToken()});
        if (data['success']) {
          this.formResult = data['result'];
          this.isPageLoaded = true;
        } else {
          alert(data['message']);
        }
      } catch (e) {
        alert(e.message);
        console.log(e);
      }
    } else {
      this.router.navigate(['form']);
    }
  }

}
