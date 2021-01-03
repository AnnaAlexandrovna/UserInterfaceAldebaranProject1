import {Component, Inject, OnInit} from '@angular/core';
import {GetdataaboutcourseService} from './../getdataaboutcourse.service';
import {InfoFromRunner} from "./../infoFromRunner";
import {CourseId} from './../courseId';
import {Course} from './../course';
import {HttpResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from '@angular/router';
import {Getcardinfo} from "../getcardinfo";
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

export interface DialogData2 {
  err: string;
}

@Component({

  selector: 'card-fancy-example',
  templateUrl: './exampleofcourses.component.html',
  styleUrls: ['./exampleofcourses.component.css']
})
export class ExampleofcoursesComponent implements OnInit {

  markdown = ``;
  course1: Course;
  postdata1: CourseId;
  respdata: HttpResponse<InfoFromRunner>;
  id1234: string;
  private subscription: Subscription;

  constructor(private api: GetdataaboutcourseService, private router: Router, private activateRoute: ActivatedRoute, private api1: Getcardinfo,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.course1 = {
      "nameOfCourse": "",
      "category": "",
      "discriptionOfCourse": "",
      "idOfCourse": ""
    };
    this.postdata1 = {"courseId123": ""};
    this.subscription = this.activateRoute.params.subscribe(params => this.id1234 = params['id']);
    console.log(this.id1234)
    this.api1
      .postCommand(this.id1234)
      .subscribe((resp: Course) => {
          this.course1 = resp;
          this.markdown=this.course1.discriptionOfCourse.replace("\n ", "<br/>");
        },
      );
  }
  interval = undefined;

  getInfoAboutCourse() {
    this.openDialog();
    this.postdata1.courseId123 = this.id1234;
    this.interval = setInterval(() => {    this.api
      .postCommand(this.postdata1)
      .subscribe((resp: HttpResponse<InfoFromRunner>) => {
          this.respdata = resp;
          console.log("Status"+ this.respdata.status);
        if (this.respdata.status == 200) {
          clearInterval(this.interval);
          this.closeDialog();
          this.router.navigate(
            ['/startcourse', this.id1234],
            {
              queryParams: {
                'runId': this.respdata.body.runId,
                'enviromentId': this.respdata.body.enviromentId
              }
            });
          this.closeDialog();
          return this.respdata;
        }
        ;
        if (this.respdata.status== 404) {
          console.log("Status"+ this.respdata.status);
          clearInterval(this.interval);
          this.closeDialog();
          this.openErrorFromRunnerDialog(""+this.respdata.status);
        }
        ;

        },
      );
  }, 10000);
  }

  getInfoForView() {
    this.api1
      .postCommand(this.id1234)
      .subscribe((resp: Course) => {
        this.course1 = resp;
          return this.course1;
        },
      );
  }

  goToChangeCourse() {
    this.router.navigate(
      ['/changecourse', this.course1.idOfCourse]);
  }

  openDialog() {
    this.dialog.open(DialogData, {width: '400px', height: '300px'});
  }

  openErrorFromRunnerDialog(s : string) {
    this.dialog.open(FailRun, {width: '400px', height: '300px',  data: { err: s}});
  }

  closeDialog() {
    this.dialog.closeAll();
  }

}

@Component({

  templateUrl: 'dialog.html',
})
export class DialogData implements OnInit{
  constructor(  public dialogRef: MatDialogRef<DialogData>, private router: Router, private activateRoute: ActivatedRoute) {

  }
  private subscription: Subscription;
  id1234:string;
  onNoClick(): void {
    this.dialogRef.close();
    // this.router.navigate(['/excourse/2']);
  }

  ngOnInit(): void {
    this.id1234="";
    this.subscription = this.activateRoute.params.subscribe(params => this.id1234 = params['id']);
  }
}

@Component({

  templateUrl: 'failRun.html',
})
export class FailRun {
  constructor(public dialogRef: MatDialogRef<FailRun>, @Inject(MAT_DIALOG_DATA) public data: DialogData2) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
