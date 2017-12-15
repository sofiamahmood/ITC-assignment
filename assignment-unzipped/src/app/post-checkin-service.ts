import { Injectable } from '@angular/core';
import { Headers, Http,HttpModule, Response,  RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClientModule, HttpClient} from '@angular/common/http';
 import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable'; 

@Injectable()
export class PostCheckinService {
	headers: Headers;
    options: RequestOptions;
	validation_errors: Array<any> = [];
  constructor(private http: Http) {
	this.headers = new Headers({ 'Content-Type': 'application/json' });
  }
   validateCheckinForm(bookingCodeVal, familyNameVal): Observable<any>{
		var config = {bookingCode: bookingCodeVal, familyName: familyNameVal};
		 this.options = new RequestOptions({ headers: this.headers, search: config });
        return Observable.create(observer => {
          this.http.get('/api/posts',this.options).subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();               
                },
             err => {
				observer.next(err);
                observer.complete(); 
			 }
            );
        }); 
    }

}