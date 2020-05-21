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
import { AddTaskComponent } from './add-task/add-task.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    UpcomingComponent,
    ArchiveComponent,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    ToDoListRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule
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
