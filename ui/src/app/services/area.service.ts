import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Area } from './../models/Area';
import { Log } from './../models/Log';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  constructor(private http: HttpClient) {}
  public getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${environment.apiURL}/api/areas`);
  }
  public getArea(id: number): Observable<Log[]> {
    return this.http.get<Log[]>(`${environment.apiURL}/api/area/${id}`);
  }
}
