import { Injectable } from '@angular/core';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  roles: Role[] = [
    { name: 'Superadmin', value: 'superadmin' },
    { name: 'Administrateur', value: 'admin' },
    { name: 'Médecin', value: 'doctor' },
  ]

  constructor() { }
}
