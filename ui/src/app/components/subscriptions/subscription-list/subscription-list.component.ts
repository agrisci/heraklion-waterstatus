import { SubscriptionService } from './../../../services/subscription.service';
import { Component, OnInit, Input } from '@angular/core';

import { Area } from './../../../models/Area';
import { User } from './../../../models/User';
import { Subscription } from './../../../models/Subscription';
@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss'],
})
export class SubscriptionListComponent implements OnInit {
  @Input() users: User[];
  @Input() areas: Area[];
  @Input() subscriptions: Subscription[];
  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {}

  getAreaName(subscription: Subscription) {
    if (this.areas) {
      let area = this.areas.find((area) => area.id === subscription.area_id);
      return area.name;
    }
  }

  getSubscriptions(user: User) {
    const subscriptions = this.subscriptions.filter(
      (subscription) => subscription.user_id === user.id
    );
    return subscriptions;
  }

  deleteSubscription(subscription: Subscription) {
    this.subscriptionService
      .deleteSubscription(subscription.id)
      .subscribe((response: any) => {
        if (response.success) {
          this.subscriptions.splice(
            this.subscriptions.indexOf(subscription),
            1
          );
        }
      });
  }
}
