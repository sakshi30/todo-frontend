import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { ArchiveComponent } from './archive/archive.component';
import { LoginGuard } from 'src/app/shared/login.guard';

const routes: Routes = [{
    path: 'upcoming',
    component: UpcomingComponent,
    canActivate: [LoginGuard]
},
{
    path: 'archive',
    component: ArchiveComponent,
    canActivate: [LoginGuard]
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ToDoListRoutingModule { }
