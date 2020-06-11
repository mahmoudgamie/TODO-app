import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from 'src/services/todo.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Todo } from 'src/data-models/Todo';
/**
 * A single component for add and edit
 *
 * @export
 * @class CreateOrEditComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-create-or-edit',
  templateUrl: './create-or-edit.component.html',
  styleUrls: ['./create-or-edit.component.css']
})
export class CreateOrEditComponent implements OnInit, AfterViewInit {
  /**
   * represents the title input field for autofocus
   *
   * @type {ElementRef}
   * @memberof CreateOrEditComponent
   */
  @ViewChild('titleInput') titleInput: ElementRef;
  /**
   * a form for editing and creating 
   *
   * @type {FormGroup}
   * @memberof CreateOrEditComponent
   */
  controlForm: FormGroup
  /**
   * carries the todo item index from params
   *
   * @type {number}
   * @memberof CreateOrEditComponent
   */
  todoItemIndex: number;
  /**
   * carries the todo item for editing
   *
   * @type {Todo}
   * @memberof CreateOrEditComponent
   */
  todoItem: Todo;
  /**
   * status array provided for the ng-select box
   *
   * @memberof CreateOrEditComponent
   */
  statusValues = ['Pending', 'Started', 'Completed'];
  /**
   * sets mode editing or creating
   *
   * @type {string}
   * @memberof CreateOrEditComponent
   */
  formMode: string;
  /**
   * to toggle create another todo option on saving
   *
   * @type {boolean}
   * @memberof CreateOrEditComponent
   */
  createAnotherTodo: boolean;

  /**
   * getter for easy access to form fields
   *
   * @readonly
   * @memberof CreateOrEditComponent
   */
  get f() {
    return this.controlForm.controls;
  }

  /**
   *C reates an instance of CreateOrEditComponent.
   * @param {FormBuilder} fb instance of form builder
   * @param {TodoService} todoService instance for todoService
   * @param {Router} router instance for router for navigation
   * @param {ActivatedRoute} activatedRoute instance of activatedRoute to get url params
   * @memberof CreateOrEditComponent
   */
  constructor(private fb: FormBuilder, private todoService: TodoService, private router: Router, private activatedRoute: ActivatedRoute) { }
  /**
   * gets id from params and retrieves Todo item accordingly
   * 
   * sets form mode
   * 
   * builds the form 
   *
   * @memberof CreateOrEditComponent
   */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.formMode = 'edit';
        this.todoItemIndex = parseInt(params.id);
        this.todoItem = this.todoService.getTodoItemByIndex(this.todoItemIndex);
      }
    })
    this.buildForm();
  }
  /**
   * a cycle hook to provide auto focus to title input 
   *
   * @memberof CreateOrEditComponent
   */
  ngAfterViewInit() {
    this.titleInput.nativeElement.focus();
  }

  /**
   * builds the controlForm
   * 
   * provide control validation
   *
   * @memberof CreateOrEditComponent
   */
  buildForm(): void {
    this.controlForm = this.fb.group({
      title: [this.todoItem ? this.todoItem.title : '', Validators.required],
      status: [this.todoItem ? this.todoItem.status : '', Validators.required]
    })
  }

  /**
   * te create todo item method
   * 
   * resets form if createAnotherTodoItem checked
   * 
   * navigates to home page
   *
   * @memberof CreateOrEditComponent
   */
  createTodoItem() {
    const title = this.controlForm.get('title').value;
    this.todoService.addTodoItem(title);
    if (this.createAnotherTodo) {
      this.controlForm.reset();
      this.titleInput.nativeElement.focus();
    } else {
      this.router.navigate(['/home']);
    }

  }
  /**
   * updates the todo and navigates home page
   *
   * @memberof CreateOrEditComponent
   */
  updateTodoItem() {
    const title = this.controlForm.get('title').value;
    const status = this.controlForm.get('status').value;
    this.todoService.updateTodoItem(this.todoItemIndex, title, status);
    this.router.navigate(['/home']);
  }
  /**
   * checks the mode and submits according to mode
   *
   * @memberof CreateOrEditComponent
   */
  saveForm(): void {
    if (this.formMode === 'edit') {
      this.updateTodoItem();
    } else {
      this.createTodoItem();
    }

  }
}
