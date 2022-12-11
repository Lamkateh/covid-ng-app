import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: User | null = null;

  constructor(private httpClient: HttpClient) { }

  signin(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(
      '/public/signin',
      {},
      {
        params: {
          email: email,
          password: password,
        },
      }
    );
  }

  signup(user): Observable<any> {
    return this.httpClient.post<any>(
      '/public/signup', user
    );
  }

  storeToken(email: string, password: string) {
    const token = btoa(email + ':' + password);
    localStorage.setItem('rdvaccination-token', token);
  }

  setAuthUser(user: User) {
    this.user = user;
  }

  getUserInfo(): Observable<any> {
    return this.httpClient.get<any>('/private/me');
  }

  logout() {
    localStorage.removeItem('rdvaccination-token');
    this.user = null;
  }
}
