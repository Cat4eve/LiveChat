import { UserService } from './../user.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
  dataSource: UserTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['online', 'user'];

  constructor(private userService: UserService) {}
  async ngOnInit() {
    this.getAndPastUsers();
  }

  async getAndPastUsers(): Promise<void> {
    let value = await this.userService.getAllUsers().toPromise()
    if (value == false) throw new Error('No user in DB.');
    let arr = []
    for (let i = 0; i < value.length; i++){
      arr.push({online: value[i].online, user: value[i].username, id: value[i]._id});
    }
    this.dataSource = new UserTableDataSource(arr);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngAfterViewInit() {
  }

  goToUser(id: string): void {
    this.userService.getUserFromId(id).subscribe(user => {
      this.userService.goToUser(user);
    })
  }
}
