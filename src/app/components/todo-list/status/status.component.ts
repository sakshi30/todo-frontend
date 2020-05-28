import { Component, OnInit, ViewChild } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AddStatusComponent } from '../add-status/add-status.component';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  private _status: any[] = [];
  private _cols: string[] = ['status', 'number', 'archieved', 'action'];
  private _dataSource: any;
  public statusCtrl = new FormControl();
  public filteredStatus: Observable<any>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private _list: GetListService,
    private _auth: AuthorizationModule,
    private _dialog: MatDialog) { 
      this.filteredStatus = this.statusCtrl.valueChanges.pipe(debounceTime(500), startWith(''), map(status => this._filterStatus(status)))
      this._filterStatus('');
    }

  _filterStatus(event) {
    let userId = '5ec3c5187ea72e2c5cdedd80';
    this._list.getStatusList(userId).subscribe(data => { 
      if(event.target) {
        this._status = [];
        var st = event.target.value;
        var data = JSON.parse(data)['status'].filter(s => s.include(st))
        data.forEach(element => {
          this._status.push({status: element})
        })
      } else {
        console.log(JSON.parse(data)['task'], JSON.parse(data)['status'])
        JSON.parse(data)['status'].forEach(element => {
          var task_number = 0;
          var archieved_task = 0;
          JSON.parse(data)['task'].forEach(task => {
            task['status'].forEach(status => {
              if(status == element) {
                task_number += 1;
                if(task.archieved) {
                  archieved_task += 1;
                }
              }
            })
          })
          this._status.push({status: element, task_number: task_number, archieved_task: archieved_task});
        });
      }
      this._dataSource = new MatTableDataSource(this._status);
      this._dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
  }

  addStatus() {
    var ref = this._dialog.open(AddStatusComponent, { width: '500px', data: {status: this._status, update: '' } } );
    ref.afterClosed().subscribe(result => {
      this._status = [];
      this._filterStatus('');
    });
  }

  editStatus(element) {
    var ref = this._dialog.open(AddStatusComponent, { width: '500px', data: { status: this._status, update: element } } );
    ref.afterClosed().subscribe(result => {
      this._status = [];
      this._filterStatus('');
    });
  }

  deleteStatus() {
    
  }

  
}
