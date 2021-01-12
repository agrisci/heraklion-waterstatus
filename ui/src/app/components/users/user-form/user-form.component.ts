import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() users: User[];
  @Output() updatedUserList = new EventEmitter<User[]>();

  user: User;
  isNew: Boolean = false;
  isValid: Boolean = false;

  constructor(private userService: UserService) {
    this.user = {
      username: '',
      email: '',
      gotify_server_ip: '',
      gotify_token: '',
      discord_webhook: '',
      notifications_status: false,
      notifications_preffered_mode: '',
    };
  }

  ngOnInit(): void {
    this.userService.userToEdit().subscribe((user) => {
      this.user = user;
      this.isNew = true;
    });
  }

  onSubmit(form) {
    if (this.isNew === false) {
      this.userService.addUser(this.user).subscribe((response: any) => {
        if (!response.ok) {
          this.users.push(response);
          this.isValid = !this.isValid;
          setTimeout(() => {
            this.isValid = !this.isValid;
          }, 2000);
          this.updatedUserList.emit(this.users);
          this.resetForm(form);
        } else {
          console.log('Something went wrong with the api communication...');
        }
      });
    } else {
      this.userService.updateUser(this.user).subscribe((response: any) => {
        if (!response.ok) {
          this.users.splice(
            this.users.findIndex((user) => {
              return (user.id = this.user.id);
            }),
            1,
            response
          );
          this.isValid = !this.isValid;
          setTimeout(() => {
            this.isValid = !this.isValid;
          }, 2000);
          this.updatedUserList.emit(this.users);
          this.resetForm(form);
        } else {
          console.log('Something went wrong with the api communication...');
        }
      });
    }
  }

  resetForm(form) {
    this.user = {
      username: '',
      email: '',
      gotify_server_ip: '',
      gotify_token: '',
      discord_webhook: '',
      notifications_status: false,
      notifications_preffered_mode: '',
    };
    this.isNew = false;
    form.reset();
  }
}
