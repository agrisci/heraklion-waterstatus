import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { User } from './../models/User';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new Subject<User>();
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiURL}/api/users`);
  }
  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiURL}/api/user`, user);
  }
  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      `${environment.apiURL}/api/user/${user.id}`,
      user
    );
  }
  public deleteUser(id: number) {
    return this.http.delete(`${environment.apiURL}/api/user/${id}`);
  }
  public userToEdit() {
    return this.user;
  }
}
