import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.user) {
      this.router.navigate(['centers']);
      return false;
    }
    return true;
  }
}
