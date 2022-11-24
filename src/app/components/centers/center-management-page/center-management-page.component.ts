import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role';
import { VaccinationCenter } from 'src/app/models/vaccination-center';
import { VaccinationCenterService } from 'src/app/services/vaccination-center.service';

@Component({
  selector: 'app-center-management-page',
  templateUrl: './center-management-page.component.html',
  styleUrls: ['./center-management-page.component.scss'],
})
export class CenterManagementPageComponent implements OnInit {
  doctors?: User[];
  center: VaccinationCenter;
  nameSearchTerm: string = '';
  nameSearched: string = '';
  listLoading: boolean = false;
  role: Role = this.roleService.roles[2];

  constructor(private roleService: RoleService, private centerService: VaccinationCenterService) {
  }

  ngOnInit(): void {
    this.getResult();
  }

  getResult() {
    this.centerService.getVaccinationCenterById(10)
      .subscribe((center: { data: VaccinationCenter }) => {
        this.center = center.data;
      });
  }

  isLoading() {
    if (this.listLoading) return true;
    else return false;
  }

  onSearchName() {
    this.nameSearched = this.nameSearchTerm;
    this.getResult();
  }
}
