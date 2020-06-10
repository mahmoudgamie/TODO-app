import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from 'src/services/todo.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Todo } from 'src/data-models/Todo';

@Component({
  selector: 'app-create-or-edit',
  templateUrl: './create-or-edit.component.html',
  styleUrls: ['./create-or-edit.component.css']
})
export class CreateOrEditComponent implements OnInit {

  controlForm: FormGroup
  todoItemIndex: number;
  todoItem: Todo;
  statusValues = ['Pending', 'Started', 'Completed'];
  formMode: string;

  constructor(private fb: FormBuilder, private todoService: TodoService, private router: Router, private activatedRoute: ActivatedRoute) { }

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

  buildForm(): void {
    this.controlForm = this.fb.group({
      title: [this.todoItem ? this.todoItem.title : '', Validators.required],
      status: [this.todoItem ? this.todoItem.status : '', Validators.required]
    })
  }


  createTodoItem() {
    const title = this.controlForm.get('title').value;
    this.todoService.addTodoItem(title);
    this.router.navigate(['/home']);
  }

  updateTodoItem() {
    const title = this.controlForm.get('title').value;
    const status = this.controlForm.get('status').value;
    this.todoService.updateTodoItem(this.todoItemIndex, title, status);
    this.router.navigate(['/home']);
  }

  saveForm(): void {
    if (this.formMode === 'edit') {
      this.updateTodoItem();
    } else {
      this.createTodoItem();
    }

  }
}
