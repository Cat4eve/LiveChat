import { AuthService } from './../Auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, NgForm, AbstractControl, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
}) 
export class LoginComponent implements OnInit {

  isEmailTrue: boolean;
  isPasswordTrue: any; 
  isCorrect: any;

  regWord = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  _login = new FormGroup({
    _email: new FormControl('', [Validators.required, this.emailValidator(this.regWord)]),
    _password: new FormControl('', [Validators.required, this.passwordValidator(/\d/)]),
  }) 

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

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

  loginSubmit(): void {
    if(this.isEmailTrue && this.isPasswordTrue){
      this.authService.getUsersFromEmail(this._login.get('_email').value).subscribe((value) => console.log(value));
    }else{
    //@ts-ignore 
      swal({ 
        title: "You cant Login",
        text: "Enter correct email and password for Login!",
        icon: "warning",
        dangerMode: true,
      })
  }
  }
}
