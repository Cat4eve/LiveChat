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
  chat: boolean
  place: string

  constructor(private _router: Router, private _authService: AuthService) {
    this.entered = this._authService.isLogged();
    this.place = this._authService.getPlace();
    this.login = !this.entered && this.place !== 'login';
    this.reg = !this.entered && this.place !== 'registration';
    this.chat = this.entered && this.place == 'chat';
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

  backToCabinet(): void {
    this._router.navigate(['/cabinet'])
  }

}
