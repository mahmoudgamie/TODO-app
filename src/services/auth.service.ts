import { Injectable } from '@angular/core';
import { User } from 'src/data-models/User';
import users from '../data/users.json'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = users;

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    const user = users.find(u => u.username === username.trim().toLowerCase() && u.password === password)
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
