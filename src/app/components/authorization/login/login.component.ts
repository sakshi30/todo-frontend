import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: User  = {username: '', password: '', email: '', security_answer: '', security_question: ''}
  constructor(
    private _auth: AuthorizationService,
    private _toast: ToastrService) { }

  ngOnInit(): void {
  }


  loginUser() {
    this._auth.loginUser(this.user)
      .subscribe(loggedUser => {
        this._toast.success(loggedUser.status)
      }, error => {
        this._toast.error(error)
      })
  }

}
