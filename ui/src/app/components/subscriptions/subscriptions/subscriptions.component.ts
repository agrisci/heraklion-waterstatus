import { Component, OnInit } from '@angular/core';

import { User } from './../../../models/User';
import { Area } from './../../../models/Area';
import { Subscription } from '../../../models/Subscription';
import { UserService } from './../../../services/user.service';
import { AreaService } from './../../../services/area.service';
import { SubscriptionService } from '../../../services/subscription.service';
@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
})
export class SubscriptionsComponent implements OnInit {
  users: User[];
  areas: Area[];
  subscriptions: Subscription[];
  constructor(
    private subscriptionService: SubscriptionService,
    private areaService: AreaService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.subscriptionService.getSubscriptions().subscribe((subscriptions) => {
      this.subscriptions = subscriptions;
    });
    this.areaService.getAreas().subscribe((areas) => {
      this.areas = areas;
    });
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteSubscription(subscription: Subscription) {
    const subscriptionIndex = this.subscriptions.indexOf(subscription);
    this.subscriptionService
      .deleteSubscription(subscription.id)
      .subscribe((response: any) => {
        if (response.success) {
          this.subscriptions.splice(subscriptionIndex, 1);
        }
      });
  }
  updateSubscriptionList(subscriptions: Subscription[]) {
    this.subscriptions = subscriptions;
  }
}
