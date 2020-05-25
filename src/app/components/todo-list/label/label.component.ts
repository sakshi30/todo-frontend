import { Component, OnInit, ViewChild } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  private _labels: any[] = [];
  private _cols: string[] = ['label'];
  private _dataSource: any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private _list: GetListService) { 
    let userId = '5ec3c5187ea72e2c5cdedd80';
    this._list.getLabelList(userId).subscribe(data => { 
      this._labels = JSON.parse(data)['label'];
      this._dataSource = new MatTableDataSource(this._labels);
      this._dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
  }

  addLabel() {
    alert('not yet implemented');
  }

}
