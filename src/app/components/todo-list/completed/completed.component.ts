import { Component, OnInit, ViewChild } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

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

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private _list: GetListService,
    private _router: Router) { 
    let userId = '5ec3c5187ea72e2c5cdedd80';
    this._curr = new Date();
    this._list.getTaskList(userId, 0).subscribe(data => { 
      let tasks = JSON.parse(data);
      tasks.forEach(ele => {
        // if(ele['task']['dueDate']>=this._curr) //convert this to 'due date' later, not yet implemented in the backend
          this._todo.push(ele['task']);
      });
      this._dataSource = new MatTableDataSource(this._todo);
      this._dataSource.sort = this.sort;
    });
    
  }
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // setTimeout(() => { console.log(this._todo) }, 1000);
  }

  createTask(){
    this._router.navigate(['/addTask'])
  }

}
