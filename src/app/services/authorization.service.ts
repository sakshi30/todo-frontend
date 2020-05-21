import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from "rxjs/operators";
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public isAuthenticated: Boolean = false;
  private loggedInUser = new Subject<User>();
  public getUserDetails = this.loggedInUser.asObservable();
  public currentURL: string = '';
  public navbarOpen: boolean = false;
  
  constructor(private _http: HttpClient,
    private _error: HandleErrorService) { }

  /**
   * 
   * @param user creates a login for the user with email id and password
   */
  loginUser(user: User): Observable<any>{
    return this._http.post(environment.API_LOCAL+'api/user/login', user)
    .pipe(
      map(res => {
        this.storeUserCredentials(res);
        return res;
      }),
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

  //store user details and set flag 
  storeUserCredentials(user) {
    localStorage.setItem('current_user', JSON.stringify(user.value));
    this.sendDetails(user.value);
    this.isAuthenticated = true;
  }

  //send user details from localStorage
  sendUserDetails() {
    return JSON.parse(localStorage.getItem('current_user'));
  }


  //send the logged in user's credential
  sendDetails(user: User) {
    this.loggedInUser.next(user);
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


  //check if the user is logged in
  isLoggedIn() {
    return this.isAuthenticated;
  }
}
