import {UserModel} from "../models/user.model";
import {Action} from "@ngrx/store";
import {AuthActions, SET_USER} from "./auth.actions";

export interface State {
  user: UserModel | null
}

const initialState: State = {
  user: null
}

export function authReducer(state = initialState, action: Action) {
  const actions = action as AuthActions
  switch (actions.type) {
    case SET_USER:
      return {
        ...state,
        user: actions.payload
      }
    default:
      return state
  }
}

export const isAuth = (state: State) => state.user !== null
export const getUser = (state: State) => state.user
