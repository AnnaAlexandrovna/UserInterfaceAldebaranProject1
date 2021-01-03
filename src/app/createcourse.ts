import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Status1} from "./status1";
import {Stepinfo} from "./stepinfo";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'http://localhost:8080/newcourse';
// const localUrl1 = 'http://localhost:8080/courses/newcoursenewcourse';

@Injectable({
  providedIn: 'root'
})
export class Createcourse {

  constructor(private http: HttpClient) {
  }

  postCommand(link: string): Observable<HttpResponse<Status1>> {
    const body = { link: link };
    return this.http.post<Status1>(localUrl1, body, {
      observe: 'response', headers: headers
    });
  }
}
