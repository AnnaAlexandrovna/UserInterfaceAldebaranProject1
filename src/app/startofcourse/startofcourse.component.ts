import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Subject, Subscription} from 'rxjs';
import {NgTerminal} from 'ng-terminal';
import {FormControl} from '@angular/forms';
import {DisplayOption} from 'ng-terminal';
import {Terminal} from 'xterm';
import {FunctionsUsingCSI} from 'ng-terminal';
import {ApiService} from './../api.service';
import {Terminalcommand123} from './../terminalcommand123';
import {ActivatedRoute, Router} from "@angular/router";
import {InfoFromRunner} from "./../infoFromRunner";
import {Getname1} from "./../getname1";
import {NameOfCourse} from './../nameofcorse';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../exampleofcourses/exampleofcourses.component";
import {Getstepinfo} from "../getstepinfo";
import {Stepinfo} from "../stepinfo";
import {Insrtuction1} from "../insrtuction1";
import {GetInstruction1} from "../getInstruction1";
import {Termcom} from "../termcom";
import {timeout} from "rxjs/operators";

@Component({
  selector: 'app-startofcourse',
  templateUrl: './startofcourse.component.html',
  styleUrls: ['./startofcourse.component.css']
})
export class StartofcourseComponent implements OnInit, AfterViewInit {
  idOfCourse: string;
  name1: string;
  info: InfoFromRunner;
  private subscription: Subscription;
  keyInput: string;
  spresp: any;
  postdata: Terminalcommand123;
  s123: HttpResponse<Termcom>;
  stepI: HttpResponse<Stepinfo>;
  instr: Insrtuction1;
  markdown = ``;
  steps: number;
  currentStep: number;
  percentOfPass: number;
  tok:string;

  constructor(private api: ApiService, private activateRoute: ActivatedRoute, private api1: Getname1, private router: Router,
              public dialog: MatDialog, private api2: Getstepinfo, private api3: GetInstruction1) {

  }

  color = 'accent';
  inputControl = new FormControl();
  displayOption: DisplayOption = {};
  displayOptionBounded: DisplayOption = {};//now it's not used
  underlying: Terminal;
  querySubscription: Subscription;

  @ViewChild('term', {static: true}) child: NgTerminal;

  ngOnInit() {
    this.tok='';
    if(localStorage.getItem('token')){this.tok = localStorage.getItem('token')};
    this.currentStep = 1;
    this.instr = {"instr": ""};
    this.info = {"runId": "", "enviromentId": ""};
    this.subscription = this.activateRoute.params.subscribe(params => {
      this.idOfCourse = params['id'];
    });
    this.querySubscription = this.activateRoute.queryParams.subscribe(
      (queryParam: any) => {
        this.info.runId = queryParam['runId'];
        this.info.enviromentId = queryParam['enviromentId'];
        this.api3.getInst(this.idOfCourse, this.currentStep).subscribe(data => {
          this.instr = data;
          this.markdown = this.instr.instr.replace("\n ", "<br/>");
          console.log(this.markdown);
        });
      }
    );

    this.api1
      .postCommand(this.idOfCourse)
      .subscribe((resp: NameOfCourse) => {
          this.name1 = resp.nameOfCourse;
          this.steps = resp.numberOfStep;

          this.percentOfPass = Math.floor(((this.currentStep - 1) / this.steps) * 100);
        },
      );
    this.keyInput = "";
    this.postdata = {"command123": ""};

  }

