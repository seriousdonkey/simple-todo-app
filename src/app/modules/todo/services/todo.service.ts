import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TodoDataService } from './todo-data.service';
import { Todo } from '../models/todo.model';

import * as fromRoot from '../../../app.reducer';
import * as TodoActions from '../store/todo.actions';

@Injectable()
export class TodoService {
  allTodos$: Observable<Todo[]> = new Observable<Todo[]>();
  activeTodos$: Observable<Todo[]> = new Observable<Todo[]>();
  completedTodos$: Observable<Todo[]> = new Observable<Todo[]>();

  constructor(
    private todoFirestore: TodoDataService,
    private authenticationService: AuthenticationService,
    private store: Store<fromRoot.State>
  ) {
    this.authenticationService.user$.subscribe((user) => {
      if (user) {
        todoFirestore
          .collection$((ref) =>
            ref.where('userId', '==', user.userId).orderBy('done')
          )
          .subscribe((todos) => {
            this.store.dispatch(new TodoActions.SetTodos(todos));
          });
      }
    });

    this.allTodos$ = store.select(fromRoot.getAllTodos);
    this.activeTodos$ = store.select(fromRoot.getActiveTodos);
    this.completedTodos$ = store.select(fromRoot.getCompletedTodos);
  }

  async addTodo(todoInput: string) {
    const user = await firstValueFrom(this.authenticationService.user$);
    if (user) {
      const newTodo: Todo = {
        todo: todoInput,
        done: false,
        userId: user.userId,
        createdAt: new Date(),
      };
      await this.todoFirestore.create(newTodo);
    }
  }

  async updateTodo(todo: Todo) {
    if (todo.id) {
      await this.todoFirestore.update(todo.id, todo);
    }
  }

  async deleteTodo(todoId: string) {
    await this.todoFirestore.delete(todoId);
  }
}
