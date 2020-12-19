import { AuthService } from './../Auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, NgForm, AbstractControl, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegComponent{
  isEmailTrue: boolean;
  isPasswordTrue: any; 
  isCorrect: any;
  
  regWord = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  _registration = new FormGroup({
    _username: new FormControl('', [Validators.required]),
    _email: new FormControl('', [Validators.required, this.emailValidator(this.regWord)]),
    _password: new FormControl('', [Validators.required, this.passwordValidator(/\d/)]),
    _password2: new FormControl('', [Validators.required, this.passwordValidator(/\d/)]),
  })

  constructor(private authService: AuthService) { }

  emailValidator(regex: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = regex.test(control.value);
      this.isEmailTrue = forbidden;
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

  passwordValidator(regex: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      this.isPasswordTrue = regex.test(control.value);
      return this.isPasswordTrue;
    };
  }

  regSubmit():void {
    this.isCorrect = this.isPasswordTrue && this.isEmailTrue;
    if(this.isCorrect) {
      if (!this.authService.getUsersFromEmail(this._login.get('_email').value)) {
        
      }
    }
  }
}