import { Component, OnInit, Inject } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.scss']
})
export class AddLabelComponent implements OnInit {

  public label: string = '';
  public userId: string = '';
  public labelError: string = '';
  public update = false;
  constructor(
    private _list: GetListService,
    private _toast: ToastrService,
    private _matRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    //this.userId = this._auth.sendUserDetails()._id;
    this.userId = '5ed33094de8023303093c09e';
    this.label = this.data.update.label
    if(this.data.update != ''){
      this.update = true
    }
    else{
      this.update = false
    }
  }


  createLabel(){
    let data = {'val': { 'label': this.label } };
    this._list.storeData(this.userId, data).subscribe(result => {
      if(result){
        this._matRef.close();
        this._toast.success(result.status)
      }
    }, (error) => {
      this._toast.error(error)
    })
  }


  checkLabel(label){
    var value = this.data.label.filter(s => s.label == label)
    if(value.length == 1){
      this.labelError = 'Label already exists'
    }
    else{
      this.labelError = ''
    }
  }

  updateLabel(){
    console.log(this.data);
    this.data.tasks.forEach(task => {
      if(task.label.includes(this.data.update.label)){
        task.label.splice(task.label.indexOf(this.data.update.label), 1);
        task.label.unshift(this.label)
      }
    });
    this.data.label.splice(this.data.label.indexOf(this.data.update.label), 1)
    this.data.label.unshift(this.label)
    this._list.updateLabelAndStatus(this.userId, this.data.label, this.data.tasks, 1).subscribe(result => {
      this._matRef.close();
      this._toast.success(result.status)
    }, (error) => {
      this._toast.error(error)
    })
  }

}
