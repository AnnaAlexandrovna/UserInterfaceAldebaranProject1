import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Terminalcommand123} from './terminalcommand123';
import {Observable} from 'rxjs';
import {Termcom} from "./termcom";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'http://localhost:8080/postcommand';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  name:string;
  constructor(private http: HttpClient) {
  }

  postCommand(terminalcommand: Terminalcommand123, env: string): Observable<HttpResponse<Termcom>> {
    const body = {envId: env, cmd: terminalcommand.command123.substr(0,terminalcommand.command123.length-1)};
    return this.http.post<Termcom>(localUrl1, body, {
      observe: 'response', headers: headers
    });
  }
}
