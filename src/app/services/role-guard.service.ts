import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.user) {
      this.router.navigate(['login']);
      return false;
    } else if (!route.data['roles'].includes(this.authService.user.roles.toString())) {
      this.router.navigate(['centers']);
      return false;
    }
    return true;
  }
}
