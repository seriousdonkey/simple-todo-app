import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../../models/todo.model";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input()
  todo: Todo | undefined

  @Output()
  onCheckTodo = new EventEmitter<Todo>()
  @Output()
  onDeleteTodo = new EventEmitter<string>()

  checked = true

  constructor() { }

  ngOnInit(): void {}

  onCheck() {
    if (this.todo) {
      this.onCheckTodo.emit(this.todo)
    }
  }

  onDelete() {
    if (this.todo) {
      this.onDeleteTodo.emit(this.todo.id)
    }
  }

}
