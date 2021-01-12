import { SubscriptionService } from './../../../services/subscription.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from './../../../models/User';
import { Area } from './../../../models/Area';
import { Subscription } from './../../../models/Subscription';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss'],
})
export class SubscriptionFormComponent implements OnInit {
  @Input() users: User[];
  @Input() areas: Area[];
  @Input() subscriptions: Subscription[];
  @Output() updatedSubscriptionList = new EventEmitter<Subscription[]>();

  subscription: Subscription;
  isValid: boolean = false;
  constructor(private subscriptionService: SubscriptionService) {
    this.subscription = {
      user_id: null,
      area_id: null,
    };
  }

  ngOnInit(): void {}
  onSubmit(form) {
    this.subscriptionService
      .addSubscription(this.subscription)
      .subscribe((response: any) => {
        if (!response.ok) {
          this.subscriptions.push(response);
          this.updatedSubscriptionList.emit(this.subscriptions);
          this.isValid = !this.isValid;
          setTimeout(() => {
            this.isValid = !this.isValid;
          }, 2000);
          form.reset();
        } else {
          console.log('Something went wrong with the api communication...');
        }
      });
  }
}
