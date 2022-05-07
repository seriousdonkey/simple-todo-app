import {Action} from "@ngrx/store";
import {UserModel} from "../models/user.model";

export const SET_USER = '[Auth] Set User'

export class SetUser implements Action {
  readonly type = SET_USER

  constructor(public payload: UserModel | null) {}
}

export type AuthActions = SetUser
