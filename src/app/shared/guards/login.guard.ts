import {inject} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";

export const loginGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router)
  const authService = inject(AuthService)

  console.log(route.queryParams['isLoggedIn'])

  return (authService.isLoggedIn || route.queryParams['isLoggedIn'] === true) ? true : router.navigate([''])
}
