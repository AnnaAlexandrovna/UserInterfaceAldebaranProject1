import {Component, OnInit} from '@angular/core';
import {DialogData} from "../exampleofcourses/exampleofcourses.component";
import {MatDialog} from "@angular/material/dialog";
import {KeycloakService} from "../core/auth/keycloak.service";
import * as jwt_decode from 'jwt-decode';
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Nameandid} from "../nameandid";
import {map} from "rxjs/operators";

const localUrl1 = 'http://localhost:8080/sort';
var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  name:string;
  tok:string;
  courses1: Nameandid[] = [];

  constructor(public dialog: MatDialog, private http: HttpClient) {
  }

  postCommand(name: string): Observable<Nameandid[]> {
    const body = {
      filter: [ { property: "author",
        operator: "IN",
        values: [name]}]
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

  ngOnInit() {
    this.tok='';
    this.name = '';
    if (localStorage.getItem('token')) {
      this.tok = localStorage.getItem('token');
      this.name=this.getDecodedAccessToken(this.tok).name;
      this.postCommand(this.name).subscribe(data => this.courses1 = data);
      console.log(this.courses1);
    };
  }

  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }

  openDialog() {
    this.dialog.open(DialogData, {width: '400px', height: '300px'});
  }
  closeDialog() {
    this.dialog.closeAll();
  }
  getKeycloakService() {
    return KeycloakService
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
