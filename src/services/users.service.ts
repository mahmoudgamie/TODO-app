
import { Injectable } from '@angular/core';
import users from '../data/users.json';
import { User } from 'src/data-models/User';
import { BehaviorSubject } from 'rxjs';

/**
 * service providing methods for user listing, get single user and update username for titling
 *
 * @export
 * @class UsersService
 */

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  /**
   * all users from json file
   *
   * @type {User[]}
   * @memberof UsersService
   */
  users: User[] = users;
  /**
 * rxjs subject to be observed and observable for sending username to AppComponent
 *
 * @memberof UsersService
 */
  username = new BehaviorSubject('');
  /**
   * a method to recieve updates on username when changed by updateUsername()
   *
   * @memberof UsersService
   */
  getUsername = this.username.asObservable();
  /**
   * Creates an instance of UsersService.
   * 
   * Checking if there is a user in a stored session and storing it
   * @memberof UsersService
   */
  constructor() {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.updateUsername(currentUser.username);
    }
  }
  /**
   * returns all users
   *
   * @returns {User[]}
   * @memberof UsersService
   */
  getUsers(): User[] {
    return users;
  }
  /**
   * retrieves user with id
   *
   * @param {number} id
   * @returns {User}
   * @memberof UsersService
   */
  getUserById(id: number): User {
    return users.find(u => u.id === id);
  }
  /**
   * updates username in AppComp for welcome message
   *
   * @param {string} username
   * @memberof UsersService
   */
  updateUsername(username: string): void {
    this.username.next(username);
  }
}


