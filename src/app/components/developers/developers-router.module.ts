import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from 'src/app/shared/login.guard';
import { DevelopersComponent } from './developers.component';


const routes: Routes = [{
    path: 'developers',
    component: DevelopersComponent,
    canActivate: [LoginGuard]
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class DevelopersRoutingModule { }
