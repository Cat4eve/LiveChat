import { AuthService } from './../Auth/auth.service';
import { HistoryService } from './../history.service';
import { UserService } from './../user.service';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UserTableDataSource, UserTableItem } from './user-table-datasource';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<UserTableItem>;
  @Output() selectUser = new EventEmitter();

  dataSource: UserTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['online', 'user']
  height: string
  users: any
  history: any
  ownUser: any

  constructor(private userService: UserService, private authService: AuthService, private historyService: HistoryService) {}
  async ngOnInit() {
    this.height = '915px';
    this.getAndPastUsers();
  }

  async getAndPastUsers(): Promise<void> {
    let value = await this.userService.getAllUsers().toPromise();
    if (value == false) throw new Error('No user in DB.');
    value = this.sortUsers(value);
    let arr = [], counter = parseInt(this.height) - 56.45 - 56;
    for (let i = 0; i < value.length; i++){
      if (counter > 48.27 && this.ownUser._id != value[i]._id) {
        arr.push({online: value[i].online == 1 ? 'online' : 'offline', user: value[i].username, id: value[i]._id});
        counter -= 48.27;
      }
    }
    this.dataSource = new UserTableDataSource(arr);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngAfterViewInit() {
  }

  sortUsers(users: any): any {

    this.ownUser = this.authService.getUser();
    this.historyService.getAllChats(this.ownUser).subscribe(chats => {
      this.history = chats;
      for (let chat = 0; chat < chats.length; chat++) {
        console.log(chats[chat]['users']);
        if (chats[chat]['users'].includes(this.ownUser['_id'])) {
          // for (let user = 0; user < users; user++) {
          //   if (chats[chat]['users'].includes(user['_id'])) {
          //     let index = users.indexOf(users[user]);
          //     let usr = users.splice(index, 1);
          //     users[chat].splice(chat, 0, usr);
          //   }
          // }
        }
      }
    });
    return users;

  }

  goToUser(id: string): void {
    // this.userService.getUserFromId(id).subscribe(user => {
    //   this.userService.setSelectedUser(user);
    //   this.historyService.createChannel([this.ownUser._id, user._id]);
    // })
    this.selectUser.emit(id);
  }
}
