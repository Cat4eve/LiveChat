import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { coerceStringArray } from '@angular/cdk/coercion';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router) { }

  isLogged() {
    return !!localStorage.getItem('user');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logIn(user) {
    localStorage.setItem('user', JSON.stringify(user));
    this._router.navigate(['/cabinet']);
  }

  logOut() {
    localStorage.removeItem('user');
    this._router.navigate(['/login']);
  }

  setPlace(location: string) {
    localStorage.setItem('page', location);
  }

  getPlace() {
    return localStorage.getItem('page');
  }

}
