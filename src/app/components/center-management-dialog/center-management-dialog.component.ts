import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { UsersManagementDialogComponent } from '../users-management-dialog/users-management-dialog.component';

@Component({
  selector: 'app-center-management-dialog',
  templateUrl: './center-management-dialog.component.html',
  styleUrls: [
    '../common/css/dialog.scss',
    './center-management-dialog.component.scss',
  ],
})
export class CenterManagementDialogComponent implements OnInit {
  nameTerm: string = '';
  addressTerm: string = '';
  zipCodeTerm: string = '';
  cityTerm: string = '';
  phoneTerm: string = '';
  color: string;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<CenterManagementDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      isAddDialog: boolean;
      title: string;
      name: string;
      address: string;
      zipCode: string;
      city: string;
      phone: string;
      centerId: string;
    }
  ) {
    this.color = this.authService.getColorTheme();
  }

  ngOnInit(): void {
    this.nameTerm = this.data.name;
    this.addressTerm = this.data.address;
    this.zipCodeTerm = this.data.zipCode;
    this.cityTerm = this.data.city;
    this.phoneTerm = this.data.phone;
  }

  onManageUser() {
    this.dialog.open(UsersManagementDialogComponent, {
      width: '80%',
      height: '80%',
      data: {
        title: 'Gestion des admins et médecins du centre',
        centerId: this.data['centerId'],
      },
    });
  }

  onAddCenter() {} //TODO
}
