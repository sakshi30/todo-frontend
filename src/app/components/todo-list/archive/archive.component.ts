import { Component, OnInit, ViewChild } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  private _todo: any[] = [];

  private _curr: any;
  private _cols: string[] = ['c_date', 'to-do', 'label', 'status', 'd_date', 'action'];
  private _dataSource: any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private _list: GetListService,
    private _router: Router) { 
    let userId = '5ec3c5187ea72e2c5cdedd80';
    this._curr = new Date();
    this._list.getTaskList(userId, 1).subscribe(data => { 
      let tasks = JSON.parse(data);
      tasks.forEach(ele => {
        this._todo.push(ele['task']);
      });
      this._dataSource = new MatTableDataSource(this._todo);
      this._dataSource.sort = this.sort;
    });
    
  }

  ngOnInit(): void {
  }

  createTask(){
    this._list.sendData({data: null, update: false});
    this._router.navigate(['/addTask'])
  }


  editItem(item){
    this._list.sendData({data: item, update: true});
    this._router.navigate(['/addTask']);
  }


}
