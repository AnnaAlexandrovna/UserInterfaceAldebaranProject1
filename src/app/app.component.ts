import {Component, OnInit} from '@angular/core';

import {Injectable, Inject} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {KeycloakService} from "./core/auth/keycloak.service";
import {environment} from './../environments/environment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular';

  errors: any;
  tok1: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.tok1='';
    if(localStorage.getItem('token')){this.tok1 = localStorage.getItem('token')};
  }

  getKeycloakService() {
    return KeycloakService
  }

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

  goContact() {
    this.router.navigate(
      ['/contact']);
  }

  goCreate() {
    this.router.navigate(
      ['/createcourse']);
  }

  goChange() {
    this.router.navigate(
      ['/changecourse']);
  }

  goLogin() {
    this.router.navigate(
      ['/secured']);
  }
}
