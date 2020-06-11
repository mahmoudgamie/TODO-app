import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'src/data-models/User';
import { Todo } from 'src/data-models/Todo';
import { TodoService } from './todo.service';
/**
 * A guard to prevent users that does not have edit privilege to access the edit route
 *
 * @export
 * @class PrivilegeGuardService
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class PrivilegeGuardService implements CanActivate {
  /**
   * Creates an instance of PrivilegeGuardService.
   * 
   * gets cuurent user from storage and compares its id with createdByUserId and provides privilege
   * @param {Router} router
   * @param {TodoService} todoService
   * @memberof PrivilegeGuardService
   */
  constructor(private router: Router, private todoService: TodoService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    // admin has full privilege
    if (currentUser.role === 'ADMIN') {
      return true;
    }
    // contributor can only edit his created todo item
    if (currentUser.role === 'CONTRIBUTOR') {
      const todoItem: Todo = this.todoService.getTodoItemByIndex(route.params.id);
      if (todoItem.createdByUserId == currentUser.id) {
        return true;
      }
    }
    // viewer can not edit
    this.router.navigate(['/home']);
    return false;
  }
}
