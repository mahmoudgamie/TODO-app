import { Injectable } from '@angular/core';
import todo from '../data/todo-list.json'
import { Todo } from 'src/data-models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoList: Todo[] = todo;

  constructor() {
  }

  getTodoList(): Todo[] {
    return this.todoList;
  }

}
