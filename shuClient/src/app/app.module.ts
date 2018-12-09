import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RestService } from './rest.service';
import { FormNavigationComponent } from './form-navigation/form-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    FormNavigationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
