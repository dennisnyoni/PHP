import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Martial Arts Movies';
  imgUrl: any = './assets/rafiki/rafiki.png';
  private baseUrl = 'http://localhost:3535/api/movies/logout';

  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
  },{
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  },{
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];

  constructor(private http: HttpClient, // private authenticationService: AuthenticationService,
              private router: Router) { }

  handleLogout(): Observable<any>{
    // this.authenticationService.logout();
    // this.router.navigate(['/login']);
    // this.router.navigate(['/'+this.http.post(`${this.baseUrl}`,'students')]);
    // this.http.post(`${this.baseUrl}`)
    const headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'});
    return this.http.post(`${this.baseUrl}`,'students', { headers : headers });
    // return this.http.post(`${this.baseUrl}`,'',{ headers : headers });
    // 'students';
  }


}
