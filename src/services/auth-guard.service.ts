import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
/**
 * a route guard to prevent navigation for unlogged useres
 *
 * @export
 * @class AuthGuardService
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
/**
 *Creates an instance of AuthGuardService.
 * @param {Router} router to route to login if not loggedin
 * @memberof AuthGuardService
 */
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
