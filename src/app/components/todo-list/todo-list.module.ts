import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListRoutingModule } from './todo-list-router.module';

import { UpcomingComponent } from './upcoming/upcoming.component';
import { ArchiveComponent } from './archive/archive.component';
import { LabelComponent } from './label/label.component';
import { StatusComponent } from './status/status.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { LabelDetComponent } from './label-det/label-det.component';
import { StatusDetComponent } from './status-det/status-det.component';
import { CompletedComponent } from './completed/completed.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AddLabelComponent } from './add-label/add-label.component';
import { AddStatusComponent } from './add-status/add-status.component';

@NgModule({
  declarations: [
    UpcomingComponent,
    ArchiveComponent,
    AddTaskComponent,
    LabelComponent,
    StatusComponent,
    LabelDetComponent,
    StatusDetComponent,
    CompletedComponent,
    AddLabelComponent,
    AddStatusComponent
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
    FlexLayoutModule,
    MatChipsModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  providers: [MatDatepickerModule],
  entryComponents: [AddLabelComponent, AddStatusComponent]
})
export class TodoListModule { 
  static forRoot() {
    return {
      ngModule: TodoListModule,
      providers: []
    };
  }
}
