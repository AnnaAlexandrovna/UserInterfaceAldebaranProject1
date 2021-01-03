import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
// import {KeycloakService} from "../core/auth/keycloak.service";
import {DialogData} from "../exampleofcourses/exampleofcourses.component";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  tok:string;

  constructor(private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.tok='';
    if(localStorage.getItem('token')){this.tok = localStorage.getItem('token')};
  }

  // getKeycloakService() {
  //   return KeycloakService
  // }

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
