import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Subscription } from './../models/Subscription';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  public getSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(
      `${environment.apiURL}/api/subscriptions`
    );
  }
  public addSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(
      `${environment.apiURL}/api/subscription`,
      subscription
    );
  }
  public deleteSubscription(id: number) {
    return this.http.delete(`${environment.apiURL}/api/subscription/${id}`);
  }
}
