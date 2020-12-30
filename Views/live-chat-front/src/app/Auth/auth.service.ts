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

  logOut() {
    localStorage.removeItem('online');
    this._router.navigate(['/login']);
  }

  logIn() {
    localStorage.setItem('online', '1');
    this._router.navigate(['/cabinet']);
  }

}
