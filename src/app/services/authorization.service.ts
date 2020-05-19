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

  /**
   * 
   * @param user creates a login for the user with email id and password
   */
  loginUser(user: User): Observable<any>{
    return this._http.post(environment.API_LOCAL+'api/user/login', user)
    .pipe(
      catchError(error => {
        return this._error.processError(error);
      }));
  }

  /**
   * 
   * @param user creates a signup request for user with 
   * email, username, password and security question and answer
   */
  registerUser(user: User): Observable<any>{
    return this._http.post(environment.API_LOCAL+'api/user/register', user)
    .pipe(
      catchError(error => {
        return this._error.processError(error);
      }));
  }

  /**
   * 
   * @param user used to check if the user who has forgot his password 
   * has entered correct email address and security question
   */
  verifyUser(user: User): Observable<any>{
    return this._http.post(environment.API_LOCAL+'api/user/verifyuser', user)
    .pipe(
      catchError(error => {
        return this._error.processError(error);
      }));
  }

  /**
   * 
   * @param user used to check if the user who has forgot his password 
   * to change the password
   */
  changePassword(user: User): Observable<any>{
    return this._http.post(environment.API_LOCAL+'api/user/changepassword', user)
    .pipe(
      catchError(error => {
        return this._error.processError(error);
      }));
  }
}
