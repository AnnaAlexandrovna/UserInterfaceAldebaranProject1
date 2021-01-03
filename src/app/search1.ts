import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Nameandid} from './nameandid';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'http://localhost:8080/search';
// const localUrl1 = 'http://localhost:8080/courses?search=';
@Injectable({
  providedIn: 'root'
})
export class Search1 {
  constructor(private http: HttpClient) {
  }

  getCommand2(userIn: string): Observable<Nameandid[]> {

    return this.http.get(localUrl1 + "?" + userIn).pipe(map(data => {
      let nameAndIdList = data["courseList"];
      return nameAndIdList.map(function (course: any) {
        return {nameOfCourse: course.nameOfCourse, idOfCourse: course.idOfCourse};
      })
    }))
  }
}
