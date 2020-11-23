import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validator, AbstractControl } from '@angular/forms';

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

  emailValidator(control: AbstractControl) {
    if (control.value === '') return null
    if (!control.value.includes('@')) return null
    
  }

  loginSubmit(): void {
    console.log(this._login);

  }

}
