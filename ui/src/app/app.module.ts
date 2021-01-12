import { SettingsService } from './services/settings.service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { UserService } from './services/user.service';
import { SubscriptionService } from './services/subscription.service';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings/settings.component';
import { NavbarComponent } from './components/sidebar-navbar/navbar/navbar.component';
import { AreaService } from './services/area.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SidebarComponent } from './components/sidebar-navbar/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AreaPipe } from './pipes/area.pipe';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions/subscriptions.component';
import { UsersComponent } from './components/users/users/users.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { SubscriptionFormComponent } from './components/subscriptions/subscription-form/subscription-form.component';
import { SubscriptionListComponent } from './components/subscriptions/subscription-list/subscription-list.component';
import { SettingsFormComponent } from './components/settings/settings-form/settings-form.component';
import { SettingsLogsComponent } from './components/settings/settings-logs/settings-logs.component';
import { PostConfirmationComponent } from './components/shared/post-confirmation/post-confirmation.component';
import { DashboardChartComponent } from './components/dashboard/dashboard-chart/dashboard-chart.component';
import { DashboardOverviewComponent } from './components/dashboard/dashboard-overview/dashboard-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SettingsComponent,
    NavbarComponent,
    NotFoundComponent,
    SidebarComponent,
    AreaPipe,
    SubscriptionsComponent,
    UsersComponent,
    UserListComponent,
    UserFormComponent,
    YesNoPipe,
    SubscriptionFormComponent,
    SubscriptionListComponent,
    SettingsFormComponent,
    SettingsLogsComponent,
    PostConfirmationComponent,
    DashboardChartComponent,
    DashboardOverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
  ],
  providers: [AreaService, SubscriptionService, UserService, SettingsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
