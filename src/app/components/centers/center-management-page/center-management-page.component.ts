import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role';
import { VaccinationCenter } from 'src/app/models/vaccination-center';
import { VaccinationCenterService } from 'src/app/services/vaccination-center.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-center-management-page",
  templateUrl: "./center-management-page.component.html",
  styleUrls: ["./center-management-page.component.scss"],
})
export class CenterManagementPageComponent implements OnInit {
  doctors?: User[];
  center: VaccinationCenter;
  centerId: number;
  nameSearchTerm: string = '';
  nameSearched: string = '';
  listLoading: boolean = false;
  role: Role = this.roleService.roles[2];

  constructor(private roleService: RoleService, private centerService: VaccinationCenterService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.centerId = Number(this.route.snapshot.paramMap.get("id"));
    this.getCenter();
    this.getDoctors();
  }

  getCenter() {
    this.centerService.getVaccinationCenterById(this.centerId)
      .subscribe((center: { data: VaccinationCenter }) => {
        this.center = center.data;
      });
  }

  getDoctors() {
    this.userService.getDoctors(this.centerId).subscribe({
      next: (data) => {
        this.doctors = data.data;
      },
      error: (err) => { },
    });
  }

  getResult() {
    return this.doctors.filter((doctor) => {
      return doctor.firstName
        .toLowerCase()
        .includes(this.nameSearchTerm.toLowerCase());
    });
  }

  onSearchName() {
    this.nameSearched = this.nameSearchTerm;
    this.getResult();
  }
}
