import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CenterManagementDialogComponent } from '../center-management-dialog/center-management-dialog.component';
import { User } from '../../../models/user';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { Center } from 'src/app/models/center';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { UserManagementDialogComponent } from '../user-management-dialog/user-management-dialog.component';

@Component({
  selector: 'app-users-management-dialog',
  templateUrl: './users-management-dialog.component.html',
  styleUrls: [
    '../../common/css/dialog.scss',
    './users-management-dialog.component.scss',
  ],
})
export class UsersManagementDialogComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];
  doctors?: User[] | {}[] = [{}];
  admins?: User[] | {}[] = [{}];
  nameSearchTerm: string = '';
  nameSearched: string = '';
  adminLoading: boolean = false;
  doctorLoading: boolean = false;
  roles: Role[] = this.roleService.roles;

  constructor(
    private roleService: RoleService,
    public dialogRef: MatDialogRef<CenterManagementDialogComponent>,
    private userService: UserService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      center: Center;
    }
  ) { }

  ngOnInit(): void {
    this.getDoctors();
    this.getAdmins();
  }

  getDoctors() {
    this.doctorLoading = true;
    this.userService.getDoctors(this.data.center.id).subscribe({
      next: (data) => {
        this.doctors = data.data.sort((a, b) => a.id - b.id);
        this.doctorLoading = false;
      },
      error: (err) => {
        this.doctorLoading = false;
        console.log(err);
      },
    });
  }

  getAdmins() {
    this.adminLoading = true;
    this.userService.getAdmins(this.data.center.id).subscribe({
      next: (data) => {
        this.admins = data.data.sort((a, b) => a.id - b.id);
        this.adminLoading = false;
      },
      error: (err) => {
        this.adminLoading = false;
        console.log(err);
      },
    });
  }

  getDoctorsList() {
    if (!this.nameSearchTerm && this.doctors.length > 0) {
      return this.doctors;
    }
    return this.doctors.filter((doctor: User) => {
      return (
        doctor.lastName !== null &&
        doctor.lastName
          .toLowerCase()
          .includes(this.nameSearchTerm.toLowerCase())
      );
    });
  }

  getAdminsList() {
    if (!this.nameSearchTerm && this.admins.length > 0) {
      return this.admins;
    }
    return this.admins.filter((admin: User) => {
      return (
        admin.lastName !== null &&
        admin.lastName.toLowerCase().includes(this.nameSearchTerm.toLowerCase())
      );
    });
  }

  onAddClick() {
    this.dialog
      .open(UserManagementDialogComponent, {
        width: '60%',
        data: {
          type: 'creation',
          roles: [this.roles[1], this.roles[2]],
          center: this.data.center,
        },
      })
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          if (response.data.roles.includes(this.roles[1].value)) {
            const newList = [...this.admins];
            newList.push(response.data);
            this.admins = newList;
          } else if (response.data.roles.includes(this.roles[2].value)) {
            const newList = [...this.doctors];
            newList.push(response.data);
            this.doctors = newList;
          }
        }
      });
  }

  onEditAdminClick(admin: User) {
    this.dialog
      .open(UserManagementDialogComponent, {
        width: '60%',
        data: {
          type: 'update',
          roles: [this.roles[1]],
          user: admin,
        },
      })
      .afterClosed()
      .subscribe((userEdited) => {
        if (userEdited) {
          this.admins = this.admins
            .map((user) => {
              if (user.id === userEdited.id) {
                return userEdited;
              }
              return user;
            })
            .filter((user) => {
              return (
                user.roles.includes('ADMIN') &&
                user.center.id === this.data.center.id
              );
            });
          if (userEdited.roles.includes('DOCTOR') && userEdited.center.id === this.data.center.id) {
            const newList = [...this.doctors];
            newList.push(userEdited);
            this.doctors = newList;
          }
        }
      });
  }

  onDeleteAdminClick(admin: User) {
    this.dialog.open(DeleteDialogComponent, {
      width: '50%',
      data: {
        user: admin
      },
      autoFocus: false
    }).afterClosed().subscribe((userDeletedId: number) => {
      if (userDeletedId) {
        this.admins = this.admins.filter((user: User) => {
          return user.id !== userDeletedId;
        });
      }
    });
  }

  onEditDoctorClick(doctor: User) {
    this.dialog
      .open(UserManagementDialogComponent, {
        width: '60%',
        data: {
          type: 'update',
          roles: [this.roles[2]],
          user: doctor,
        },
      })
      .afterClosed()
      .subscribe((userEdited) => {
        if (userEdited) {
          this.doctors = this.doctors
            .map((user) => {
              if (user.id === userEdited.id) {
                return userEdited;
              }
              return user;
            })
            .filter((user) => {
              return (
                user.roles.includes('DOCTOR') &&
                user.center.id === this.data.center.id
              );
            });
          if (userEdited.roles.includes('ADMIN') && userEdited.center.id === this.data.center.id) {
            const newList = [...this.admins];
            newList.push(userEdited);
            this.admins = newList;
          }
        }
      });
  }

  onDeleteDoctorClick(doctor: User) {
    this.dialog.open(DeleteDialogComponent, {
      width: '50%',
      data: {
        user: doctor
      },
      autoFocus: false
    }).afterClosed().subscribe((userDeletedId: number) => {
      if (userDeletedId) {
        this.doctors = this.doctors.filter((user: User) => {
          return user.id !== userDeletedId;
        });
      }
    });
  }
}
