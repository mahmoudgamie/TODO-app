import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private fb: FormBuilder, private data: DataService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginUser(form: FormGroup): void {
    const username = form.get('username').value;
    const password = form.get('password').value;
    if (this.auth.login(username, password)) {
      localStorage.setItem('status', 'isAuthenticated');
      this.data.nextMessage('isAuthenticated');
      this.router.navigate(['/home']);
    }
  }

}
