
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserActions } from "../services/user-actions";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginGuardian implements CanActivate {
  constructor(private userActions: UserActions, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.userActions.isLogin()) {
      return true;
    }
    else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
