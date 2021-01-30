import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  trackUser: any;
  constructor(private dataRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.trackUser = this.dataRoute.snapshot.params
    if (!this.trackUser) throw new Error('User not found');
  }

}
