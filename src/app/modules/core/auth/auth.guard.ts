import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authenticationService.isAuth$
  }

  canLoad(route: Route) {
    return this.authenticationService.isAuth$
  }

}
