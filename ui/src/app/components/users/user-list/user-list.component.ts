import { User } from './../../../models/User';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input() users: User[];
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe((response: any) => {
      if (response.success) {
        this.users.splice(this.users.indexOf(user), 1);
      }
    });
  }
  editUser(user: User) {
    this.userService.userToEdit().next(user);
  }
}
