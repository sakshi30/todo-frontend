import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListRoutingModule } from './todo-list-router.module';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { ArchiveComponent } from './archive/archive.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    UpcomingComponent,
    ArchiveComponent
  ],
  imports: [
    CommonModule,
    ToDoListRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatSortModule
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
