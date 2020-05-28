import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AccountComponent } from './account/account.component';
import { LoginGuard } from 'src/app/shared/login.guard';

const routes: Routes = [{
    path: 'login',
    component: LoginComponent
},
{
    path: 'signup',
    component: SignupComponent
},
{
    path: 'forgotpassword',
    component: ForgotPasswordComponent
},
{
    path: 'changepassword',
    component: ChangePasswordComponent
},
{
    path: 'account',
    component: AccountComponent,
    canActivate: [LoginGuard]
},
{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
