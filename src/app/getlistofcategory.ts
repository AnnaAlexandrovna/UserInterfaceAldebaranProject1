import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {Category} from "./category";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'http://localhost:8080/filters';

// const localUrl1 = 'http://localhost:8080/courses/filters';
@Injectable({
  providedIn: 'root'
})
export class Getlistofcategory {
  constructor(private http: HttpClient) {
  }

  getCommand1(): Observable<Category[]> {

    return this.http.get(localUrl1).pipe(map(data => {
      let nameAndIdList = data["categoryList"];
      return nameAndIdList.map(function (category: any) {
        return {nameOfCategory: category.nameOfCategory};
      })
    }))
  }
}
