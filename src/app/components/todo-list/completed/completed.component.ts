import { Component, OnInit, ViewChild } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {

  private _todo: any[] = [];

  private _curr: any;
  private _cols: string[] = ['value', 'label', 'status', 'progress', 'dueDate', 'action'];
  public all_status = ['Not Started', 'In Progress', 'Completed', 'Cancelled']
  private _dataSource: any;
  public userId: string;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private _list: GetListService,
    private _router: Router,
    private _toast: ToastrService,
    private _auth: AuthorizationService) {
    this._filterTasks('');

  }

  _filterTasks(event) {
    this.userId = '5ed33094de8023303093c09e';
    var yesterday = new Date(new Date().getTime());
    this._curr = yesterday.setDate(new Date().getDate() - 1);

    this._list.getUpcomingTask(this.userId).subscribe(data => {
      let tasks = JSON.parse(data);
      console.log(tasks);
      if (event.target) {
        this._todo = [];
        var task = event.target.value;
        var data_label = tasks.filter(s => s.task.value.includes(task))
        data_label.forEach(ele => {
          if (ele['task']['status'] == 'Completed') {
            // if(ele['task']['dueDate']<this._curr) //convert this to 'due date' later, not yet implemented in the backend
            this._todo.push(ele['task']);
          }
        });
        this._dataSource = new MatTableDataSource(this._todo);
        this._dataSource.sort = this.sort;
        this._dataSource.paginator = this.paginator;
      }
      else {
        tasks.forEach(ele => {
          console.log(ele['task'])
          if (ele['task']['status'] == 'Completed') {
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
  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // setTimeout(() => { console.log(this._todo) }, 1000);
  }

  createTask() {
    this._router.navigate(['/addTask'])
  }

  changeStatus(element, status) {
    var object = { val: {}, taskId: '' }
    object.taskId = element._id;
    object.val = { status: status };
    this._list.updateTask(object).subscribe(result => {
      element.status = status
      if(status != 'Completed'){
        this._todo = this._todo.filter((item) => item._id !== element._id);
        this._dataSource = new MatTableDataSource(this._todo);
        this._dataSource.sort = this.sort;
        this._dataSource.paginator = this.paginator;
      }
    }, (error) => {
      this._toast.error("Unable to change the status")
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
