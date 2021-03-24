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
  msgHistory: any
  sendMsg = new FormGroup({
    msgControll: new FormControl('')
  })

  constructor(private _authService: AuthService, private _userService: UserService, private _historyService: HistoryService) {
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    if (this.selectedUserId) {
      this.selectedUserId = JSON.parse(this.selectedUserId);
      this._userService.getUserFromId(this.selectedUserId.userId).subscribe(user => {
        this.selectedUser = user;
        // this._historyService.socket.emit('join', this.selectedUserId.channelId);
        this._historyService.socket.on('getMsg'+this.selectedUserId.channelId, (msg)=>{
          this.msgHistory.push(msg);
        });
      });
      this._historyService.getChatByAllUsers([this._authService.getUser()._id, this.selectedUserId.userId]).subscribe(channel => {
        this.msgHistory = channel.history;
        console.log(channel.history);
      });

    }
  }

  sendMessage() {
    let msg = this.sendMsg.get('msgControll').value;
    this.sendMsg.get('msgControll').setValue('')
    if (!this.selectedUserId || msg == '' || msg.trim() == '') return false;
    this._historyService.addMsg({channelId: this.selectedUserId.channelId, author: this._authService.getUser()._id, message: msg}).subscribe(val => {
      let sendData = val.history[val.history.length - 1];
      this._historyService.socket.emit('msg', JSON.stringify({data: sendData, channelId: this.selectedUserId.channelId}));
    })
  }
}
