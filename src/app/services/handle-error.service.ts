import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  public errMsg: string;
  
  constructor(){}

  public processError(error: HttpErrorResponse | any){
    this.errMsg = error.error.status;
    return throwError(this.errMsg);
  }

}
