import { Injectable } from '@angular/core';
import users from '../data/users.json';
import { User } from 'src/data-models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = users;
  username = new BehaviorSubject('');
  getUsername = this.username.asObservable();
  constructor() {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.updateUsername(currentUser.username);
    }
  }

  getUsers(): User[] {
    return users;
  }

  getUserById(id: number): User {
    return users.find(u => u.id === id);
  }

  updateUsername(username: string): void {
    this.username.next(username);
  }
}


