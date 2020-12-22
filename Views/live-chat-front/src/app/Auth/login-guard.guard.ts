import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(): boolean {
    if (this._authService.isLogged()) return true;
    this._router.navigate(['./login'])
    return false;
  }

}
