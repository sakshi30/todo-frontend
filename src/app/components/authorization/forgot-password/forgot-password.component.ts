import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public user: User  = {username: '', password: '', email: '', security_answer: '', security_question: ''};
  public security_questions = [
    "What is the name of your favorite pet?", 
    "What is your mother's maiden name?",
    "What is your favorite color?",
    "In what city were you born?",
    "What is the name of your first grade teacher?"
  ];
  public set = false;
  constructor(
    private _auth: AuthorizationService,
    private _toast: ToastrService, 
    private _router: Router) { }

  ngOnInit(): void {
  }


  verifyUser(){
    this._auth.verifyUser(this.user).subscribe(result => {
      this.set = result.success;
      if(result.success) {
        this._toast.success(result.status);
        this._router.navigate(['/changepassword'], { queryParams: { user: this.user.email } })
      }
      else this._toast.error(result.status)
    }, (error) => {
      this._toast.error(error)
    })
  }
}
