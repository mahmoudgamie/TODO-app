import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }
  canActivate(): boolean {
    const status = localStorage.getItem('status');
    if (status === 'isAuthenticated') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }


}
