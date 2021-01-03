import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Nameandid} from './nameandid';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'http://localhost:8080/courses';

@Injectable({
  providedIn: 'root'
})
export class Getnameandid {
  constructor(private http: HttpClient) {
  }

  getCommand(): Observable<Nameandid[]> {

    return this.http.get(localUrl1 + "?projection=light").pipe(map(data => {
      let nameAndIdList = data["courseList"];
      return nameAndIdList.map(function (course: any) {
        return {nameOfCourse: course.nameOfCourse, idOfCourse: course.idOfCourse};
      })
    }))
  }
}
