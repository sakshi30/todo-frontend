import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit, OnDestroy, Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ToDo, Task } from 'src/app/models/todo';
import { GetListService } from 'src/app/services/get-list.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit, OnDestroy {
 
  public created_task: Task = {value: '', label: [], status: '', dueDate: {}, progress: 0}
  public tasks: ToDo =  {userId: '', task: this.created_task, label: [], status: []};
  visible = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  labelCtrl = new FormControl();
  filteredLabels: Observable<string[]>;
  all_labels: string[] = [];
  updated_task = false;
  data_subscription: Subscription;
  status = new FormControl();

  @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @ViewChild('statusInput') statusInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoStatus') autoStatusAutoComplete: MatAutocomplete;

  constructor(
    private _auth: AuthorizationService,
    private _todo: GetListService,
    private _toast: ToastrService,
    private _router: Router) {
    this.tasks = this._auth.sendTaskDetails()[0]    
    this.data_subscription =  this._todo.dataObservable.subscribe(result => {
      if(result.data){
        this.updated_task = result.update;
        this.created_task = result.data
      }
      else{
        this.updated_task = result.update;
        this.created_task = {value: '', label: [], status: '', dueDate: {}, progress: 0};
      }
    })
    
    if(this.tasks){
      this.filteredLabels = this.labelCtrl.valueChanges.pipe(
        startWith(null),
        map((label: string | null) => label ? this._filter(label) : this.tasks.label.slice()));
    }
    this.tasks.status = ['Not Started', 'In Progress', 'Completed', 'Cancelled'];
    
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
        this.created_task.label.push(value.trim());
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.labelCtrl.setValue(null);
  }


  remove(label: string): void {
    const index = this.created_task.label.indexOf(label);

    if (index >= 0) {
      this.created_task.label.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(!this.created_task.label.includes(event.option.viewValue))
    this.created_task.label.push(event.option.viewValue);
    this.labelInput.nativeElement.value = '';
    this.labelCtrl.setValue(null);
  }

  selectedStatus(stat): void {
    this.created_task.status = stat
    this.statusInput.nativeElement.value = '';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tasks.label.filter(label => label.toLowerCase().indexOf(filterValue) === 0);
  }


  createTask(){
    var data = {}
    data['val'] = {task: this.created_task, label: this.all_labels, status: this.created_task.status}
    this._todo.storeData(this.tasks.userId, data).subscribe(result => {
      this._router.navigate(['/dashboard'])
      this._toast.success(result.status);

    }, (error) => {
      this._toast.error(error);
    })
  }


  updateTask(){
    var object = {userid: '', val: {}, taskId: ''}
    object.taskId = Object(this.created_task)._id;
    object.val = {value: this.created_task.value, label: this.created_task.label, status: this.created_task.status, dueDate: this.created_task.dueDate, progress: this.created_task.progress};
    object.userid = this.tasks.userId;
    this._todo.updateTask(object).subscribe(result => {
      this._router.navigate(['/dashboard'])
      this._toast.success(result.status);

    }, (error) => {
      this._toast.error(error);
    })
  }


  ngOnDestroy(){
    this.data_subscription.unsubscribe();
  }

}
