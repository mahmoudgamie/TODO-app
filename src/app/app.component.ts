import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { UsersService } from 'src/services/users.service';
/**
 * carries the header, footer and router-outlet
 *
 * @export
 * @class AppComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /**
   * carries authentication status for logout btn
   *
   * @type {boolean}
   * @memberof AppComponent
   */
  isAuthenticated: boolean;
  /**
   * receives a current username for the welcome message
   *
   * @type {string}
   * @memberof AppComponent
   */
  username: string;
  /**
   *Creates an instance of AppComponent.
   * @param {AuthService} auth uses the getAuthentication observable to listen to authentication change
   * @param {UsersService} usersServices uses the getUsername observable to listen to username change
   * @memberof AppComponent
   */
  constructor(private auth: AuthService, private usersServices: UsersService) {

  }

  ngOnInit(): void {
    // listens to authentication change
    this.auth.getAuthentication.subscribe(auth => this.isAuthenticated = auth);
    // listens to username change 
    this.usersServices.getUsername.subscribe(username => this.username = username)
  }
/**
 * logs out user
 *
 * @memberof AppComponent
 */
logOut(): void {
    this.auth.logout();
  }

}
