import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { ArchiveComponent } from './archive/archive.component';
import { LoginGuard } from 'src/app/shared/login.guard';
import { AddTaskComponent } from './add-task/add-task.component';
import { LabelComponent } from './label/label.component';
import { StatusComponent } from './status/status.component';
import { LabelDetComponent } from './label-det/label-det.component';
import { StatusDetComponent } from './status-det/status-det.component';
import { CompletedComponent } from './completed/completed.component';

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
  path: 'completed',
  component: CompletedComponent,
  canActivate: [LoginGuard]
},
{
  path: 'label',
  component: LabelComponent
},
{
  path: 'status',
  component: StatusComponent
},
{
    path: 'addTask',
    component: AddTaskComponent,
    canActivate: [LoginGuard]
},
{
  path: 'labelDet/:label',
  component: LabelDetComponent
},
{
  path: 'statusDet/:status',
  component: StatusDetComponent
}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ToDoListRoutingModule { }
