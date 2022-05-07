import {Action} from "@ngrx/store";
import {Todo} from "../models/todo.model";

export const SET_TODOS = '[Todo] Set'

export class SetTodos implements Action {
  readonly type = SET_TODOS

  constructor(public payload: Todo[]) {}
}

export type TodoActions = SetTodos
