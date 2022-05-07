import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input()
  todos$!: Observable<Todo[]>;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  async onChecked(todo: Todo) {
    const updatedTodo = { ...todo, done: !todo.done };
    await this.todoService.updateTodo(updatedTodo);
  }

  async onDelete(todoId: string | undefined) {
    if (todoId) {
      await this.todoService.deleteTodo(todoId);
    }
  }
}
