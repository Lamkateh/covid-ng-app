import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    birth_date: string | null;
    phone_number: string | null;
    center: string | null;
    roles: string[];
  } | null = null;

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

  signup(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    phone: string,
    birth_date: string
  ): Observable<any> {
    return this.httpClient.post<any>(
      '/public/signup',
      // TODO: remove this
      {
        email: 'aaa',
        password: password,
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        birth_date: birth_date,
      },
      {
        params: {
          email: email,
          password: password,
          first_name: first_name,
          last_name: last_name,
          phone: phone,
          birth_date: birth_date,
        },
      }
    );
  }

  storeToken(email: string, password: string) {
    const token = btoa(email + ':' + password);
    localStorage.setItem('rdvaccination-token', token);
  }

  setAuthUser(user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    birth_date: string | null;
    phone_number: string | null;
    center: string | null;
    roles: string[];
  }) {
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
