import { Injectable } from '@angular/core';
import todo from '../data/todo-list.json'
import { Todo } from 'src/data-models/Todo';
import { User } from 'src/data-models/User';

/**
 * contains all CRUD methods to TODO listing and TodoItem
 * 
 * updates todo List in localStorage
 *
 * @export
 * @class TodoService
 */
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  /**
   * array of todo items mock data
   *
   * @type {Todo[]}
   * @memberof TodoService
   */
  todoList: Todo[] = todo;
  /**
   * carries the loged in user info
   *
   * @type {User}
   * @memberof TodoService
   */
  currentUser: User;

  constructor() {
    if (localStorage.getItem('todoList')) {
      this.todoList = JSON.parse(localStorage.getItem('todoList'));
    }
  }
  /**
   * returns the current todo list
   * 
   *
   * @returns {Todo[]}
   * @memberof TodoService
   */
  getTodoList(): Todo[] {
    return this.todoList;
  }
  /**
   * return todoItem by index
   *
   * @param {number} index
   * @returns {Todo}
   * @memberof TodoService
   */
  getTodoItemByIndex(index: number): Todo {
    return this.todoList[index];
  }

  /**
   * creates todo into the todoList and updates localStorage
   *
   * @param {string} title
   * @memberof TodoService
   */
  addTodoItem(title: string): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let todoItem = new Todo();
    todoItem.title = title;
    todoItem.createdByUserId = this.currentUser.id;
    todoItem.status = "Pending";
    this.todoList.push(todoItem);
    localStorage.setItem('todoList', JSON.stringify(this.todoList))
  }
  /**
   * finds todo item by array index and updates it
   *
   * @param {number} index
   * @param {string} title
   * @param {string} status
   * @memberof TodoService
   */
  updateTodoItem(index: number, title: string, status: string): void {
    this.todoList[index].title = title;
    this.todoList[index].status = status;
    localStorage.setItem('todoList', JSON.stringify(this.todoList))
  }
  /**
   * finds todo item by index and deletes it
   *
   * @param {number} index
   * @memberof TodoService
   */
  deleteTodoItem(index: number) {
    this.todoList.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(this.todoList))
  }

}
