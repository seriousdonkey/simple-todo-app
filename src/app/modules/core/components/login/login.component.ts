import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../app.reducer';
import { AuthenticationService } from '../../auth/authentication.service';
import { LoginError, LoginErrorType } from '../../auth/login-error';
import * as UiActions from '../../ui/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMessage?: string;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {}

  login() {
    this.store.dispatch(new UiActions.StartLoading());
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authenticationService
      .login(email, password)
      .then(() => {
        this.store.dispatch(new UiActions.StopLoading());
      })
      .catch((err) => {
        if (err instanceof LoginError) {
          if (
            err.type == LoginErrorType.INVALID_EMAIL ||
            err.type == LoginErrorType.WRONG_PASSWORD ||
            err.type == LoginErrorType.USER_NOT_FOUND
          ) {
            this.errorMessage = 'Email or password are wrong.';
          } else {
            this.errorMessage = 'Login failed.';
          }
        }
        this.store.dispatch(new UiActions.StopLoading());
      });
    this.loginForm.controls['password'].reset();
  }
}
