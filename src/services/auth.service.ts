import { Injectable } from '@angular/core';
import { User } from 'src/data-models/User';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from './users.service';
import { TodoService } from './todo.service';
import todo from '../data/todo-list.json'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[];
  authentication = new BehaviorSubject(false);
  getAuthentication = this.authentication.asObservable();

  constructor(private router: Router, private usersService: UsersService, private todoService: TodoService) {
    if (localStorage.getItem('status') === 'isAuthenticated') {
      this.updateAuthentication(true);
    }
    this.users = this.usersService.getUsers();

  }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username.trim().toLowerCase() && u.password === password)
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('status', 'isAuthenticated');
      this.usersService.updateUsername(user.username);
      this.updateAuthentication(true);

      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.clear();
    // this.todoService.todoList = todo;
    this.updateAuthentication(false);
    this.usersService.updateUsername('')
    this.router.navigate(['login']);
  }

  updateAuthentication(authentication: boolean): void {
    this.authentication.next(authentication);
  }
}
