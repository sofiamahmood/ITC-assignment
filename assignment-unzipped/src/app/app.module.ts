import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClientModule,HttpClient} from '@angular/common/http';

import {MatInputModule,MatButtonModule,MatSelectModule, MatIconModule,} from '@angular/material';
import {FormsModule, ReactiveFormsModule, NG_VALIDATORS,Validator,AbstractControl,ValidatorFn} from "@angular/forms";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { CheckinLabelService } from "./checkin-label-service";
import { Headers, Http,HttpModule, Response } from "@angular/http";
import { PostCheckinService } from "./post-checkin-service";
import { AppComponent } from './app.component';


import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
	BrowserAnimationsModule,
	NoopAnimationsModule,
	FormsModule,
	ReactiveFormsModule,
	MatInputModule,
	MatButtonModule,
	MatSelectModule,
	MatIconModule,
	HttpClientModule,
	HttpModule,
	TranslateModule.forRoot({
     loader: {
        provide: TranslateLoader,
        useClass: CheckinLabelService,
        deps: [HttpClient]
      }
  })
  ],
  providers: [PostCheckinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
