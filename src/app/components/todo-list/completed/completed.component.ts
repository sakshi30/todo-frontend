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
  private _cols: string[] = ['date', 'value', 'label', 'status', 'dueDate', 'action'];
  private _dataSource: any;
  public taskId: any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private _list: GetListService,
    private _router: Router,
    private _toast: ToastrService,
    private _auth: AuthorizationService) {
    this._filterTasks('');

  }

  _filterTasks(event){
    
    var yesterday = new Date(new Date().getTime());
    this._curr = yesterday.setDate(new Date().getDate() - 1);
    let tasks = this._auth.sendTaskDetails()[0]
    this.taskId = tasks._id;
    if (event.target) {
      this._todo = [];
      var task = event.target.value;
      var data_label = tasks.task.filter(s => s.value.includes(task))
      data_label.forEach(ele => {
        if (new Date(ele['dueDate']).getTime() < this._curr) {
          // if(ele['task']['dueDate']<this._curr) //convert this to 'due date' later, not yet implemented in the backend
          this._todo.push(ele);
        }
      });
      this._dataSource = new MatTableDataSource(this._todo);
      this._dataSource.sort = this.sort;
      this._dataSource.paginator = this.paginator;
    }
    else{
      tasks['task'].forEach(ele => {
        if (new Date(ele['dueDate']).getTime() < this._curr) {
          // if(ele['task']['dueDate']<this._curr) //convert this to 'due date' later, not yet implemented in the backend
          this._todo.push(ele);
        }
      });
      this._dataSource = new MatTableDataSource(this._todo);
      this._dataSource.sort = this.sort;
      this._dataSource.paginator = this.paginator;
    }
  }
  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // setTimeout(() => { console.log(this._todo) }, 1000);
  }

  createTask() {
    this._router.navigate(['/addTask'])
  }


  deleteItem(element) {
    this._list.deleteTask(1, this.taskId, element._id).subscribe(result => {
      this._todo = this._todo.filter(el => el._id != element._id)
      this._dataSource = new MatTableDataSource(this._todo);
      this._dataSource.sort = this.sort;
      this._toast.success("Task deleted sccessfully")
    }, (error) => {
      this._toast.error("Unable to delete the task")
    })
  }

}
