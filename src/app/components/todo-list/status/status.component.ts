import { Component, OnInit, ViewChild } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  private _status: any[] = [];
  private _cols: string[] = ['status'];
  private _dataSource: any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private _list: GetListService) { 
    let userId = '5ec3c5187ea72e2c5cdedd80';
    this._list.getStatusList(userId).subscribe(data => { 
      this._status = JSON.parse(data)['status'];
      this._dataSource = new MatTableDataSource(this._status);
      this._dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
  }

  addStatus() {
    alert('not yet implemented');
  }

}
