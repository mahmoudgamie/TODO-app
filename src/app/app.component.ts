import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean;
  title = 'TODO-app';

  constructor(private auth: AuthService) {

  }

  ngOnInit(): void {
    this.auth.getAuthentication.subscribe(auth => this.isAuthenticated = auth);
  }

  logout(): void {
    this.auth.logout();
  }

}
