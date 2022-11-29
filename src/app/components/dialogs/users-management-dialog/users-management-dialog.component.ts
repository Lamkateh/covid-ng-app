import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CenterManagementDialogComponent } from '../center-management-dialog/center-management-dialog.component';
import { User } from '../../../models/user';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { VaccinationCenter } from 'src/app/models/vaccination-center';

@Component({
  selector: "app-users-management-dialog",
  templateUrl: "./users-management-dialog.component.html",
  styleUrls: [
    "../../common/css/dialog.scss",
    "./users-management-dialog.component.scss",
  ],
})
export class UsersManagementDialogComponent implements OnInit {
  doctors?: User[] = [];
  admins?: User[] = [];
  nameSearchTerm: string = "";
  nameSearched: string = "";
  //listLoading: boolean = false;
  roles: Role[] = this.roleService.roles;

  constructor(
    private roleService: RoleService,
    public dialogRef: MatDialogRef<CenterManagementDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      center: VaccinationCenter;
    }
  ) { }

  ngOnInit(): void {
    this.getDoctors();
    this.getAdmins();
  }

  getDoctors() {
    this.userService.getDoctors(this.data.center.id).subscribe({
      next: (data) => {
        this.doctors = data.data;
      },
      error: (err) => { },
    });
  }

  getAdmins() {
    this.userService.getAdmins(this.data.center.id).subscribe({
      next: (data) => {
        this.admins = data.data;
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
        doctor.firstName !== null &&
        doctor.firstName
          .toLowerCase()
          .includes(this.nameSearchTerm.toLowerCase())
      );
    });
  }

  getAdminsList() {
    if (!this.nameSearchTerm && this.admins.length > 0) {
      return this.admins;
    }
    return this.admins.filter((admin) => {
      return (
        admin.firstName !== null &&
        admin.firstName
          .toLowerCase()
          .includes(this.nameSearchTerm.toLowerCase())
      );
    });
  }

  onSearchName() {
    this.nameSearched = this.nameSearchTerm;
  }

  /*deleteUser() {
    this.storeLoading = true;
    this.userService
      .deleteUser(this.data.user.id)
      .subscribe(
        (res) => {
          this.storeLoading = false;
          this.dialogRef.close(this.data.user);
          this._snackBar.open('Utilisateur supprimé avec succès', '', {
            duration: 2000,
          });
        },
        (err) => {
          console.log(err);
          this.storeLoading = false;
          this._snackBar.open("Une erreur s'est produite", '', {
            panelClass: 'snackbar-error',
            duration: 2000,
          });
        }
      );
  }*/
}
