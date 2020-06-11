import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/data-models/Todo';
import { TodoService } from 'src/services/todo.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';
import { User } from 'src/data-models/User';
import { ToastrService } from 'ngx-toastr';

/**
 * a component to provide listing for todo list and todo item CRUD
 *
 * @export
 * @class HomeComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /**
   * carries the todo list 
   *
   * @type {Todo[]}
   * @memberof HomeComponent
   */
  todoList: Todo[];

  /**
   * carries the delete index for the target todo item
   *
   * @type {number}
   * @memberof HomeComponent
   */
  deleteIndex: number;

  /**
   * carries the current user from local storage
   *
   * @type {User}
   * @memberof HomeComponent
   */
  currentUser: User;
  /**
   *Creates an instance of HomeComponent.
   * @param {TodoService} todoService creates todoService instance
   * @param {Router} router creates router instance for navigation
   * @param {UsersService} usersService creates usersService instance
   * @param {ToastrService} toastr instance of toastr for alerts
   * @memberof HomeComponent
   */
  constructor(private todoService: TodoService, private toastr: ToastrService, private router: Router, private usersService: UsersService) { }
  /**
   * gets todo list and user, then updates localStorage
   *
   * @memberof HomeComponent
   */
  ngOnInit(): void {
    this.todoList = this.todoService.getTodoList();
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  /**
   * 
   *
   * @param {number} id
   * @returns {User} to get username for displaying
   * @memberof HomeComponent
   */
  getUserName(id: number): User {
    return this.usersService.getUserById(id)
  }

  /**
   * deletes a target todo item by index and refersh list
   *
   * @memberof HomeComponent
   */
  delete() {
    this.todoService.deleteTodoItem(this.deleteIndex);
    this.toastr.success('Todo Item Deleted');
    this.router.navigate(['/home']);
  }
  /**
   * displays edit and delete btns according to user privilege
   *
   * @param {number} createdByUserId to compate with currentUser id
   * @returns {boolean} to toggle dispaly
   * @memberof HomeComponent
   */
  checkPrivilege(createdByUserId: number): boolean {
    // admin have full privilege
    if (this.currentUser.role === "ADMIN") {
      return true;
    }
    // contributor have privilege to his own todo items
    if (this.currentUser.role === "CONTRIBUTOR") {
      if (createdByUserId == this.currentUser.id) {
        return true;
      }
    }
    // viewe no privilege
    return false;
  }

}
