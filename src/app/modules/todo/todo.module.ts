import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import {TodoDataService} from "./services/todo-data.service";
import {TodoService} from "./services/todo.service";
import {PrimeModule} from "../core/prime.module";


@NgModule({
  declarations: [
    TodoComponent,
    TodoCreateComponent,
    TodoListComponent,
    TodoItemComponent
  ],
    imports: [
        CommonModule,
        TodoRoutingModule,
        ReactiveFormsModule,
        PrimeModule,
      FormsModule
    ],
  providers: [
    TodoDataService,
    TodoService
  ]
})
export class TodoModule { }
