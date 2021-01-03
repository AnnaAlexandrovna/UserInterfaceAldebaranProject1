import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {interval, Observable} from 'rxjs';
import {Stepinfo} from "./stepinfo";
import {map} from "rxjs/operators";
import {CourseId} from "./courseId";
import {InfoFromRunner} from "./infoFromRunner";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'http://localhost:8080/step';
// const localUrl1 = 'http://localhost:8080/runner/run/{runId}/next ';

@Injectable({
  providedIn: 'root'
})
export class Getstepinfo {

  constructor(private http: HttpClient) {
  }

  getStepInfo(runId: string): Observable<HttpResponse<Stepinfo>> {
    const body = {runId: runId};
    return this.http.post<Stepinfo>(localUrl1, body, {
      observe: 'response', headers: headers
    });
  }

  // getStepInfo(runId: string): Observable<Stepinfo> {
  //
  //   return this.http.get(localUrl1 + "?" + runId).pipe(map(function (step: any) {
  //     return { code: step. step, description: step.errorText};
  //   }));
  // }
}
