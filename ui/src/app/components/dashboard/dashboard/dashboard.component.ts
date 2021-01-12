import { UserService } from '../../../services/user.service';
import { SubscriptionService } from '../../../services/subscription.service';
import { AreaService } from '../../../services/area.service';
import { Component, OnInit } from '@angular/core';

import { Subscription } from '../../../models/Subscription';
import { User } from '../../../models/User';
import { Area } from '../../../models/Area';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  areas: Area[];
  users: User[];
  subscriptions: Subscription[];
  primaryUserSubscriptions: Subscription[];

  constructor(
    private areaService: AreaService,
    private userService: UserService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.areaService.getAreas().subscribe((areas) => {
      this.areas = areas;
    });
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.subscriptionService.getSubscriptions().subscribe((subscriptions) => {
      this.subscriptions = subscriptions;
      this.primaryUserSubscriptions = this.subscriptions.filter(
        (subscription) => {
          return subscription.user_id === 1;
        }
      );
    });
  }
}
