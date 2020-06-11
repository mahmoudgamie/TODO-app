import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { TodoService } from 'src/services/todo.service';
/**
 * provides login logic for users
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
   * carries the form values
   *
   * @type {FormGroup}
   * @memberof LoginComponent
   */
  loginForm: FormGroup;

  /**
   * provides easy access for login form
   *
   * @readonly
   * @memberof LoginComponent
   */
  get f() {
    return this.loginForm.controls;
  }
  /**
   *Creates an instance of LoginComponent.
   * @param {FormBuilder} fb creates form builder instance
   * @param {AuthService} auth instance of authentication
   * @param {Router} router instance of router
   * @memberof LoginComponent
   */
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }
  /**
   *builds the login form with controls and validators
   *
   * @memberof LoginComponent
   */
  buildForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  /**
   * login users if memebers
   *
   * @param {FormGroup} form
   * @memberof LoginComponent
   */
  loginUser(form: FormGroup): void {
    const username = form.get('username').value;
    const password = form.get('password').value;
    if (this.auth.login(username, password)) {
      this.router.navigate(['/home']);
    }
  }

}
