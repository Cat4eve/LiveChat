import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { AuthService } from './../Auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  isEmailExists: boolean;

  regWord = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  _login = new FormGroup({
    _email: new FormControl(''),
    _password: new FormControl(''),
  })

  constructor(private _userService: UserService , private _authService: AuthService, private _router: Router) {
    this._authService.setPlace('login');
  }

  ngOnInit(): void {
  }

  loginSubmit(): void {
    this._userService.compareEmailAndPassword(
      this._login.get('_email').value,
      this._login.get('_password').value).subscribe(value => {
      console.log(value);
      if (value == false) this.isEmailExists = false;
      else this.isEmailExists = true;

      if (this.isEmailExists) {
        this._authService.logIn(value);
        this._router.navigate(['/cabinet']);
        return
      }
      //@ts-ignore
      swal({
        title: "You cant Login",
        text: "Enter correct email and password for Login!",
        icon: "warning",
        dangerMode: true,
      });
    })
  }
}
