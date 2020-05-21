import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { ArchiveComponent } from './archive/archive.component';
import { LoginGuard } from 'src/app/shared/login.guard';
import { AddTaskComponent } from './add-task/add-task.component';

const routes: Routes = [{
    path: 'upcoming',
    component: UpcomingComponent,
    canActivate: [LoginGuard]
},
{
    path: 'archive',
    component: ArchiveComponent,
    canActivate: [LoginGuard]
},
{
    path: 'addTask',
    component: AddTaskComponent,
    canActivate: [LoginGuard]
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ToDoListRoutingModule { }