  ngAfterViewInit() {
    this.underlying = this.child.underlying;
    this.underlying.setOption("fontSize", 20);
    this.invalidate();
    this.child.write('$ ');
    this.child.keyInput.subscribe((input) => {
      //do nothing because it will be replaced keyEventInput
    })

    this.child.keyEventInput.subscribe(e => {
      console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);

      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.keyCode === 13) {
        this.child.write('\n' + FunctionsUsingCSI.cursorColumn(1) + '$ '); // \r\n
      } else if (ev.keyCode === 8) {
        // Do not delete the prompt
        if (this.child.underlying.buffer.cursorX > 2) {
          this.child.write('\b \b');
        }
      } else if (ev.keyCode === 35 || ev.keyCode === 112 || ev.keyCode === 113 || ev.keyCode === 114 || ev.keyCode === 115 || ev.keyCode === 36) {
        this.child.write('');
      } else if ((ev.keyCode === 37) || (ev.keyCode === 38) || (ev.keyCode === 39) || (ev.keyCode === 40)) {
        this.child.write('');
      } else if (printable) {
        this.child.write(e.key);
      }
    })
  }


  invalidate() {

    this.displayOption.activateDraggableOnEdge = {minWidth: 100, minHeight: 100};
    this.displayOption.fixedGrid = undefined;
    this.child.setDisplayOption(this.displayOption);
  }

  writeSubject = new Subject<string>();

  write() {
    this.writeSubject.next(eval(`'${this.inputControl.value}'`));
  }

  onKeyInput(event: string) {

    this.keyInput += event;
    if (event == "\x0D") {
      this.postdata.command123 = this.keyInput;
      this.writeSubject.next(`\r`);
      this.api
        .postCommand(this.postdata, this.info.enviromentId)
        .subscribe((resp: HttpResponse<Termcom>) => {
            this.s123 = resp;
            this.keyInput = "";
            this.writeSubject.next(eval(`{this.s123.body.msg}`));
            this.writeSubject.next(`\n`);
            this.writeSubject.next(`\r$ `);
            return this.s123 = resp;
          },
        );

    }
    ;
    if (event == "\x7F") {
      if (this.keyInput.length != 0) {
        this.keyInput = this.keyInput.substring(0, this.keyInput.length - 2);
      }
      ;
      if (this.keyInput.length == 0) {
        this.keyInput = "";
      }
      ;
    }

    if (event == "") {
      if (this.keyInput.length > 1) {
        this.keyInput = (this.keyInput.substring(0, this.keyInput.length - 1));
      }
      ;
      if (this.keyInput.length <= 1) {
        this.keyInput = "";
      }
      ;
    }

    if (event == "[D" || event == "[24~" || event == "[23~" || event == "[21~" || event == "[20~" || event == "[19~" || event == "[18~" || event == "[17~") {
      if (this.keyInput.length > 5) {
        this.keyInput = (this.keyInput.substring(0, this.keyInput.length - 5));
      }
      ;
      if (this.keyInput.length <= 5) {
        this.keyInput = "";
      }
      ;
    }

    if (event == "[C" || event == "[B" || event == "[H" || event == "[F" || event == "[3~" || event == "OS" || event == "OR" || event == "OQ" || event == "[A" || event == "OP") {
      if (this.keyInput.length > 3) {
        this.keyInput = (this.keyInput.substring(0, this.keyInput.length - 3));
      }
      ;
      if (this.keyInput.length <= 3) {
        this.keyInput = "";
      }
      ;
    }
    if (event == "[5~" || event == "[6~") {
      if (this.keyInput.length > 4) {
        this.keyInput = (this.keyInput.substring(0, this.keyInput.length - 4));
      }
      ;
      if (this.keyInput.length <= 4) {
        this.keyInput = "";
      }
      ;
    }
  }

  interval = undefined;

  getStepInfo() {
    this.openDialog();
    const me = this;
    this.interval = setInterval(() => {
      this.api2.getStepInfo(this.info.runId)
        .subscribe(data => {
          this.stepI = data;
          console.log(this.stepI.status);
          if (this.stepI.status == 200) {
            clearInterval(this.interval);
            this.closeDialog();
            if (this.currentStep == this.steps) {
              this.goToEnd();
            } else {
              this.currentStep += 1;
              this.percentOfPass = Math.floor((this.currentStep / this.steps) * 100);
              this.getInstr();
              this.underlying.clear();

            }
          }
          ;
          if (this.stepI.status== 412) {
            clearInterval(this.interval);
            this.closeDialog();
            this.getInstr();
            this.underlying.clear();
          }
          ;
        });
    }, 10000);

  };


  getInstr() {
    this.api3.getInst(this.idOfCourse, this.currentStep).subscribe(data => this.instr = data);
  };

  goToEnd() {
    this.router.navigate(
      ['/endcourse', this.idOfCourse]);
  }

  openDialog() {
    this.dialog.open(DialogData, {width: '400px', height: '300px'});
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  openErrorDialog() {
    this.dialog.open(ErrorDialog, {width: '400px', height: '200px'});
  }
}


@Component({
  // selector: 'app-exampleofcourses',
  templateUrl: 'errordialog.html',
})
export class ErrorDialog {
  constructor(public dialogRef: MatDialogRef<ErrorDialog>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
