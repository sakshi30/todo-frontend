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
  public taskId: any;
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
    let userId = '5ec3c5187ea72e2c5cdedd80';
    var yesterday = new Date(new Date().getTime());
    this._curr = yesterday.setDate(new Date().getDate() - 1);
    this._list.getTaskList(userId, 0).subscribe(data => {
      let tasks = JSON.parse(data);
      this.taskId = tasks[0]._id
      if(event.target){
        this._todo = [];
        var task = event.target.value;   
        var data_label = tasks.filter(s => s.task.value.includes(task))
        data_label.forEach(ele => {
          console.log(ele['task'])
          if (!ele['task'].archieved && new Date(ele['task']['dueDate']).getTime() >= this._curr) {
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
          if (!ele['task'].archieved && new Date(ele['task']['dueDate']).getTime() >= this._curr) {
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
