import { Component, OnInit, ViewChild } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.sass']
})
export class ArchiveComponent implements OnInit {

  private _todo: any[] = [];

  private _curr: any;
  private _cols: string[] = ['date', 'to-do', 'label', 'status'];
  private _dataSource: any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private _list: GetListService) { 
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

}
