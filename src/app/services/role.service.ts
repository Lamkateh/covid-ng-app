import { Injectable } from '@angular/core';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  roles: Role[] = [
    { name: 'Superadmin', id: 1 },
    { name: 'Administrateur', id: 2 },
    { name: 'Médecin', id: 3 },
  ]

  constructor() { }
}
