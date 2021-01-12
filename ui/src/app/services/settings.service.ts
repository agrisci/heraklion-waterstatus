import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Settings } from './../models/Settings';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient) {}
  public getSettings(): Observable<Settings> {
    return this.http.get<Settings>(`${environment.apiURL}/api/settings`);
  }
  public getLogs(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiURL}/api/logs`);
  }
  public updateSettings(settings: Settings): Observable<Settings> {
    return this.http.put<Settings>(
      `${environment.apiURL}/api/settings`,
      settings
    );
  }
}
