import { Injectable } from '@angular/core';
import { User } from 'src/data-models/User';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from './users.service';
import { TodoService } from './todo.service';
import todo from '../data/todo-list.json'
/**
 * provides login service for users
 *
 * @export
 * @class AuthService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   *  all users
   *
   * @type {User[]}
   * @memberof AuthService
   */
  users: User[];
  /**
   * we use behavior subjecr for logout button
   *
   * @memberof AuthService
   */
  authentication = new BehaviorSubject(false);
  /**
   * we recieve authentication status in this observable
   *
   * @memberof AuthService
   */
  getAuthentication = this.authentication.asObservable();
  /**
   * Creates an instance of AuthService.
   * @param {Router} router to navigate after login to home page
   * @param {UsersService} usersService to match username and password
   * @memberof AuthService
   */
  constructor(private router: Router, private usersService: UsersService) {
    if (localStorage.getItem('status') === 'isAuthenticated') {
      this.updateAuthentication(true);
    }
    this.users = this.usersService.getUsers();

  }
/**
 * compare username and password and provide login
 * 
 * sets currentUser to localstorage and update authentication for logout button
 *
 * @param {string} username
 * @param {string} password
 * @returns {boolean}
 * @memberof AuthService
 */
login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username.trim().toLowerCase() && u.password === password)
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('status', 'isAuthenticated');
      // update username for welcome message in AppComponent
      this.usersService.updateUsername(user.username);
      // update login status for logout btn
      this.updateAuthentication(true);
      return true;
    } else {
      return false;
    } 
  }


/**
 * clears session, updates authentication for logout btn, and updates welcome message
 * 
 * navigates to login page
 *
 * @memberof AuthService
 */
logout(): void {
    localStorage.clear();
    // this.todoService.todoList = todo;
    this.updateAuthentication(false);
    this.usersService.updateUsername('')
    this.router.navigate(['login']);
  }
/**
 * An authentication message disaptcher used by the log out btn
 *
 * @param {boolean} authentication a boolean that represents authentication status
 * @memberof AuthService
 */
updateAuthentication(authentication: boolean): void {
    this.authentication.next(authentication);
  }
}
