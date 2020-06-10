import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/data-models/Todo';
import { TodoService } from 'src/services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todoList: Todo[];

  constructor(private todoservice: TodoService) { }

  ngOnInit(): void {
    this.todoList = this.todoservice.getTodoList();
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

}
