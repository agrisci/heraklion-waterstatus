import { Component, OnInit } from '@angular/core';

import { SettingsService } from './../../../services/settings.service';
import { Settings } from './../../../models/Settings';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss'],
})
export class SettingsFormComponent implements OnInit {
  settings: Settings;
  isValid: boolean = false;
  constructor(private settingsService: SettingsService) {
    this.settings = {
      web_scraper_interval: null,
      server_email: '',
      server_password: '',
    };
  }

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((settings) => {
      this.settings = settings;
    });
  }

  onSubmit(form) {
    this.settingsService.updateSettings(this.settings).subscribe((response) => {
      this.isValid = !this.isValid;
      setTimeout(() => {
        this.isValid = !this.isValid;
      }, 2000);
    });
  }
}
