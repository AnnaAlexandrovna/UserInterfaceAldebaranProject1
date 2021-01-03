import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {KeycloakService} from "../core/auth/keycloak.service";
import {Getnameandid} from "../getnameandid";
import {Nameandid} from './../nameandid';
import {DialogData} from "../exampleofcourses/exampleofcourses.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'ngb-carousel-basic',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courses1: Nameandid[] = [];
  errors: any;
  tok: string;

  constructor(private api: Getnameandid, private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.tok='';
    // this.getNameAndIdOfCourses();
    if(localStorage.getItem('token')){this.tok = localStorage.getItem('token');
     if(this.tok.length!=0){this.getNameAndIdOfCourses(); }
      };
  }

  getNameAndIdOfCourses() {
    this.api.getCommand().subscribe(data => this.courses1 = data);
  }

  // getKeycloakService() {
  //   return KeycloakService
  // }


  stringify(val) {
    return JSON.stringify(val);
  }
  openDialog() {
    this.dialog.open(DialogData, {width: '400px', height: '300px'});
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}
