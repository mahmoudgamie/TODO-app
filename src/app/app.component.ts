import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean;
  title = 'TODO-app';
  username: string;
  constructor(private auth: AuthService, private usersServices: UsersService) {

  }

  ngOnInit(): void {
    this.auth.getAuthentication.subscribe(auth => this.isAuthenticated = auth);
    this.usersServices.getUsername.subscribe(username => this.username = username)
  }

  logOut(): void {
    this.auth.logout();
  }

}
