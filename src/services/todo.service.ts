import { Injectable } from '@angular/core';
import todo from '../data/todo-list.json'
import { Todo } from 'src/data-models/Todo';
import { User } from 'src/data-models/User';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoList: Todo[] = todo;
  currentUser: User

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (localStorage.getItem('todoList')) {
      this.todoList = JSON.parse(localStorage.getItem('todoList'));
    }
  }

  getTodoList(): Todo[] {
    return this.todoList;
  }

  addTodoItem(title: string): void {
    let todoItem = new Todo();
    todoItem.title = title;
    todoItem.createdByUserId = this.currentUser.id;
    todoItem.isDone = false;
    this.todoList.push(todoItem);
    localStorage.setItem('todoList', JSON.stringify(this.todoList))
  }


  updateTodoItem(id: string) {

  }

  deleteTodoItem(id: string) {

  }

  generateTodoItemId(): number {
    return this.todoList.length
  }


}
