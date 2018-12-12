import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RestService } from './rest.service';
import { FormNavigationComponent } from './form-navigation/form-navigation.component';
import { DataService } from "./data.service";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { FormQuestionsComponent } from './form-questions/form-questions.component';
import { FormResultComponent } from './form-result/form-result.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatRadioModule} from '@angular/material';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
  {path: 'form', component: FormQuestionsComponent},
  {path: 'form-result', component: FormResultComponent},
  {path: '**', redirectTo: 'form'},
];

@NgModule({
  declarations: [
    AppComponent,
    FormNavigationComponent,
    FormQuestionsComponent,
    FormResultComponent,
    AdminComponent,
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
  providers: [RestService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
