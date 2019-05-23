import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginRegService {
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  registerUser(userData): Observable<any> {
    return this.http.post(this.baseurl+'/user_api/register/', userData,
    {headers: this.httpHeaders});
  }

  loginUser(userData):  Observable<any> {
    return this.http.post(this.baseurl+'/user_api/login/', userData,
    {headers: this.httpHeaders});
  }
}
