import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
// import {KeycloakService} from "../core/auth/keycloak.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {DialogData} from "../exampleofcourses/exampleofcourses.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Status1} from "../status1";
import {Change1} from "../change1";
import {FailCreating, NotAllData, OkCreating} from "../createcourse/createcourse.component";

@Component({
  selector: 'app-changecoure',
  templateUrl: './changecoure.component.html',
  styleUrls: ['./changecoure.component.css']
})
export class ChangecoureComponent implements OnInit {
  private subscription: Subscription;
  id1234: string;
  @Input() idOfCourse: string;
  @Input() link: string;
  stat: HttpResponse<Status1>;
  tok: string;

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, public dialog: MatDialog,
              private api: Change1, public dialog1: MatDialog) {
  }

  ngOnInit() {
    this.tok='';
    if(localStorage.getItem('token')){this.tok = localStorage.getItem('token')};
    this.idOfCourse = "";
    this.link = "";
    // this.stat = {"status": ""};
    this.subscription = this.activateRoute.params.subscribe(params => this.id1234 = params['id']);
    if (this.id1234) {
    } else {
      this.id1234 = "";
    }
    console.log(this.id1234);
  }

  // getKeycloakService() {
  //   return KeycloakService
  // }

  stringify(val) {
    return JSON.stringify(val);
  }

  interval = undefined;
  postChangeCourse() {
    if (
      // this.idOfCourse != "" &&
      this.link != "") {
      this.openDialog();
      const me = this;
      this.interval = setInterval(() => {  this.api.postCommand(this.idOfCourse, this.link)
        .subscribe((data: HttpResponse<Status1>) => {this.stat = data;
          console.log(this.stat.status);
          if(this.stat.status == 200){
            clearInterval(this.interval); this.closeDialog(); this.openOkDialog();
          };
          if(this.stat.status == 400){
            clearInterval(this.interval); this.closeDialog(); this.openFailDialog();
          }
        }); }, 10000);
    } else {
      this.openNotAllDataDialog();
    }
  }


  openDialog() {
    this.dialog.open(DialogData, {width: '400px', height: '300px'});
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  openNotAllDataDialog() {
    this.dialog1.open(NotAllData, {width: '400px', height: '200px'});
  }

  openOkDialog(){
    this.dialog1.open(OkCreating, {width: '400px', height: '200px'});
  }

  openFailDialog(){
    this.dialog1.open(FailCreating, {width: '400px', height: '200px'});
  }
  openStartChangeDialog(){
    this.dialog1.open(StartChange, {width: '400px', height: '200px'});
  }
}


@Component({
  // selector: 'app-exampleofcourses',
  templateUrl: 'startchange.html',
})
export class StartChange {
  constructor(public dialogRef: MatDialogRef<StartChange>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
