import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, Actions, ofActionErrored } from '@ngxs/store';
import { Login } from '../shared/state/auth.actions';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private actions: Actions,
  ) { }

  ngOnInit(): void {
    this.initForms();

    // Login error
    this.actions.pipe(ofActionErrored(Login)).subscribe(error => {
      this.loginForm.setErrors({ wrongUsernamePassword: true });
    });
  }

  initForms() {
    this.loginForm = this.formBuilder.group({
      email: ['admin@example.com', [Validators.required, Validators.email]],
      password: ['pass', Validators.required],
    });
  }

  submit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;

      this.store.dispatch(new Login({ username, password }));
    }
  }
}
