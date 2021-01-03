import {Component, OnInit, Input, Inject} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
// import {KeycloakService} from "../core/auth/keycloak.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../exampleofcourses/exampleofcourses.component";
import {Createcourse} from "../createcourse";
import {Status1} from "../status1";
import {InfoFromRunner} from "../infoFromRunner";

export interface DialogData1 {
  id: string;
  err: string;
}

@Component({
  selector: 'app-createcourse',
  templateUrl: './createcourse.component.html',
  styleUrls: ['./createcourse.component.css']
})
export class CreatecourseComponent implements OnInit {

  errors: any;
  @Input() nameOfCourse: string;
  @Input() link: string;
  stat: HttpResponse<Status1>;
  isLogin: boolean;
  name: string;
  tok :string;

  constructor(private http: HttpClient, public dialog: MatDialog, private api: Createcourse, public dialog1: MatDialog) {
  }

  ngOnInit() {
    this.nameOfCourse = "";
    this.link = "";
    this.tok='';
    if(localStorage.getItem('token')){this.tok = localStorage.getItem('token')};
  }

  // getKeycloakService() {
  //   return KeycloakService;
  // }

  stringify(val) {
    return JSON.stringify(val);
  }


  interval = undefined;
  postNewCourse() {
    if (this.link != "") {
      this.openDialog();
      const me = this;
      this.interval = setInterval(() => {  this.api.postCommand( this.link)
        .subscribe((data: HttpResponse<Status1> )=> { this.stat = data;
          console.log(this.stat.status);
          if(this.stat.status == 200){
            clearInterval(this.interval); this.closeDialog(); this.openOkDialog(this.stat.body.id, this.stat.body.errorMessage);
          };
          if(this.stat.status == 400){
            clearInterval(this.interval);
            this.closeDialog();
            this.openFailDialog(this.stat.body.id, this.stat.body.errorMessage);
          };
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

  openStartCreatingGialog(){
    this.dialog1.open(StartOfCreating, {width: '400px', height: '200px'});
  }

  openOkDialog(s : string, s1: string){
    this.dialog1.open(OkCreating, {width: '400px', height: '200px', data: {id: s, err: s1}});
  }

  openFailDialog(s : string, s1: string){
    this.dialog1.open(FailCreating, {width: '500px', height: '300px',  data: {id: s, err: s1}});
  }

}

@Component({
  // selector: 'app-exampleofcourses',
  templateUrl: 'noalldata.html',
})
export class NotAllData {
  constructor(public dialogRef: MatDialogRef<NotAllData>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  // selector: 'app-exampleofcourses',
  templateUrl: 'startofcreating.html',
})

export class StartOfCreating {
  constructor(public dialogRef: MatDialogRef<StartOfCreating>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  // selector: 'app-exampleofcourses',
  templateUrl: 'ok.html',
})

export class OkCreating  {

  constructor(public dialogRef: MatDialogRef<OkCreating>, @Inject(MAT_DIALOG_DATA) public data: DialogData1) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: 'fail.html',
})

export class FailCreating {
  constructor(public dialogRef: MatDialogRef<FailCreating>, @Inject(MAT_DIALOG_DATA) public data: DialogData1) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
