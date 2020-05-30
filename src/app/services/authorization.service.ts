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

  public isAuthenticated: boolean = false;
  private loggedInUser = new Subject<User>();
  public getUserDetails = this.loggedInUser.asObservable();
  public currentURL: string = '';
  public navbarOpen: boolean = false;
  public authToken: string = '';

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
    console.log(user)
    localStorage.setItem('user', JSON.stringify(user.value));
    localStorage.setItem('user_tasks', JSON.stringify(user.tasks));
    this.useCredentials(user);
  }

  useCredentials(user){
    this.authToken = user.token;
    this.sendDetails(user.value);
    this.isAuthenticated = true;
  }

  loadUserCredentials() {
    var credentials: User = JSON.parse(localStorage.getItem('user'));
    if (credentials && credentials.username != undefined) {
      this.useCredentials(credentials);
      if (this.authToken){
        console.log(this.authToken)
        this.checkJWTtoken();
      }
    }
  }

  checkJWTtoken() {
    this._http.get<any>(environment.API_LOCAL + 'api/user/checkJWTtoken')
    .subscribe(res => {
      console.log("JWT Token Valid: ", res);
      this.sendDetails(res.user.username);
    },
    err => {
      console.log("JWT Token invalid: ", err);
      this.destroyUserCredentials();
    })
  }

  destroyUserCredentials() {
    this.authToken = undefined;
    this.clearUsername();
    this.isAuthenticated = false;
    localStorage.removeItem('user');
  }

  logOut() {
    this.destroyUserCredentials();
  }

  clearUsername() {
    this.loggedInUser.next(undefined);
  }


  //send user details from localStorage
  sendTaskDetails() {
    return JSON.parse(localStorage.getItem('user_tasks'));
  }

  sendUserDetails() {
    return JSON.parse(localStorage.getItem('user'));
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
  changePassword(user): Observable<any>{
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

  saveUser(user: User): Observable<any>{
    return this._http.post(environment.API_LOCAL+'api/user/saveUser', user)
    .pipe(
      catchError(error => {
        return this._error.processError(error);
      }));
  }
}
