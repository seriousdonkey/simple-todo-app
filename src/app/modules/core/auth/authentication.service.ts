import {Injectable} from '@angular/core';
import {LoginError, LoginErrorType} from "./login-error";
import {Store} from "@ngrx/store";

import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {UserModel} from "../models/user.model";
import {AngularFireAuth} from "@angular/fire/compat/auth";

import * as fromRoot from '../../../app.reducer'
import * as Auth from './auth.actions'
import {SignupError, SignupErrorType} from "./signup-error";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuth$: Observable<boolean> = new Observable<boolean>()
  user$: Observable<UserModel | null> = new Observable<UserModel>()

  constructor(private firebaseAuth: AngularFireAuth,
              private store: Store<fromRoot.State>,
              private router: Router) {
    this.isAuth$ = store.select(fromRoot.getIsAuth)
    this.user$ = store.select(fromRoot.getUser)
  }

  initAuthListener() {
    this.firebaseAuth.authState.subscribe((firebaseUser) => {
      if (firebaseUser) {
        console.log('User is authenticated')
        const user: UserModel = {
          email: firebaseUser.email,
          userId: firebaseUser.uid,
          displayName: firebaseUser.displayName
        }
        this.store.dispatch(new Auth.SetUser(user))
        this.router.navigate(['todo'])
      } else {
        console.log('User is NOT authenticated')
        this.store.dispatch(new Auth.SetUser(null))
        this.router.navigate(['login'])
      }
    })
  }

  async register(data: { email: string, password: string, username: string }): Promise<void> {
    try {
      const createResult = await this.firebaseAuth
        .createUserWithEmailAndPassword(data.email, data.password)
      if (createResult.user) {
        await createResult.user.updateProfile({
          displayName: data.username
        })
      }
    } catch (err: any) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          throw new SignupError(err.message, SignupErrorType.EMAIL_ALREADY_IN_USE)
        case 'auth/invalid-email':
          throw new SignupError(err.message, SignupErrorType.INVALID_EMAIL)
        case 'auth/operation-not-allowed':
          throw new SignupError(err.message, SignupErrorType.OPERATION_NOT_ALLOWED)
        case 'auth/weak-password':
          throw new SignupError(err.message, SignupErrorType.WEAK_PASSWORD)
      }
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    } catch (err: any) {
      switch (err.code) {
        case 'auth/invalid-email':
          throw new LoginError(err.message, LoginErrorType.INVALID_EMAIL)
        case 'auth/user-disabled':
          throw new LoginError(err.message, LoginErrorType.USER_DISABLED)
        case 'auth/user-not-found':
          throw new LoginError(err.message, LoginErrorType.USER_NOT_FOUND)
        case 'auth/wrong-password':
          throw new LoginError(err.message, LoginErrorType.WRONG_PASSWORD)
      }
    }
  }

  async logout(): Promise<void> {
    await this.firebaseAuth.signOut()
  }

}
