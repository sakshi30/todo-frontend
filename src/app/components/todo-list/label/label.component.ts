import { Component, OnInit, ViewChild } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { MatDialog } from '@angular/material/dialog';
import { AddLabelComponent } from '../add-label/add-label.component';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  private _labels: any[] = [];
  private _cols: string[] = ['label', 'task_number', 'archieved_task', 'action'];
  private _dataSource: any;
  public userId: any;
  public tasks: any[] = [];
  public all_labels: any[] = [];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private _list: GetListService,
    private _auth: AuthorizationService,
    private _dialog: MatDialog, 
    private _toast: ToastrService) { 
      this._filterLabels('')
  }

  _filterLabels(event){
    this.userId = this._auth.sendUserDetails()._id;
    this._list.getTaskMetaList(this.userId).subscribe(data => {
      this.tasks = JSON.parse(data)['task']; 
      this.all_labels = JSON.parse(data)['label']
      if(event.target){
        this._labels = [];
        var label = event.target.value;   
        var data_label = JSON.parse(data)['label'].filter(s => s.includes(label))
        data_label.forEach(element => {
          var task_number = 0;
          var archieved_task = 0;
          JSON.parse(data)['task'].forEach(task => {
            task['label'].forEach(label => {
              if(label == element){
                task_number += 1
                if(task.archieved){
                  archieved_task += 1
                }
              }
            })
          })
          this._labels.push({label: element, task_number: task_number, archieved_task: archieved_task})
        })
      }
      else{
        console.log(data);
        JSON.parse(data)['label'].forEach(element => {
          var task_number = 0;
          var archieved_task = 0;
          JSON.parse(data)['task'].forEach(task => {
            task['label'].forEach(label => {
              if(label == element){
                task_number += 1
                if(task.archieved){
                  archieved_task += 1
                }
              }
            })
            
          })
          this._labels.push({label: element, task_number: task_number, archieved_task: archieved_task})
        });
      }
      this._dataSource = new MatTableDataSource(this._labels);
      this._dataSource.sort = this.sort;
      this._dataSource.paginator = this.paginator;

    });
    return this._labels;
  }

  ngOnInit() {
  }

  addLabel() {
    var ref = this._dialog.open(AddLabelComponent, {width: '500px', data: {label: this._labels, update: ''}});
    ref.afterClosed().subscribe(result => {
      this._labels = [];
      this._filterLabels('')
    })
  }

  editLabel(element){
    var ref = this._dialog.open(AddLabelComponent, {width: '500px', data: {label: this.all_labels, update: element, tasks: this.tasks }});
    ref.afterClosed().subscribe(result => {
      this._labels = [];
      this._filterLabels('')
    })
  }

  deleteLabel(element){
    this.tasks.forEach(task => {
      if(task.label.includes(element.label)){
        task.label.splice(task.label.indexOf(element.label), 1);
      }
    });
    this.all_labels.splice(this.all_labels.indexOf(element.label), 1)
    this._list.updateLabelAndStatus(this.userId, this.all_labels, this.tasks, 1).subscribe(result => {
      this._labels = [];
      this._filterLabels('')
      this._toast.success("Label Deleted successfully");
      
    }, (error) => {
      this._toast.error("Unable to delete label")
      this._labels = [];
      this._filterLabels('')
    })
  }
}
