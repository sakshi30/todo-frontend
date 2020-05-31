import { Component, OnInit, ViewChild } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  private _todo: any[] = [];
  private _curr: any;
  private _cols: string[] = ['value', 'label', 'status', 'dueDate', 'action'];
  public all_status = ['Not Started', 'In Progress', 'Completed', 'Cancelled']
  private _dataSource: any;

  public userId: any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private _list: GetListService,
    private _router: Router,
    private _toast: ToastrService,
    private _auth: AuthorizationService) {
    this._filterTasks('');

  }

  ngOnInit(): void {
  }

  _filterTasks(event) {
    var yesterday = new Date(new Date().getTime());
    this._curr = yesterday.setDate(new Date().getDate() - 1);
    let tasks = this._auth.sendTaskDetails()[0];
    this.userId = tasks.userId;
    if (event.target) {
      this._todo = [];
      var task = event.target.value;
      var data_label = tasks.task.filter(s => s.value.includes(task))
      data_label.forEach(ele => {
        this._todo.push(ele);
      });
      this._dataSource = new MatTableDataSource(this._todo);
      this._dataSource.sort = this.sort;
      this._dataSource.paginator = this.paginator;
    }
    else {
      tasks['task'].forEach(ele => {
        if (ele.archieved) this._todo.push(ele);
      });
      this._dataSource = new MatTableDataSource(this._todo);
      this._dataSource.sort = this.sort;
      this._dataSource.paginator = this.paginator;
    }
  }

  createTask() {
    this._list.sendData({ data: null, update: false });
    this._router.navigate(['/addTask'])
  }


  editItem(item) {
    this._list.sendData({ data: item, update: true });
    this._router.navigate(['/addTask']);
  }

  unarchiveItem(element) {
    element.archieved = false;
    var object = { val: {}, taskId: '' }
    object.taskId = element._id;
    object.val = { archieved: element.archieved };
    this._list.updateTask(object).subscribe(result => {
      this._todo = this._todo.filter(element => element.archieved == true)
      console.log(this._todo);
      this._dataSource = new MatTableDataSource(this._todo);
      this._dataSource.sort = this.sort;
      this._toast.success("Task has been unarchieved")
    }, (error) => {
      this._toast.error("Unable to unarchieve this task")
    })
  }

  changeStatus(element, status){
    var object = { val: {}, taskId: '' }
    object.taskId = element._id;
    object.val = { status: status };
    this._list.updateTask(object).subscribe(result => {
      element.status = status
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
