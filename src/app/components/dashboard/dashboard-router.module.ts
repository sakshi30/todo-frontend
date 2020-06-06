import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LoginGuard } from 'src/app/shared/login.guard';


const routes: Routes = [{
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard]
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
