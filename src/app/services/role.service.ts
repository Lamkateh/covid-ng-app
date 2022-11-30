import { Injectable } from '@angular/core';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  roles: Role[] = [
    { name: 'Superadmin', value: 'SUPERADMIN' },
    { name: 'Administrateur', value: 'ADMIN' },
    { name: 'Médecin', value: 'DOCTOR' },
  ]

  constructor() { }
}
