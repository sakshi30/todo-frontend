import { Component } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'To Do List';

  public isLoggedIn: boolean = false;
  constructor(public authService: AuthorizationService){
    this.authService.getUserDetails
      .subscribe(response => {
        //if the user doesnot have an error
        if (response != undefined && !Object(response).error) {
          this.isLoggedIn = true;
        }
        else {
          this.isLoggedIn = false;
        }
      });
  }
}
