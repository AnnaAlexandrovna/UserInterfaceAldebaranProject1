import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {KeycloakService} from "../core/auth/keycloak.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {NameOfCourse} from "../nameofcorse";
import {Getname1} from "../getname1";
import {MatDialog} from "@angular/material/dialog";
import {DialogData} from "../exampleofcourses/exampleofcourses.component";


@Component({
  selector: 'app-endofcourse',
  templateUrl: './endofcourse.component.html',
  styleUrls: ['./endofcourse.component.css']
})
export class EndofcourseComponent implements OnInit {
  id1234: string;
  subscription: Subscription;
  name1: NameOfCourse;
  tok: string;

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, private api1: Getname1, private router: Router,
     public dialog: MatDialog) {
  }

  ngOnInit() {
    this.tok='';
    if(localStorage.getItem('token')){this.tok = localStorage.getItem('token')};
    this.subscription = this.activateRoute.params.subscribe(params => this.id1234 = params['id']);
    console.log(this.id1234);
    this.api1
      .postCommand(this.id1234)
      .subscribe((resp: NameOfCourse) => {
          this.name1 = resp;
          return this.name1;
        },
      );
  }

  // getKeycloakService() {
  //   return KeycloakService
  // }

  stringify(val) {
    return JSON.stringify(val);
  }

  goToAllCourses() {
    this.router.navigate(
      ['/allcourse']);
  }

  goUserProfile() {
    this.router.navigate(
      ['/userprofile']);
  }

  goHome() {
    this.router.navigate(
      ['/home']);
  }

  openDialog() {
    this.dialog.open(DialogData, {width: '400px', height: '300px'});
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}
