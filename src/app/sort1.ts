import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Status1} from "./status1";
import {Nameandid} from "./nameandid";
import {map} from "rxjs/operators";
import {FormGroup} from "@angular/forms";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'http://localhost:8080/sort';


@Injectable({
  providedIn: 'root'
})
export class Sort1 {
  private property: any;

  constructor(private http: HttpClient) {
  }

  postCommand(categoryFormGroup: FormGroup, authorFormGroup : FormGroup, searchFromUser : string[]): Observable<Nameandid[]> {
    const body = {
      filter: [{properties: "category",
        operator: "IN",
        values: categoryFormGroup.value.categories}, { property: "author",
        operator: "IN",
        values: authorFormGroup.value.author},  { property: "search",
        operator: "IN",
        values: searchFromUser}]
    };
    return this.http.post<Nameandid[]>(localUrl1, body, {
      headers: headers
    }).pipe(map(data => {
      let nameAndIdList = data["courseList"];
      return nameAndIdList.map(function (course: any) {
        return {nameOfCourse: course.nameOfCourse, idOfCourse: course.idOfCourse};
      })
    }))
  };
}
