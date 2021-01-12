import { Area } from './../../../models/Area';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss'],
})
export class DashboardOverviewComponent implements OnInit {
  @Input() areas: Area[];
  areasDisabled: Area[];
  areasEnabled: Area[];

  constructor() {}

  ngOnInit(): void {
    this.calculateOverview();
  }
  calculateOverview() {
    this.areasEnabled = this.areas.filter((area) => {
      return area.status === true;
    });
    this.areasDisabled = this.areas.filter((area) => {
      return area.status === false;
    });
  }
}
