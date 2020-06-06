import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { ArchiveComponent } from './archive/archive.component';
import { LoginGuard } from 'src/app/shared/login.guard';
import { AddTaskComponent } from './add-task/add-task.component';
import { LabelComponent } from './label/label.component';
import { LabelDetComponent } from './label-det/label-det.component';
import { CompletedComponent } from './completed/completed.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';

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
  path: 'allTasks',
  component: AllTasksComponent,
  canActivate: [LoginGuard]
},
{
  path: 'label',
  component: LabelComponent,
  canActivate: [LoginGuard]
},
{
    path: 'addTask',
    component: AddTaskComponent,
    canActivate: [LoginGuard]
},
{
  path: 'labelDet/:label',
  component: LabelDetComponent,
  canActivate: [LoginGuard]
}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ToDoListRoutingModule { }
