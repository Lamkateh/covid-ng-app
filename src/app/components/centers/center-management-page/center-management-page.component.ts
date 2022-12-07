import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role';
import { Center } from 'src/app/models/center';
import { CenterService } from 'src/app/services/center.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DeleteDialogComponent } from '../../dialogs/delete-dialog/delete-dialog.component';
import { UserManagementDialogComponent } from '../../dialogs/user-management-dialog/user-management-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: "app-center-management-page",
  templateUrl: "./center-management-page.component.html",
  styleUrls: ["./center-management-page.component.scss"],
})
export class CenterManagementPageComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'actions'
  ];
  doctors?: User[] = [];
  center: Center;
  centerId: number;
  nameSearchTerm: string = '';
  nameSearched: string = '';
  listLoading: boolean = false;
  role: Role = this.roleService.roles[2];

  constructor(private roleService: RoleService, private centerService: CenterService, private userService: UserService, private route: ActivatedRoute, public dialog: MatDialog) { }

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

  onAddClick() {
    this.dialog.open(UserManagementDialogComponent, {
      width: '60%',
      data: {
        type: 'creation',
        roles: [this.role],
        center: this.center
      },
    }).afterClosed().subscribe((response) => {
      if (response) {
        const newList = [...this.doctors];
        newList.push(response.data);
        this.doctors = newList;
      }
    });
  }

  onEditClick(doctor: User) {
    this.dialog.open(UserManagementDialogComponent, {
      width: '60%',
      data: {
        type: 'update',
        roles: [this.role],
        user: doctor
      }
    }).afterClosed().subscribe((userEdited) => {
      this.doctors = this.doctors.map((doctor) => {
        if (doctor.id === userEdited.id) {
          return userEdited;
        }
        return doctor;
      });
    });
  }

  onDeleteClick(doctor: User) {
    this.dialog.open(DeleteDialogComponent, {
      width: '50%',
      data: {
        user: doctor
      },
      autoFocus: false
    }).afterClosed().subscribe((userEditedId) => {
      this.doctors = this.doctors.filter((doctor) => {
        return doctor.id !== userEditedId;
      });
    });
  }
}
