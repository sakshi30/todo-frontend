import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: User  = {username: '', password: '', email: '', security_answer: '', security_question: ''}
  constructor(
    private _auth: AuthorizationService,
    private _toast: ToastrService,
    private _router: Router) { }

  ngOnInit(): void {
  }


  loginUser() {
    this._toast.info('Verifying user. Please wait..')
    this._auth.loginUser(this.user)
      .subscribe(loggedUser => {
        this._toast.success(loggedUser.status)
        this._router.navigate(['/dashboard'])
      }, error => {
        this._toast.error(error)
      })
  }

}
