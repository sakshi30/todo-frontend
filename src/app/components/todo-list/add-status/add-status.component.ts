import { Component, OnInit, Inject } from '@angular/core';
import { GetListService } from 'src/app/services/get-list.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.scss']
})
export class AddStatusComponent implements OnInit {

  public status: string = '';
  public userId: string = '';
  public statusError: string = '';
  public update = false;
  constructor(
    private _list: GetListService,
    private _toast: ToastrService,
    private _matRef: MatDialogRef<AddStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    //this.userId = this._auth.sendUserDetails()._id;
    this.userId = '5ec3c5187ea72e2c5cdedd80';
    this.status = this.data.update.status
    if(this.data.update != ''){
      this.update = true
    }
    else{
      this.update = false
    }
  }


  createStatus(){
    this._list.addStatus(this.userId, this.status).subscribe(result => {
      if(result){
        this._matRef.close();
        this._toast.success(result.status)
      }
    }, (error) => {
      this._toast.error(error)
    })
  }


  checkStatus(status){
    console.log(this.data)
    var value = this.data.status.filter(s => s.status == status)
    console.log(value)
    if(value.length == 1){
      this.statusError = 'Status already exists'
    }
    else{
      this.statusError = ''
    }
  }

  updateStatus(){
    this.data.tasks.forEach(task => {
      if(task.status.includes(this.data.update.status)){
        task.status.splice(task.status.indexOf(this.data.update.status), 1);
        task.status.unshift(this.status)
      }
    });
    this.data.status.splice(this.data.status.indexOf(this.data.update.status), 1)
    this.data.status.unshift(this.status)
    this._list.updateLabelAndStatus(this.userId, this.data.status, this.data.tasks, 2).subscribe(result => {
      this._matRef.close();
      this._toast.success(result.status)
    }, (error) => {
      this._toast.error(error)
    })
  }
}
