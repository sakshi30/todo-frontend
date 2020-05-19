import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListRoutingModule } from './todo-list-router.module';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { ArchiveComponent } from './archive/archive.component';


@NgModule({
  declarations: [
    UpcomingComponent,
    ArchiveComponent
  ],
  imports: [
    CommonModule,
    ToDoListRoutingModule
  ]
})
export class TodoListModule { 
  static forRoot() {
    return {
      ngModule: TodoListModule,
      providers: []
    };
  }
}
