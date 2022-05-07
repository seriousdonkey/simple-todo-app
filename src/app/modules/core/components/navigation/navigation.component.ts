import { Component, OnInit } from '@angular/core';

import {Observable} from "rxjs";
import {AuthenticationService} from "../../auth/authentication.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isAuth$: Observable<boolean> = new Observable<boolean>()

  constructor(private authenticationService: AuthenticationService) {
    this.isAuth$ = authenticationService.isAuth$
  }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout()
  }
}
