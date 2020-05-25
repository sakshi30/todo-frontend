import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class GetListService {

  constructor(private _http: HttpClient,
    private _error: HandleErrorService) { }

  getData(userId, opt) {
    let url: string = environment.API_LOCAL+'api/task/'+userId+'/'+opt;
    console.log(url);
    return this._http.get(url).pipe(map(res => { 
      return JSON.stringify(res); }
    ));
  }

  storeData(data): Observable<any>{
    return this._http.post(environment.API_LOCAL+'api/task/add', data)
    .pipe(
      catchError(error => {
        return this._error.processError(error);
      }));
  }

  getTaskList(userId): Observable<any> {
    return this.getData(userId, 1);
  }

  getLabelList(userId): Observable<any> {
    return this.getData(userId, 2);
  }

  getStatusList(userId): Observable<any> {
    return this.getData(userId, 3);
  }

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
}
