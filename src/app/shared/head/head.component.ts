import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit, OnDestroy {

  public isLoggedIn: Boolean = false;
  public subscription: Subscription;
  public user: User;
  public navbarOpen = false;

  constructor(
    private _auth: AuthorizationService,
    private _router: Router) {
    this.subscription = this._auth.getUserDetails
      .subscribe(response => {
        //if the user doesnot have an error
        if (response != undefined && !Object(response).error) {
          this.user = response;
          this.isLoggedIn = true
        }
        else {
          
          this.isLoggedIn = false;
        }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

  goToPage(page) {
    this._router.navigate([page])
  }

  menuBtnClicked(btn) {
    let activeBtn = document.getElementsByClassName('active');
    for (let i = 0; i < activeBtn.length; i++) {
      activeBtn.item(i).classList.remove('active');
    }
    let btnClicked = document.getElementById('menu-' + btn);
    btnClicked.classList.add('active');
    this.goToPage(btn);
  }

  logOut() {
    this.user = null;
    this._auth.logOut();
    window.location.reload()
  }


}
