import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Course} from './course';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'http://localhost:8080/course';

@Injectable({
  providedIn: 'root'
})
export class Getcardinfo {

  constructor(private http: HttpClient) {
  }

  postCommand(id: string): Observable<Course> {

    return this.http.get(localUrl1+ "/?" + id
      // +"/"+ id +"?projection=light"
    ).pipe(map(function (course: any) {
      return {nameOfCourse: course.nameOfCourse, category: course.category, discriptionOfCourse: course.descriptionOfCourse,
        idOfCourse: course.idOfCourse};
    }));
  }
}
