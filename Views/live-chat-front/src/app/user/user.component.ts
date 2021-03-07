import { UserService } from './../user.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { HistoryService } from '../history.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit, OnChanges {
  @Input() selectedUserId: any
  selectedUser: any = 'No one'
  sendMsg = new FormGroup({
    msgControll: new FormControl('')
  })

  constructor(private _authService: AuthService, private _userService: UserService, private _historyService: HistoryService) {
  }

  ngOnInit() {}

  ngOnChanges(): void {
    if (this.selectedUserId) {
      this.selectedUserId = JSON.parse(this.selectedUserId);
      this._userService.getUserFromId(this.selectedUserId.userId).subscribe(user => {
        this.selectedUser = user;
      });
    }
  }

  sendMessage() {
    let msg = this.sendMsg.get('msgControll').value;
    console.log(this.selectedUserId)
    this.sendMsg.get('msgControll').setValue('')
    if (!this.selectedUserId || msg == '' || msg.trim() == '') return false;
    this._historyService.addMsg({channelId: this.selectedUserId.channelId, author: this._authService.getUser(), message: msg}).subscribe(val => {console.log(val)})
  }
}
