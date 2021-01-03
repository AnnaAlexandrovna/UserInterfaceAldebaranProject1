import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Status1} from "./status1";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'http://localhost:8080/changecourse';
// const localUrl1 = 'http://localhost:8080/courses/changecourse';

@Injectable({
  providedIn: 'root'
})
export class Change1 {

  constructor(private http: HttpClient) {
  }

  postCommand(idOfCourse: string, link: string): Observable <HttpResponse<Status1>> {
    const body = {idOfCourse: idOfCourse, link: link };
    return this.http.post<Status1>(localUrl1, body, {
      observe: 'response', headers: headers
    });
  }
}
