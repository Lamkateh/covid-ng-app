import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Role } from '../../../models/role';
import { VaccinationCenter } from '../../../models/vaccination-center';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-management-dialog',
  templateUrl: './user-management-dialog.component.html',
  styleUrls: [
    '../../common/css/dialog.scss',
    './user-management-dialog.component.scss',
  ],
})
export class UserManagementDialogComponent implements OnInit {
  lastNameTerm: string = '';
  firstNameTerm: string = '';
  emailTerm: string = '';
  passwordTerm: string = '';
  //roleTerm: string = '';
  roleTerm = 3;
  centerTerm: string = '';
  roles: Role[] = [];
  centers: VaccinationCenter[] = [];

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<UserManagementDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      lastName: string;
      firstName: string;
      email: string;
      password: string;
      role: string;
      center: string;
    }
  ) {
  }

  ngOnInit(): void {
    this.getRoles();
    this.getCenters();
    this.lastNameTerm = this.data.lastName;
    this.firstNameTerm = this.data.firstName;
    this.emailTerm = this.data.email;
    //this.roleTerm = this.data.role;
    this.passwordTerm = this.data.password;
    this.centerTerm = this.data.center;
  }

  getRoles() { }

  getCenters() { }

  onDisableUser() { }

  onSaveUser() { }
}
