import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsersByCenter(
    centerId: number,
  ): Observable<{ data: User[] }> {
    return this.httpClient.get<{ data: User[] }>(
      '/public/centers/' + centerId + '/users'
    );
  }

  getDoctors(centerId: number): Observable<{ data: User[] }> {
    return this.httpClient.get<{ data: User[] }>(
      "/private/centers/" + centerId + "/doctors"
    );
  }

  getAdmins(centerId: number): Observable<{ data: User[] }> {
    return this.httpClient.get<{ data: User[] }>(
      "/private/centers/" + centerId + "/admins"
    );
  }

  storeUser(
    user: User
  ): Observable<any> {
    return this.httpClient.post<any>('/private/users', user);
  }

  updateUser(
    user: User
  ): Observable<any> {
    return this.httpClient.put<any>('/private/users/' + user.id, user);
  }

  deleteUser(
    userId: number
  ): Observable<any> {
    return this.httpClient.delete('/private/users/' + userId);
  }
}
