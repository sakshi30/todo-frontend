import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { ArchiveComponent } from './archive/archive.component';
<<<<<<< HEAD
import { HomeComponent } from './home/home.component';
=======
import { LoginGuard } from 'src/app/shared/login.guard';
>>>>>>> a7e891b72e593d25880aeb0bce1c3b4ae2b3f1af

const routes: Routes = [{
    path: 'upcoming',
    component: UpcomingComponent,
    canActivate: [LoginGuard]
},
{
    path: 'archive',
<<<<<<< HEAD
    component: ArchiveComponent
},
{
  path: 'home',
  component: HomeComponent
}  
];
=======
    component: ArchiveComponent,
    canActivate: [LoginGuard]
}];
>>>>>>> a7e891b72e593d25880aeb0bce1c3b4ae2b3f1af

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ToDoListRoutingModule { }
