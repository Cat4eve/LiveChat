import { UserService } from './../user.service';
import { AuthService } from './../Auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { io } from 'socket.io-client'
import { PORT } from './../../../config.json';


@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CabinetComponent implements OnInit {

  socket: any;
  constructor(private _authService: AuthService, private _userService: UserService) { }

  ngOnInit(): void {
    this.setupSocket();
    this.socket.on('greet-event', (msg: string)=>{
      console.log(msg);
    })
  }

  leaveAcc(): void {
    this._authService.logOut();
  }

  goToUser(user: any): void {
    this._userService.getUserFromId(user._id).subscribe(data => this._userService.goToUser(data));
  }

  setupSocket(): void {
    this.socket = io('http://localhost:' + PORT, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });
  }

}
