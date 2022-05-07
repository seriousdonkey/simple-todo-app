import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Todo} from "./models/todo.model";
import {TodoService} from "./services/todo.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  allTodos$: Observable<Todo[]> = new Observable<Todo[]>()
  activeTodos$: Observable<Todo[]> = new Observable<Todo[]>()
  completedTodos$: Observable<Todo[]> = new Observable<Todo[]>()

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.allTodos$ = this.todoService.allTodos$
    this.activeTodos$ = this.todoService.activeTodos$
    this.completedTodos$ = this.todoService.completedTodos$
  }

}
