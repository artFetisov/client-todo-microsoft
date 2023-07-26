import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const logoutGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.isLoggedIn ? false : true
}
