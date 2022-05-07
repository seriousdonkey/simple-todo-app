import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";

import * as fromRoot from '../../../../app.reducer'
import {Observable} from "rxjs";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  isLoading$: Observable<boolean>

  constructor(private store: Store<fromRoot.State>) {
    this.isLoading$ = store.select(fromRoot.getUiIsLoading)
  }

  ngOnInit(): void {}

}
