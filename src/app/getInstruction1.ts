import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Course} from './course';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {Insrtuction1} from "./insrtuction1";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'http://localhost:8080/cmview';

@Injectable({
  providedIn: 'root'
})
export class GetInstruction1 {

  constructor(private http: HttpClient) {
  }

  getInst(id: string, step: number): Observable<Insrtuction1> {

    return this.http.get(localUrl1 + "/?" + id + "/?" + step).pipe(map(function (instr1: any) {
      return { instr: instr1.instr};
    }));
  }
}
