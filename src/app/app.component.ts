import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  status: string;
  title = 'TODO-app';

  constructor(private auth: AuthService, private data: DataService) {

  }

  ngOnInit(): void {
    this.data.sharedMessage.subscribe(message => this.status = message)
  }

  logout(): void {
    this.auth.logout();
    this.data.nextMessage('')
  }

}
