import { Component, OnInit, ViewChild } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-label-det',
  templateUrl: './label-det.component.html',
  styleUrls: ['./label-det.component.scss']
})
export class LabelDetComponent implements OnInit {

  private _todo: any[] = [];

  private _userId: string = '5ed33094de8023303093c09e';
  private _label: string = 'label 2'

  private _curr: any;
  private _cols: string[] = ['value', 'label', 'status', 'dueDate', 'action'];
  private _dataSource: any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _list: GetListService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _toast: ToastrService) {
    this._label = this._activatedRoute.snapshot.paramMap.get('label');
    this._filterTasks('');
  }

  _filterTasks(event) {
    this._list.tasksByLabel(this._userId, this._label).subscribe(data => {
      let tasks = JSON.parse(data);
      if (event.target) {
        this._todo = [];
        var task = event.target.value;
        var data_label = tasks.filter(s => s.task.value.includes(task))
        data_label.forEach(ele => {
          this._todo.push(ele['task']);
        });
        this._dataSource = new MatTableDataSource(this._todo);
        this._dataSource.sort = this.sort;
        this._dataSource.paginator = this.paginator;
      }
      else {
        tasks.forEach(t => {
          this._todo.push(t['task']);
        });
        this._dataSource = new MatTableDataSource(this._todo);
        this._dataSource.sort = this.sort;
        this._dataSource.paginator = this.paginator;
      }
    });
  }
  ngOnInit() {
  }

  createTask() {
    var item = { value: '', label: [this._label], status: [], dueDate: {} }
    this._list.sendData({ data: item, update: false })
    this._router.navigate(['/addTask'])
  }

  editItem(element) {
    this._list.sendData({ data: element, update: true });
    this._router.navigate(['/addTask']);
  }

  archiveItem(element) {
    element.archieved = true;
    var object = { val: {}, taskId: '' }
    object.taskId = element._id;
    object.val = { archieved: element.archieved };
    this._list.updateTask(object).subscribe(result => {
      this._toast.success("Task has been archieved")
    }, (error) => {
      this._toast.error("Unable to archieve this task")
    })
  }

  unarchiveItem(element) {
    element.archieved = false;
    var object = { val: {}, taskId: '' }
    object.taskId = element._id;
    object.val = { archieved: element.archieved };
    this._list.updateTask(object).subscribe(result => {
      this._toast.success("Task has been unarchieved")
    }, (error) => {
      this._toast.error("Unable to unarchieve this task")
    })
  }
}
