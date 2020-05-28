import { Component, OnInit, ViewChild } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-label-det',
  templateUrl: './label-det.component.html',
  styleUrls: ['./label-det.component.css']
})
export class LabelDetComponent implements OnInit {

  private _todo: any[] = [];

  private _userId: string = '5ec3c5187ea72e2c5cdedd80';
  private _label: string = 'label 2'

  private _curr: any;
  private _cols: string[] = ['c_date', 'to-do', 'label', 'status', 'd_date', 'action'];
  private _dataSource: any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor( private _list: GetListService, private _activatedRoute: ActivatedRoute ) {
    this._label = this._activatedRoute.snapshot.paramMap.get('label');

    this._list.tasksByLabel(this._userId, this._label).subscribe(data => { 
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
