import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";

import * as fromAuth from './modules/core/auth/auth.reducer'
import * as fromUi from './modules/core/ui/ui.reducer';
import * as fromTodo from './modules/todo/store/todo.reducer'

export interface State {
  auth: fromAuth.State,
  ui: fromUi.State,
  todo: fromTodo.State,
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  ui: fromUi.uiReducer,
  todo: fromTodo.todoReducer
}

export const getAuthState = createFeatureSelector<fromAuth.State>('auth')
export const getIsAuth = createSelector(getAuthState, fromAuth.isAuth)
export const getUser = createSelector(getAuthState, fromAuth.getUser)

export const getUiState = createFeatureSelector<fromUi.State>('ui')
export const getUiIsLoading = createSelector(getUiState, fromUi.getIsLoading)

export const getTodoState = createFeatureSelector<fromTodo.State>('todo')
export const getAllTodos = createSelector(getTodoState, fromTodo.getAllTodos)
export const getActiveTodos = createSelector(getTodoState, fromTodo.getActiveTodos)
export const getCompletedTodos = createSelector(getTodoState, fromTodo.getCompletedTodos)
