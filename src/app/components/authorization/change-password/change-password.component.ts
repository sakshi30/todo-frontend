import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public user: User  = {username: '', password: '', email: '', security_question: '', security_answer: ''}
  public password2: string = '';
  constructor(
    private route: ActivatedRoute,
    private _auth: AuthorizationService,
    private _toast: ToastrService) { }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        this.user.email = params['user']
      });
  }


  changePassword(){
    this._auth.changePassword(this.user).subscribe(result => {
      this._toast.success(result.status)
    }, (error) => {
      this._toast.error(error)
    })

  }

}
