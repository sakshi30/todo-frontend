import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ToDo, Task } from 'src/app/models/todo';
import { GetListService } from 'src/app/services/get-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
 
  public created_task: Task = {value: '', labels: [], status: [], date: {}}
  public tasks: ToDo =  {userId: '', task: this.created_task, label: [], status: [], _id: '' };
  visible = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  labelCtrl = new FormControl();
  filteredLabels: Observable<string[]>;
  all_labels: string[] = [];
  all_status: string[] =[];
  statusCtrl = new FormControl();
  filteredStatus: Observable<string[]>;

  @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @ViewChild('statusInput') statusInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoStatus') autoStatusAutoComplete: MatAutocomplete;

  constructor(
    private _auth: AuthorizationService,
    private _todo: GetListService,
    private _toast: ToastrService) {
    this.tasks = this._auth.sendUserDetails()[0]
    if(this.tasks){
      this.filteredLabels = this.labelCtrl.valueChanges.pipe(
        startWith(null),
        map((label: string | null) => label ? this._filter(label) : this.tasks.label.slice()));

      this.filteredStatus = this.statusCtrl.valueChanges.pipe(
        startWith(null),
        map((status: string | null) => status ? this._filterStatus(status) : this.tasks.status.slice()));
    }
    
   }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      if(!this.all_labels.includes(value.trim())){
        this.all_labels.push(value.trim())
        this.created_task.labels.push(value.trim());
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.labelCtrl.setValue(null);
  }

  addStatus(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      if(!this.all_status.includes(value.trim())){
        this.all_status.push(value.trim());
        this.created_task.status.push(value.trim());
      }
      
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.statusCtrl.setValue(null);
  }

  remove(label: string): void {
    const index = this.created_task.labels.indexOf(label);

    if (index >= 0) {
      this.created_task.labels.splice(index, 1);
    }
  }

  removeSatus(status: string): void {
    const index = this.created_task.status.indexOf(status);

    if (index >= 0) {
      this.created_task.status.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(!this.created_task.labels.includes(event.option.viewValue))
    this.created_task.labels.push(event.option.viewValue);
    this.labelInput.nativeElement.value = '';
    this.labelCtrl.setValue(null);
  }

  selectedStatus(event: MatAutocompleteSelectedEvent): void {
    if(!this.created_task.status.includes(event.option.viewValue))
    this.created_task.status.push(event.option.viewValue);
    this.statusInput.nativeElement.value = '';
    this.statusCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tasks.label.filter(label => label.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterStatus(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tasks.status.filter(status => status.toLowerCase().indexOf(filterValue) === 0);
  }


  createTask(){
    var object = {userId: '', val: {}}
    this.tasks._id = '';
    object.userId = this.tasks.userId;
    object.val = {task: this.created_task, label: this.all_labels, status: this.all_status}
    this._todo.storeData(object).subscribe(result => {
      this._toast.success(result.status);

    }, (error) => {
      this._toast.error(error);
    })
  }

}
