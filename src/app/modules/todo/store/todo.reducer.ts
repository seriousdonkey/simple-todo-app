import {Todo} from "../models/todo.model";
import {Action} from "@ngrx/store";
import {SET_TODOS, TodoActions} from "./todo.actions";

export interface State {
  todos: Todo[]
}

const initialState: State = {
  todos: []
}

export function todoReducer(state = initialState, action: Action) {
  const todoActions = action as TodoActions
  switch (todoActions.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: todoActions.payload
      }
    default:
      return state
  }
}

export const getAllTodos = (state: State) => state.todos
export const getActiveTodos = (state: State) => state.todos.filter(todo => !todo.done)
export const getCompletedTodos = (state: State) => state.todos.filter(todo => todo.done)
