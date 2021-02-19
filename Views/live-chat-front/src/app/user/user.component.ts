import { UserService } from './../user.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit, OnChanges {
  @Input() selectedUserId: string
  selectedUser: any = 'No one'

  constructor(private _authService: AuthService, private _userService: UserService, private _historyService: HistoryService) {
  }

  ngOnInit() {}

  ngOnChanges(): void {
    if (this.selectedUserId) {
      this._userService.getUserFromId(this.selectedUserId).subscribe(user => {
        this.selectedUser = user;
      });
    }
  }
}
