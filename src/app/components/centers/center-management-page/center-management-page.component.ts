import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role';
import { Center } from 'src/app/models/center';
import { CenterService } from 'src/app/services/center.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-center-management-page",
  templateUrl: "./center-management-page.component.html",
  styleUrls: ["./center-management-page.component.scss"],
})
export class CenterManagementPageComponent implements OnInit {
  doctors?: User[] = [];
  center: Center;
  centerId: number;
  nameSearchTerm: string = '';
  nameSearched: string = '';
  listLoading: boolean = false;
  role: Role = this.roleService.roles[2];

  constructor(private roleService: RoleService, private centerService: CenterService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.centerId = Number(this.route.snapshot.paramMap.get("id"));
    this.getCenter();
    this.getDoctors();
  }

  getCenter() {
    this.centerService.getCenterById(this.centerId)
      .subscribe((center: { data: Center }) => {
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

  getDoctorsList() {
    if (!this.nameSearchTerm && this.doctors.length > 0) {
      return this.doctors;
    }
    return this.doctors.filter((doctor) => {
      return (
        doctor.lastName !== null &&
        doctor.lastName
          .toLowerCase()
          .includes(this.nameSearchTerm.toLowerCase())
      );
    });
  }

  onUserEdited(user: User) {
    this.doctors = this.doctors.map((doctor) => {
      if (doctor.id === user.id) {
        return user;
      }
      return doctor;
    });
  }
}
