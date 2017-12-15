import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
 import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable'; 


@Injectable()
export class CheckinLabelService implements TranslateLoader  {
    contentHeader = new Headers({"Content-Type": "application/json","Access-Control-Allow-Origin":"*"});

    constructor(private http: Http) {}
    getTranslation(lang: string): Observable<any>{
        var apiAddress = "./assets/i18n/"+ lang+".json";
        return Observable.create(observer => {
          this.http.get(apiAddress, { headers: this.contentHeader }).subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();               
                },
            error => {
                //  failed to retrieve from api, switch to local
                this.http.get("./assets/i18n/en.json").subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();               
                })
            }
            );
        }); 
    }
}