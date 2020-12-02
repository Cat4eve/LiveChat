import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, NgForm, AbstractControl, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  regWord = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  _login = new FormGroup({
    _email: new FormControl('', [Validators.required, this.emailValidator(this.regWord)]),
    _password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  constructor() { }

  ngOnInit(): void {
  }

  emailValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = nameRe.test(control.value);
      console.log(forbidden);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

  loginSubmit(): void {
    console.log('adwad');
    console.log(this._login);
  }

}
