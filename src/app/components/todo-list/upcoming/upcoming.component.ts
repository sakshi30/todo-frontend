import { Component, OnInit, ViewChild } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {

  private _todo: any[] = [];
  private _curr: any;
  private _cols: string[] = ['value', 'label', 'status', 'dueDate', 'action'];
  private _dataSource: any;
  public all_status = ['Not Started', 'In Progress', 'Completed', 'Cancelled']
  private _label: any;
  private _status: any;

  public userId: any;

  private _
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private _list: GetListService,
    private _router: Router,
    private _toast: ToastrService,
    private _auth: AuthorizationService) {
    this._filterTasks('')

  }

  _filterTasks(event){
    //let userId = this._auth.sendUserDetails()._id;
    this.userId = '5ed33094de8023303093c09e';
    var yesterday = new Date(new Date().getTime());
    this._curr = yesterday.setDate(new Date().getDate() - 1);
    
    /*this._list.getLabelList(this.userId).subscribe(data => {
      console.log(data);
      this._label = JSON.parse(data)
    });
    this._list.getStatusList(this.userId).subscribe(data => {
      console.log(data);
      this._status = JSON.parse(data)
    });*/


    this._list.getUpcomingTask(this.userId).subscribe(data => {
      let tasks = JSON.parse(data);
      console.log(tasks);
      if(event.target){
        this._todo = [];
        var task = event.target.value;   
        var data_label = tasks.filter(s => s.task.value.includes(task))
        data_label.forEach(ele => {
          console.log(ele['task'])
          if (!ele['task'].archieved && new Date(ele['task']['dueDate']).getTime() >= this._curr && ele['task']['status'] != 'Completed') {
            // if(ele['task']['dueDate']<this._curr) //convert this to 'due date' later, not yet implemented in the backend
            this._todo.push(ele['task']);
          }
        });
        this._dataSource = new MatTableDataSource(this._todo);
        this._dataSource.sort = this.sort;
        this._dataSource.paginator = this.paginator;
      }
      else{
        tasks.forEach(ele => {
          console.log(ele['task'])
          if (!ele['task'].archieved && new Date(ele['task']['dueDate']).getTime() >= this._curr && ele['task']['status'] != 'Completed') {
            // if(ele['task']['dueDate']<this._curr) //convert this to 'due date' later, not yet implemented in the backend
            this._todo.push(ele['task']);
          }
        });
        this._dataSource = new MatTableDataSource(this._todo);
        this._dataSource.sort = this.sort;
        this._dataSource.paginator = this.paginator;

      }
      
      
    });
  }
  ngOnInit(): void {
   }

  ngAfterViewInit(): void { }

  createTask() {
    this._list.sendData({ data: null, update: false });
    this._router.navigate(['/addTask'])
  }

  changeStatus(element, status){
    var object = { val: {}, taskId: '' }
    object.taskId = element._id;
    object.val = { status: status };
    this._list.updateTask(object).subscribe(result => {
      element.status = status;
      if(status == 'Completed'){
        this._todo = this._todo.filter((item) => item._id !== element._id);
        this._dataSource = new MatTableDataSource(this._todo);
        this._dataSource.sort = this.sort;
        this._dataSource.paginator = this.paginator;
      }
    }, (error) => {
      this._toast.error("Unable to change the status")
    })
  }

  editItem(item) {
    this._list.sendData({ data: item, update: true });
    this._router.navigate(['/addTask']);
  }

  archiveItem(element) {
    element.archieved = true;
    var object = { val: {}, taskId: '' }
    object.taskId = element._id;
    object.val = { archieved: element.archieved };
    this._list.updateTask(object).subscribe(result => {
      this._todo = this._todo.filter(element => element.archieved != true)
      this._dataSource = new MatTableDataSource(this._todo);
      this._dataSource.sort = this.sort;
      this._toast.success("Task has been archieved")
    }, (error) => {
      this._toast.error("Unable to archieve this task")
    })
  }


  deleteItem(element) {
    this._list.deleteTask(this.userId, element._id).subscribe(result => {
      this._todo = this._todo.filter(el => el._id != element._id)
      this._dataSource = new MatTableDataSource(this._todo);
      this._dataSource.sort = this.sort;
      this._toast.success("Task deleted sccessfully")
    }, (error) => {
      this._toast.error("Unable to delete the task")
    })
  }

}
