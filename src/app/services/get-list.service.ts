import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class GetListService {

  public dataSubject = new BehaviorSubject(null);
  public dataObservable = this.dataSubject.asObservable();

  constructor(private _http: HttpClient,
    private _error: HandleErrorService) { }

  /* task */
  getTaskList(userId, archieved): Observable<any> {
    let url: string = environment.API_LOCAL+'api/task/tasks/'+userId+'/'+archieved;
    return this._http.get(url).pipe(map(res => {
      return JSON.stringify(res);
    }));
  }

  getUpcomingTask(userId): Observable<any> {
    return this.getTaskList(userId, 0);
  }

  getArchievedTask(userId): Observable<any> {
    return this.getTaskList(userId, 1);
  }

  storeData(data): Observable<any>{
    return this._http.post(environment.API_LOCAL+'api/task/add', data)
    .pipe(
      catchError(error => {
        return this._error.processError(error);
      }));
  }

  updateTask(data): Observable<any>{
    return this._http.get(environment.API_LOCAL+'api/task/update', data)
    .pipe(
      catchError(error => {
        return this._error.processError(error);
      }));
  }

  /* attributes */
  getData(userId, opt) {
    let url: string = environment.API_LOCAL+'api/task/'+userId+'/'+opt;
    return this._http.get(url).pipe(map(res => { 
      console.log(opt, res);
      return JSON.stringify(res);
    }));
  }

  getLabelList(userId): Observable<any> {
    return this.getData(userId, 0);
  }

  getStatusList(userId): Observable<any> {
    return this.getData(userId, 0);
  }

  /* tasks by attributes */
  getDataByAttr(userId, opt, val) {
    let url: string = environment.API_LOCAL+'api/task/attr';
    let data: any = { 'userId': userId }
    if(opt==2) {
      data['val'] = { 'label': val }
    } else if(opt==3) {
      data['val'] = { 'status': val }
    }
    return this._http.post(url, data).pipe(map(res => {
      return JSON.stringify(res);
    }))
  }

  tasksByLabel(userId, label) {
    return this.getDataByAttr(userId, 2, label);
  }

  tasksByStatus(userId, status) {
    return this.getDataByAttr(userId, 3, status);
  }

  sendData(data){
    this.dataSubject.next(data);
  }


  addLabel(userId, label): Observable<any>{
    return this._http.post(environment.API_LOCAL+'api/task/addNew', {opt: 1, userId: userId, label: label})
    .pipe(
      catchError(error => {
        return this._error.processError(error);
      }));
  }
}
