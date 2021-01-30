import { AuthService } from './../Auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  entered: boolean
  login: boolean
  reg: boolean
  place: string

  constructor(private _router: Router, private _authService: AuthService) {
    this.entered = this._authService.isLogged();
    this.place = this._authService.getPlace();
    this.login = !this.entered && this.place !== 'login';
    this.reg = !this.entered && this.place !== 'registration';
  }

  ngOnInit(): void {
  }

  toReg(): void {
    this._router.navigate(['/registration'])
  }

  toLogin(): void {
    this._router.navigate(['/login']);
  }

  logout(): void {
    this._authService.logOut();
  }

}
