import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthorizationModule {
  static forRoot() {
    return {
      ngModule: AuthorizationModule,
      providers: []
    };
  }
 }
