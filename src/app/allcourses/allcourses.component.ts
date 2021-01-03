import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Getnameandid} from "../getnameandid";
import {Nameandid} from './../nameandid';
import {DialogData} from "../exampleofcourses/exampleofcourses.component"
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Getlistofcategory} from "../getlistofcategory";
import {Category} from "../category";
import {Search1} from "../search1";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Sort1} from "../sort1";
import {Router} from "@angular/router";
import * as jwt_decode from 'jwt-decode';
// import {KeycloakService} from "../core/auth/keycloak.service";

@Component({
  selector: 'app-allcourses',
  templateUrl: './allcourses.component.html',
  styleUrls: ['./allcourses.component.css']
})
export class AllcoursesComponent implements OnInit {

  categoryFormGroup : FormGroup;
  authorFormGroup: FormGroup;
  name : string;
  searchFU: string[] = [];
  courses1: Nameandid[] = [];
  category: Category[];
  authorName: string;
  @Input() userIn: string;
  tok: string;
  form = new FormGroup({
    first: new FormControl(),
  });
  constructor(private api: Getnameandid, private http: HttpClient, public dialog: MatDialog, private api1: Getlistofcategory,
              private api2: Search1, private formBuilder: FormBuilder, private api3: Sort1, private router: Router) {

  }

  ngOnInit(): void {
    this.name = '';
    if (localStorage.getItem('token')) {
      this.tok = localStorage.getItem('token');
      this.name=this.getDecodedAccessToken(this.tok).name;
    };
    this.authorName="";
    this.tok='';
    if(localStorage.getItem('token')){this.tok = localStorage.getItem('token')};
    this.categoryFormGroup = this.formBuilder.group({
      categories: this.formBuilder.array([])
    });
    this.authorFormGroup= this.formBuilder.group({
      author: this.formBuilder.array([])
    });
    this.userIn="";
    this.getNameAndIdOfCourses();
    this.getListOfCategory();
  }

  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }

  getNameAndIdOfCourses() {
    this.api.getCommand().subscribe(data => this.courses1 = data);
    console.log(this.courses1);
  }

  getListOfCategory() {
    this.api1.getCommand1().subscribe(data => this.category = data);
    console.log(this.category);
  }

  openDialog() {
    this.dialog.open(DialogData, {width: '400px', height: '300px'});
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  sort1(){
    if (this.authorName!=""){
      // this.authorFormGroup.setValue({author: this.authorName});
      const array2 = <FormArray>this.authorFormGroup.get('author') as FormArray;
      array2.push(new FormControl(this.authorName));
      console.log(array2);
    }
    if (this.userIn!=""){
     this.searchFU.push(this.userIn);
    }

    this.api3.postCommand(this.categoryFormGroup, this.authorFormGroup, this.searchFU).subscribe(data => {this.courses1 = data;
      if (this.authorName!="") {
        const array2 = <FormArray>this.authorFormGroup.get('author') as FormArray;
        array2.removeAt(array2.length-1);
      }
      if (this.userIn!=""){
        this.searchFU.pop();
      }
      if (this.courses1.length  == 0){
        this.openNoDataDialog();
      }});


  }

  onChange(event) {
    const array1 = <FormArray>this.categoryFormGroup.get('categories') as FormArray;

    if(event.checked) {
      array1.push(new FormControl(event.source.value))
    } else {
      const i = array1.controls.findIndex(x => x.value === event.source.value);
      array1.removeAt(i);
    }
  }

  onChange1(event) {
    console.log(event);
    const array2 = <FormArray>this.authorFormGroup.get('author') as FormArray;

    if(event.checked) {
      array2.push(new FormControl(event.source.value))
    } else {
      const i = array2.controls.findIndex(x => x.value === event.source.value);
      array2.removeAt(i);
    }
  }

  submit() {
    console.log(this.categoryFormGroup.value);
  }

  goRefresh() {
    this.ngOnInit();
    this.form.setValue({first: ''});
  }

  openNoDataDialog(){
    this.dialog.open(NoData, {width: '400px', height: '300px'});
  }


  // getKeycloakService() {
  //   return KeycloakService
  // }

}


@Component({
  selector: 'app-allcourses',
  templateUrl: 'nodata.html',
  providers: [AllcoursesComponent]
})
export class NoData {
  ex: AllcoursesComponent;
  constructor( ex: AllcoursesComponent, public dialogRef: MatDialogRef<NoData>) {
  }

  onNoClick(): void {
    this.ex.goRefresh();

  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
