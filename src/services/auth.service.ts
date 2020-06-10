import { Injectable } from '@angular/core';
import { User } from 'src/data-models/User';
import users from '../data/users.json'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = users;
  authentication = new BehaviorSubject(false);
  getAuthentication = this.authentication.asObservable();

  constructor(private router: Router) {
    if (localStorage.getItem('status') === 'isAuthenticated') {
      this.updateAuthentication(true);
    }

  }

  login(username: string, password: string): boolean {
    const user = users.find(u => u.username === username.trim().toLowerCase() && u.password === password)
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('status', 'isAuthenticated');
      this.updateAuthentication(true);
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.clear();
    this.updateAuthentication(false);
    this.router.navigate(['login']);
  }

  updateAuthentication(authentication: boolean): void {
    this.authentication.next(authentication);
  }
}
