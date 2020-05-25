import { Component, OnInit, ViewChild } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-status-det',
  templateUrl: './status-det.component.html',
  styleUrls: ['./status-det.component.css']
})
export class StatusDetComponent implements OnInit {

  private _todo: any[] = [];

  private _userId: string = '5ec3c5187ea72e2c5cdedd80';
  private _status: string = 's'

  private _curr: any;
  private _cols: string[] = ['date', 'to-do', 'label', 'status'];
  private _dataSource: any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor( private _list: GetListService, private _activatedRoute: ActivatedRoute ) {
    this._status = this._activatedRoute.snapshot.paramMap.get('status');

    this._list.tasksByStatus(this._userId, this._status).subscribe(data => { 
      let tasks = JSON.parse(data);
      tasks.forEach(t => {
        this._todo.push(t['task']);
      });
      this._dataSource = new MatTableDataSource(this._todo);
      this._dataSource.sort = this.sort;
      });
  }

  ngOnInit() {
  }

}
