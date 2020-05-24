import { Component, OnInit, ViewChild } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.sass']
})
export class UpcomingComponent implements OnInit {

  private _todo: any[] = [];

  private _curr: any;
  private _cols: string[] = ['date', 'to-do', 'label', 'status'];
  private _dataSource: any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private _list: GetListService,
    private _router: Router) { 
    let userId = '5ec3c5187ea72e2c5cdedd80';
    this._curr = new Date();
    this._list.getTaskList(userId).subscribe(data => { 
      let tasks = JSON.parse(data)['task'];
      tasks.forEach(ele => {
        if(ele.date<=this._curr) //convert this to 'due date' later, not yet implemented in the backend
          this._todo.push(ele);
      });
      this._todo = tasks;
      this._dataSource = new MatTableDataSource(this._todo);
      this._dataSource.sort = this.sort;
      console.log(this._todo, this._dataSource);
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
