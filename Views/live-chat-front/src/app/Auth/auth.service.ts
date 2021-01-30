import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router) { }

  isLogged() {
    return !!localStorage.getItem('online');
  }

  logIn(user) {
    localStorage.setItem('user', user);
    this._router.navigate(['/cabinet']);
  }

  logOut() {
    localStorage.removeItem('user');
    this._router.navigate(['/login']);
  }

}
