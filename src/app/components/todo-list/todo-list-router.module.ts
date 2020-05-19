import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { ArchiveComponent } from './archive/archive.component';

const routes: Routes = [{
    path: 'upcoming',
    component: UpcomingComponent
},
{
    path: 'archive',
    component: ArchiveComponent
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ToDoListRoutingModule { }
