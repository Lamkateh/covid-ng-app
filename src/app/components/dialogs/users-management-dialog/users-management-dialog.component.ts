import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CenterManagementDialogComponent } from "../center-management-dialog/center-management-dialog.component";
import { User } from "../../../models/user";
import { AuthService } from "../../../services/auth.service";
import { UserService } from "src/app/services/user.service";

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
  centerId: number;
  nameSearchTerm: string = "";
  nameSearched: string = "";
  //listLoading: boolean = false;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<CenterManagementDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      centerId: number;
    }
  ) {}

  ngOnInit(): void {
    this.getDoctors();
    this.getAdmins();
  }

  getDoctors() {
    this.userService.getDoctors(this.data.centerId).subscribe({
      next: (data) => {
        this.doctors = data.data;
      },
      error: (err) => {},
    });
  }

  getAdmins() {
    this.userService.getAdmins(this.data.centerId).subscribe({
      next: (data) => {
        this.admins = data.data;
      },
      error: (err) => {},
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
}
