import {FirestoreService} from "../../core/services/firestore.service";
import {Todo} from "../models/todo.model";
import {Injectable} from "@angular/core";

@Injectable()
export class TodoDataService extends FirestoreService<Todo> {
  path = 'todo'
}
