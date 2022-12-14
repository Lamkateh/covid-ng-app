import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.authService.getStoredUserInformation();

    if (!user) {
      this.router.navigate(['login']);
      return false;
    } else if (!route.data['roles'].includes(user.roles.toString())) {
      this.router.navigate(['centers']);
      return false;
    }

    return true;
  }
}
