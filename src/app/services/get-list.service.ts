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

  /* get tasks list */
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
  /* */

  storeData(userId, data): Observable<any>{
    data['userId'] = userId;
    return this._http.post(environment.API_LOCAL+'api/task/add', data)
    .pipe(
      catchError(error => {
        return this._error.processError(error);
      }));
  }

  updateTask(data): Observable<any>{
    return this._http.post(environment.API_LOCAL+'api/task/update', data)
    .pipe(
      catchError(error => {
        return this._error.processError(error);
      }));
  }

  updateLabelAndStatus(userId, val, tasks, opt): Observable<any>{
    return this._http.post(environment.API_LOCAL+'api/task/updateLabel', {userId: userId, val: val, tasks: tasks, opt: opt})
    .pipe(
      catchError(error => {
        return this._error.processError(error);
      }));
  }

  /* get attributes list */
  getAttrData(userId, opt) {
    let url: string = environment.API_LOCAL+'api/task/'+userId+'/'+opt;
    return this._http.get(url).pipe(map(res => { 
      console.log('getting ', opt, ' as ', res);
      return JSON.stringify(res);
    }));
  }

  getLabelList(userId): Observable<any> {
    return this.getAttrData(userId, 2);
  }

  getStatusList(userId): Observable<any> {
    return this.getAttrData(userId, 3);
  }

  getTaskMetaList(userId) {
    return this.getAttrData(userId, 0);
  }
  /* */

  /* get tasks by attributes */
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
  /* */

  sendData(data){
    this.dataSubject.next(data);
  }

  /* deleting a particular task, label or status */
  deleteParticular(opt, userId, val): Observable<any> {
    let url: string = environment.API_LOCAL+'api/task/'+opt+'/'+userId+'/'+val;
    return this._http.delete(url).pipe(map(res => {
      return JSON.stringify(res);
    }));
  }

  deleteTask(userId, val): Observable<any>{
    return this.deleteParticular(1, userId, val);
  }

  deleteLabel(userId, val): Observable<any> {
    return this.deleteParticular(2, userId, val);
  }

  deleteStatus(userId, val): Observable<any> {
    return this.deleteParticular(3, userId, val);
  }
  /* */

  /* empty array - delete all tasks, all labels, all status */
  deleteData(opt, userId): Observable<any> {
    let url: string = environment.API_LOCAL+'api/task/'+opt+'/userId';
    return this._http.delete(url).pipe(map(res => {
      return res;
    }));
  }

  deleteAllTask(userId): Observable<any> {
    return this.deleteData(1, userId);
  }

  deleteAllLabel(userId): Observable<any> {
    return this.deleteData(2, userId);
  }

  deleteAllStatus(userId): Observable<any> {
    return this.deleteData(3, userId);
  }

  deleteAllData(userId): Observable<any> {
    return this.deleteData(0, userId);
  }
  /* */
}
