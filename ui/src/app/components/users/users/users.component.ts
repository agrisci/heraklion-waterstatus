import { Component, OnInit } from '@angular/core';

import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userToEdit: User;
  users: User[];
  constructor(private UserService: UserService) {}

  ngOnInit(): void {
    this.UserService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
  updateUserList(users: User[]) {
    this.users = users;
  }
  toEditUser(user: User) {
    this.userToEdit = user;
  }
}
