import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.scss'],
})
export class ConfigurationPageComponent implements OnInit {
  superadmins?: User[];
  nameSearchTerm: string = '';
  nameSearched: string = '';
  listLoading: boolean = false;
  role: Role = this.roleService.roles[0];

  constructor(private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.getResult();
  }

  getResult() { }

  isLoading() {
    if (this.listLoading) return true;
    else return false;
  }

  onSearchName() {
    this.nameSearched = this.nameSearchTerm;
    this.getResult();
  }
}
