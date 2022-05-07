import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../auth/authentication.service';
import { SignupError, SignupErrorType } from '../../auth/signup-error';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  errorMessage?: string;

  signUpForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    passwordVerify: new FormControl('', [Validators.required]),
  });

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  signUp() {
    const username = this.signUpForm.value.username;
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    const passwordVerify = this.signUpForm.value.passwordVerify;

    if (password === passwordVerify) {
      this.authenticationService
        .register({
          username,
          email,
          password,
        })
        .catch((err) => {
          if (err instanceof SignupError) {
            switch (err.type) {
              case SignupErrorType.EMAIL_ALREADY_IN_USE:
                this.errorMessage = 'Email is already in use.';
                break;
              case SignupErrorType.INVALID_EMAIL:
                this.errorMessage = 'Email is invalid.';
                break;
              default:
                this.errorMessage = 'An error occured. Please try again later.';
                break;
            }
          }
        });
    } else {
      // TODO: show error message
    }
  }
}
