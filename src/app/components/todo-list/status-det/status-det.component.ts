import { Component, OnInit, ViewChild } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-status-det',
  templateUrl: './status-det.component.html',
  styleUrls: ['./status-det.component.scss']
})
export class StatusDetComponent implements OnInit {

  private _todo: any[] = [];

  private _userId: string = '5ed33094de8023303093c09e';
  private _status: string = 's'

  private _curr: any;
  private _cols: string[] = ['date', 'value', 'label', 'status', 'dueDate', 'action'];
  private _dataSource: any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor( 
    private _list: GetListService, 
    private _activatedRoute: ActivatedRoute,
    private _router: Router ) {
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

  createTask(){
    var item = {value: '', label: [], status: [this._status], dueDate: {}}
    this._list.sendData({data: item, update: false})
    this._router.navigate(['/addTask'])
  }

  editItem(element){
    this._list.sendData({data: element, update: true});
    this._router.navigate(['/addTask']);
  }

}
