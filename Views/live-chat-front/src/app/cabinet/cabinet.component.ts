import { HistoryService } from './../history.service';
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
  height: string
  socket: any
  selectedUserId: string
  constructor(private _authService: AuthService, private _userService: UserService, private _histroyService: HistoryService) {
    this._authService.setPlace('cabinet');
    this._authService.getUser();
    this.height = '915px';
   }

  ngOnInit(): void {
    this.setupSocket();
    this._histroyService.socket = this.socket;
  }

  leaveAcc(): void {
    this._authService.logOut();
  }

  selectUser(id: string): any {
    this.selectedUserId = id;
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
