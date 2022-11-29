import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private roleService: RoleService, private userService: UserService) { }

  ngOnInit(): void {
    this.getSuperadmins();
  }

  getSuperadmins() {
    this.userService.getSuperadmins().subscribe({
      next: (data) => {
        this.superadmins = data.data;
      },
      error: (err) => { },
    });
  }

  getResult() {
    return this.superadmins.filter((superadmins) => {
      return superadmins.firstName
        .toLowerCase()
        .includes(this.nameSearchTerm.toLowerCase());
    });
  }

  onSearchName() {
    this.nameSearched = this.nameSearchTerm;
    this.getResult();
  }
}
