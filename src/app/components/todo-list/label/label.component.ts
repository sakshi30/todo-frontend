import { Component, OnInit, ViewChild } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, startWith, map } from 'rxjs/operators';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  private _labels: any[] = [];
  private _cols: string[] = ['label'];
  private _dataSource: any;
  public labelCtrl = new FormControl();
  public filteredLabel: Observable<any>;
  public userId: any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private _list: GetListService,
    private _auth: AuthorizationService) { 
      this.filteredLabel = this.labelCtrl.valueChanges.pipe(debounceTime(500), startWith(''), map(label => this._filterLabels(label)))
      this._filterLabels('')
  }

  _filterLabels(event){
    //this.userId = this._auth.sendUserDetails()._id;
    this.userId = '5ec3c5187ea72e2c5cdedd80';
    this._list.getLabelList(this.userId).subscribe(data => {        
      if(event.target){
        var label = event.target.value;   
        this._labels = JSON.parse(data)['label'].filter(s => s.includes(label))
      }
      else{
        this._labels = JSON.parse(data)['label'];
      }
      this._dataSource = new MatTableDataSource(this._labels);
      this._dataSource.sort = this.sort;
    });
    return this._labels;
  }

  ngOnInit() {
  }

  addLabel() {
    alert('not yet implemented');
  }

}
