import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'src/data-models/User';
import { Todo } from 'src/data-models/Todo';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeGuardService implements CanActivate {

  constructor(private router: Router, private todoService: TodoService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.role === 'ADMIN') {
      return true;
    }
    if (currentUser.role === 'CONTRIBUTOR') {
      const todoItem: Todo = this.todoService.getTodoItemByIndex(route.params.id);
      if (todoItem.createdByUserId == currentUser.id) {
        return true;
      }
    }
    this.router.navigate(['/home']);
    return false;
  }
}
