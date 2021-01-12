import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './components/users/users/users.component';
import { SettingsComponent } from './components/settings/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions/subscriptions.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
