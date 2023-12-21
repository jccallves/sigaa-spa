import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { AuthenticationService } from "../auth/authentication.service";
import { Observable } from "rxjs";
import { RotasApp } from "src/app/shared/enum/rotas-app";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

constructor(
        private router: Router,
        private authService: AuthenticationService
    ) { }


    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url: string = state.url;
      return this.checkUserLogin(next, url);
    }
    canActivateChild(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.canActivate(next, state);
    }
    canDeactivate(
      component: unknown,
      currentRoute: ActivatedRouteSnapshot,
      currentState: RouterStateSnapshot,
      nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
    }
    canLoad(
      route: Route,
      segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return true;
    }

    checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
      if (this.authService.isAuthenticated()) {
        if (route.data['roles'] && !this.authService.hasPermissao(route.data['roles'])) {
          console.log('sem permissão')
          this.router.navigate([RotasApp.APP_RAIZ]);
          return false;
        }
        return true;
      }
      this.router.navigate([RotasApp.HOME]);
      return false;
    }
}
