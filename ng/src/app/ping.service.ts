//our root app component
import {Component, Injectable} from '@angular/core';
import {Http, Jsonp} from '@angular/http';
import {Subject, Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class PingService {
  pingStream: Subject<number> = new Subject<number>();
  ipStream: Subject<string> = new Subject<string>();
  ping: number = 0;
  url: string = "https://cors-test.appspot.com/test";
  
  constructor(private _http: Http, private jsonp: Jsonp) {
    Observable.interval(700)
      .subscribe((data) => {
        let timeStart: number = performance.now();
        
        this._http.get(this.url)
          .subscribe((data) => {
            let timeEnd: number = performance.now();
            
            let ping: number = timeEnd - timeStart;
            this.ping = ping;
            this.pingStream.next(ping);
          });
      });

      this.jsonp.get('//api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK').subscribe(response => this.ipStream.next(response.json().ip));
  }


}