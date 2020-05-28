import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public user: User;

  constructor(private _auth: AuthorizationService) { }

  ngOnInit(): void {
    this.user = this._auth.sendUserDetails();
  }

}
