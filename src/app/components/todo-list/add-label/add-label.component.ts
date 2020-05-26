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
    this.userId = '5ec3c5187ea72e2c5cdedd80';
    this.label = this.data.update.label
    if(this.label != ''){
      this.update = true
    }
    else{
      this.update = false
    }
  }


  createLabel(){
    this._list.addLabel(this.userId, this.label).subscribe(result => {
      if(result){
        this._matRef.close();
        this._toast.success(result.status)
      }
    }, (error) => {
      this._toast.error(error)
    })
  }


  checkLabel(label){
    var value = this.data.label.filter(s => s.label.includes(label))
    if(value.length == 1){
      this.labelError = 'Label already exists'
    }
  }

  updateLabel(){
    console.log(this.data.update, this.label)
  }

}
