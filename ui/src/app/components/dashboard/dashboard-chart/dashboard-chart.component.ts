import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

import { AreaService } from './../../../services/area.service';

import { Log } from './../../../models/Log';
import { Area } from './../../../models/Area';
import { Subscription } from './../../../models/Subscription';
@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss'],
})
export class DashboardChartComponent implements OnInit {
  @Input() subscription: Subscription;
  @Input() areas: Area[];
  logs: Log[];
  chart = [];
  constructor(private areaService: AreaService) {}

  ngOnInit(): void {
    if (this.subscription) {
      this.areaService.getArea(this.subscription.area_id).subscribe((logs) => {
        let dates = logs.map((log) => log.datetime);
        let status = logs.map((log) => log.status);
        let area = this.areas[this.subscription.area_id - 1];
        let formattedDates = [];

        dates.forEach((res) => {
          let jsdate = new Date(res);
          formattedDates.push(
            jsdate.toLocaleTimeString('en', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          );
        });
        this.drawChart(area, status, formattedDates);
      });
    }
  }

  drawChart(area, status, formattedDates) {
    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.defaultFont = 'Roboto';
    Chart.defaults.global.defaultFontSize = 14;
    this.chart = new Chart(`canvas${this.subscription.id}`, {
      type: 'line',
      data: {
        labels: formattedDates,
        datasets: [
          {
            data: status,
            borderColor: '#3cba9f',
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        title: {
          display: true,
          text: area.name,
          fontFamily: 'Roboto',
          fontStyle: 'normal',
          fontColor: 'black',
          fontSize: 16,
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: true,
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                stepSize: 1,
                callback: (value) => {
                  if (value == 0) {
                    return 'Disabled';
                  } else {
                    return value == 1 ? 'Enabled' : '';
                  }
                },
              },
            },
          ],
        },
      },
    });
  }
}
