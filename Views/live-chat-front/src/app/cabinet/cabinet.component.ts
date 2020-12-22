import { AuthService } from './../Auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  leaveAcc(): void {
    localStorage.removeItem('email');
    this._authService.logOut();
  }

}
