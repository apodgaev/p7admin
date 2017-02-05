import { Injectable }     from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}   from '@angular/router';
import { AuthService } from '../login/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AuthGuard#canActivate called');
    return true;
  }
}
