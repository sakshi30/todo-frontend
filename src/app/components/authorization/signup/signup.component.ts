import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public user: User  = {username: '', password: '', email: '', security_question: '', security_answer: ''}
  public password2: string = '';
  public security_questions = [
    "What is the name of your favorite pet?", 
    "What is your mother's maiden name?",
    "What is your favorite color?",
    "In what city were you born?",
    "What is the name of your first grade teacher?"
  ]
  constructor(
    private _auth: AuthorizationService,
    private _toast: ToastrService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  signupUser(){
    this._toast.info("Registering user...")
    this._auth.registerUser(this.user)
        .subscribe(userRegistered => {
            this._toast.success(userRegistered.status)
            this._router.navigate(['/login'])
          },
          error => {
            this._toast.error(error)
        })
  }

}
