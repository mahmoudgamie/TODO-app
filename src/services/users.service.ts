import { Injectable } from '@angular/core';
import users from '../data/users.json';
import { User } from 'src/data-models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = users;
  constructor() { }

  getUsers(): User[] {
    return users;
  }

  getUserById(id: number): User {
    return users.find(u => u.id === id);
  }
}


