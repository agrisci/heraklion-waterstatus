import { Component, OnInit } from '@angular/core';
import { SettingsService } from './../../../services/settings.service';

@Component({
  selector: 'app-settings-logs',
  templateUrl: './settings-logs.component.html',
  styleUrls: ['./settings-logs.component.scss'],
})
export class SettingsLogsComponent implements OnInit {
  logs: string[] = [];
  filteredLogs: string[];
  filtered: boolean = false;
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getLogs().subscribe((logs) => {
      this.logs = logs;
    });
  }

  filterLogs(value) {
    if (value.length > 0) {
      this.filtered = true;
      const valueLowerCase = value.toLowerCase();
      this.filteredLogs = this.logs.filter((log) => {
        const logLowerCase = log.toLowerCase();
        if (logLowerCase.includes(valueLowerCase)) {
          return log;
        }
      });
    } else {
      this.filtered = false;
    }
  }
}
