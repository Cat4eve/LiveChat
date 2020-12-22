import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _router: Router) { }

  isLogged() {
    return !!localStorage.getItem('email');
  }

  logOut() {
    localStorage.removeItem('email');
    this._router.navigate(['/login']);
  }

  logIn(email) {
    localStorage.setItem('email', email);
  }

}
