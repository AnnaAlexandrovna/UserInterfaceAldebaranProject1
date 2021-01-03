import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {CourseId} from './courseId';
import {Observable} from 'rxjs';
import {InfoFromRunner} from "./infoFromRunner";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'http://localhost:8080/runner/new-run';

@Injectable({
  providedIn: 'root'
})
export class GetdataaboutcourseService {

  constructor(private http: HttpClient) {
  }

  postCommand(courseId: CourseId): Observable<HttpResponse<InfoFromRunner>> {
    const body = {courseId: courseId.courseId123};
    return this.http.post<InfoFromRunner>(localUrl1, body, {
      observe: 'response', headers: headers
    });
  }
}
