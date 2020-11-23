import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  _login = new FormGroup({
    _emailOrUsername: new FormControl(''),
    _password: new FormControl(''),
  })

  constructor() { }

  ngOnInit(): void {
  }

  loginSubmit(): void {
    console.log(this._login);

  }

}
