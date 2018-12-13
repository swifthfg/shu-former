import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RestService } from './rest.service';
import { FormNavigationComponent } from './form-navigation/form-navigation.component';
import { DataService } from "./data.service";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FormQuestionsComponent } from './form-questions/form-questions.component';
import { FormResultComponent } from './form-result/form-result.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatRadioModule} from '@angular/material';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';
import {AuthInterceptor} from "./auth-interceptor";
import {JwtInterceptor} from "./jwt-interceptor";
import { SubmissionsComponent } from './admin/submissions/submissions.component';
import { QuestionsComponent } from './admin/questions/questions.component';

const appRoutes: Routes = [
  {path: 'form', component: FormQuestionsComponent},
  {path: 'form-result', component: FormResultComponent},
  { path: 'admin',
    component: AdminComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'submissions', component: SubmissionsComponent},
      {path: 'questions', component: QuestionsComponent},
    ]
  },
  {path: '**', redirectTo: 'form'},
];

@NgModule({
  declarations: [
    AppComponent,
    FormNavigationComponent,
    FormQuestionsComponent,
    FormResultComponent,
    AdminComponent,
    LoginComponent,
    SubmissionsComponent,
    QuestionsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [RestService,
              DataService,
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
