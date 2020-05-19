import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  public isLoggedIn: Boolean = false;
  public subscription: Subscription;
  public user: User;

  constructor(private _auth: AuthorizationService) { 
    //subscribe to user login
    this.subscription = this._auth.getUserDetails
      .subscribe(response => {
        //if the user doesnot have an error
        if (response != undefined && !Object(response).error) {
          this.user = response;
          this.isLoggedIn = true;
        }
        else {
          this.isLoggedIn = false;
        }
      });
  }

  ngOnInit(): void {
  }

}
