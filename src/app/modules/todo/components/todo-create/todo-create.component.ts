import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent implements OnInit {

  todoCreateForm = new FormGroup({
    todoInput: new FormControl('', [Validators.required])
  })

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {}

  async onCreateTodo() {
    const todoInput = this.todoCreateForm.value.todoInput
    await this.todoService.addTodo(todoInput)
    this.todoCreateForm.reset()
  }

}
