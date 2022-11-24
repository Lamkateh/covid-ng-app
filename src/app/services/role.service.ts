import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<{ data: Role[] }> {
    return this.httpClient.get<{ data: Role[] }>('/public/roles');
  }
}
