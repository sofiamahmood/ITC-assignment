import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Headers, Http,HttpModule, Response } from "@angular/http";
import { HttpClientModule, HttpClient} from '@angular/common/http';
 import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable'; 
import { PostCheckinService } from "./post-checkin-service"

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{	
	posts: any = [];
	bookingSuccessful: boolean = false;
	validation_errors: Array<any> = [];
    constructor(private translate: TranslateService, private postCheckinService: PostCheckinService) {
        translate.addLangs(["en", "nl"]);
        translate.setDefaultLang('en');
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|nl/) ? browserLang : 'en');
		
    }
	bookingCodeFormControl = new FormControl('', [
		Validators.required,
		Validators.pattern('[a-zA-Z0-9]+'),
	  ]);
	
	 familyNameFormControl = new FormControl('', [
		Validators.required,
		Validators.pattern('[a-zA-Z]+'),
	  ]);
	   checkinFormSubmit(event) {
		let bookingCodeVal = this.bookingCodeFormControl.value;
		let familyNameVal = this.familyNameFormControl.value;
		if(bookingCodeVal != "" && familyNameVal != ""){
		  this.postCheckinService.validateCheckinForm(bookingCodeVal, familyNameVal).subscribe(posts => {
		  this.posts = posts;
		  this.validation_errors = [];
		  if(this.posts.status == 200){
			this.bookingSuccessful = true;
		  }else if(this.posts.status == 400){
			this.bookingSuccessful = false;
			let errors = this.posts.json().errorMsg;
			this.validation_errors.push(errors);
		  }
		},
          err => {
            // Something went wrong
			this.validation_errors.push('Internal server Error');
         });
		}
		
	  }
	

	  matcher = new MyErrorStateMatcher();
}
