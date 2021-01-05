import { UserService } from './../user.service';
import { AuthService } from './../Auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, ValidatorFn, Validators } from '@angular/forms';

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
    _password: new FormControl(''),
    _password2: new FormControl('', [Validators.required, this.passwordValidator(/\d/)]),
  })

  constructor(private authService: AuthService, private userService: UserService) { }

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
      this.isPasswordTrue = regex.test(control.value) && (control.value == this._registration.get('_password').value);
      return this.isPasswordTrue;
    };
  }

  regValidation():boolean {
    this.isCorrect = this.isPasswordTrue && this.isEmailTrue;
    if (!this.isCorrect) return false;
    this.userService.getUserFromEmail(this._registration.get('_email').value).subscribe(value => {
      if (value != false) {
        console.log(value);
        this.isEmailTrue = false;
      }
    });
    if (!this.isEmailTrue) return false;
    return true;
  }

  regSubmit():boolean {
    if (!this.regValidation()) {
      //@ts-ignore
      swal({
        title: "You cant Login",
        text: "Enter correct email and password for Login!",
        icon: "warning",
        dangerMode: true,
      });
      return false;
    }

     this.userService.postFullInfo({
       username: this._registration.get('_username').value,
       email: this._registration.get('_email').value,
       password: this._registration.get('_password').value
      }).subscribe(result=> {
        if (!result.error) {
          this.authService.logIn();
          //@ts-ignore
          swal({
            title: "Successful registration",
            text: "Now you are the part of this site!",
            icon: "success",
          });
        }
        else {
          if (result.error == 'Dublication error') {
          //@ts-ignore
          swal({
            title: "You cant Registrate",
            text: "Email you write already exists, please write another one!",
            icon: "warning",
            dangerMode: true,
          });
        }}
      });

     return true;
  }
}
