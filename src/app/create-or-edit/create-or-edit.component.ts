import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from 'src/services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-or-edit',
  templateUrl: './create-or-edit.component.html',
  styleUrls: ['./create-or-edit.component.css']
})
export class CreateOrEditComponent implements OnInit {

  controlForm: FormGroup

  constructor(private fb: FormBuilder, private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.controlForm = this.fb.group({
      title: ['', Validators.required],
    })
  }


  createTodoItem() {
    const title = this.controlForm.get('title').value;
    this.todoService.addTodoItem(title);
    this.router.navigate(['/home']);
  }

  submitForm(): void {
    this.createTodoItem();
  }
}
