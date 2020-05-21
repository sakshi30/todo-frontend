import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetListService {

  constructor(private _http: HttpClient) { }

  getData(userId, opt) {
    let url: string = environment.API_LOCAL+'api/task/'+userId+'/'+opt;
    console.log(url);
    return this._http.get(url).pipe(map(res => { 
      return JSON.stringify(res); }
    ));
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
}
