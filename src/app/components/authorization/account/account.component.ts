import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { ToDo } from 'src/app/models/todo';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public user: User;
  public userDetails: boolean = true;
  public changePassword: boolean = false;
  public password1: string = '';
  public password2: string = '';

  constructor(
    private _auth: AuthorizationService,
    private _toast: ToastrService) { }

  ngOnInit(): void {
    this.user = this._auth.sendUserDetails();
  }

  viewDetails(opt) {
    if (opt == 1) {
      this.userDetails = true;
      this.changePassword = false;
    }
    else if (opt == 2) {
      this.userDetails = false;
      this.changePassword = true;
    }
    else if (opt == 3) {
      this.userDetails = false;
      this.changePassword = false;
    }
  }


  saveUser(){
    this._auth.saveUser(this.user).subscribe(result => {
      localStorage.setItem('user', JSON.stringify(this.user));
      this._auth.sendDetails(this.user)
      this._toast.success(result.status)
    }, (error) => {
      this._toast.error(error);
    })
  }


  savePassword(){
    this._auth.changePassword({email: this.user.email, password: this.password1}).subscribe(result => {
      this._toast.success(result.status)
    }, (error) => {
      this._toast.error(error);
    })
  }

}
