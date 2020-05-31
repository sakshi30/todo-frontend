import { Component, OnInit, ViewChild } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddStatusComponent } from '../add-status/add-status.component';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  private _status: any[] = [];
  private _cols: string[] = ['status', 'task_number', 'archieved_task', 'action'];
  private _dataSource: any;
  public userId: any;
  public tasks: any[] = [];
  public all_status: any[] = [];
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private _list: GetListService,
    private _auth: AuthorizationService,
    private _dialog: MatDialog, 
    private _toast: ToastrService) { 
      this._filterStatus('')
  }

  ngOnInit() {}

  _filterStatus(event){
    //this.userId = this._auth.sendUserDetails()._id;
    this.userId = '5ed33094de8023303093c09e';
    this._list.getTaskMetaList(this.userId).subscribe(data => {   
      this.tasks = JSON.parse(data)['task']; 
      this.all_status = JSON.parse(data)['status']
      if(event.target){
        this._status = [];
        var status = event.target.value;   
        var data_status = JSON.parse(data)['status'].filter(s => s.includes(status))
        data_status.forEach(element => {
          var task_number = 0;
          var archieved_task = 0;
          JSON.parse(data)['task'].forEach(task => {
            task['status'].forEach(status => {
              if(status == element){
                task_number += 1
                if(task.archieved){
                  archieved_task += 1
                }
              }
            })
          })
          this._status.push({status: element, task_number: task_number, archieved_task: archieved_task})
        })
      }
      else{
        JSON.parse(data)['status'].forEach(element => {
          var task_number = 0;
          var archieved_task = 0;
          JSON.parse(data)['task'].forEach(task => {
            task['status'].forEach(status => {
              if(status == element){
                task_number += 1
                if(task.archieved){
                  archieved_task += 1
                }
              }
            })
            
          })
          this._status.push({status: element, task_number: task_number, archieved_task: archieved_task})
        });
      }
      this._dataSource = new MatTableDataSource(this._status);
      this._dataSource.sort = this.sort;
    });
    return this._status;
  }

  addStatus() {
    var ref = this._dialog.open(AddStatusComponent, {width: '500px', data: {status: this._status, update: ''}});
    ref.afterClosed().subscribe(result => {
      this._status = [];
      this._filterStatus('')
    })
  }

  editStatus(element){
    var ref = this._dialog.open(AddStatusComponent, {width: '500px', data: {status: this.all_status, update: element, tasks: this.tasks }});
    ref.afterClosed().subscribe(result => {
      this._status = [];
      this._filterStatus('')
    })
  }

  deleteStatus(element){
    this.tasks.forEach(task => {
      if(task.status.includes(element.status)){
        task.status.splice(task.status.indexOf(element.status), 1);
      }
    });
    this.all_status.splice(this.all_status.indexOf(element.status), 1)
    this._list.updateLabelAndStatus(this.userId, this.all_status, this.tasks, 2).subscribe(result => {
      this._status = [];
      this._filterStatus('')
      this._toast.success("Status Deleted successfully");
      
    }, (error) => {
      this._toast.error("Unable to delete status")
      this._status = [];
      this._filterStatus('')
    })
  }
  

  
}
