import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from "rxjs/operators";
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private _http: HttpClient,
    private _error: HandleErrorService) { }

  loginUser(user: User): Observable<any>{
    return this._http.post(environment.API_LOCAL+'api/user/login', user)
    .pipe(
      catchError(error => {
        return this._error.processError(error);
      }));
  }

  registerUser(user: User): Observable<any>{
    return this._http.post(environment.API_LOCAL+'api/user/register', user)
    .pipe(
      catchError(error => {
        return this._error.processError(error);
      }));
  }
}
