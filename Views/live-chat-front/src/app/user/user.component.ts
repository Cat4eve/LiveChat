import { UserService } from './../user.service';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  @Input() selectedUser: string

  // selectedUser: any;
  constructor(private _authService: AuthService, private _userService: UserService, private _historyService: HistoryService) {
    // this.selectedUser = this._userService.getSelectedUser()
    console.log(this.selectedUser);

    // if (!this.selectedUser) throw new Error('User not found');
    // this._authService.setPlace('chat');
    // this._historyService.createChannel([this._authService.getUser()._id, this.trackUser._id]);
  }

  ngOnInit(): void {
  }
}
