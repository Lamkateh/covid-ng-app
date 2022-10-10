import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VaccinationCenterService } from '../services/vaccination-center.service';
import { UsersManagementDialogComponent } from '../users-management-dialog/users-management-dialog.component';
@Component({
  selector: 'app-center-management-dialog',
  templateUrl: './center-management-dialog.component.html',
  styleUrls: ['./center-management-dialog.component.scss']
})
export class CenterManagementDialogComponent implements OnInit {

  nameTerm: string = '';
  addressTerm: string = '';
  zipCodeTerm: string = '';
  cityTerm: string = '';
  phoneTerm: string = '';
  color: string;

  constructor(private service: VaccinationCenterService, public dialogRef: MatDialogRef<CenterManagementDialogComponent>, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      isAddDialog: boolean,
      title: string,
      name: string,
      address: string,
      zipCode: string,
      city: string,
      phone: string
      centerId: string
    }) { }

  ngOnInit(): void {
    this.getColor();
    this.nameTerm = this.data.name;
    this.addressTerm = this.data.address;
    this.zipCodeTerm = this.data.zipCode;
    this.cityTerm = this.data.city;
    this.phoneTerm = this.data.phone;
  }

  getColor() {
    this.color = this.service.getColorTheme();
  }

  onManageUser() {
    this.dialog.open(UsersManagementDialogComponent, {
      width: '80%',
      height: '80%',
      data: {
        title: 'Gestion des admins et médecins du centre',
        centerId: this.data['centerId']
      }
    });
  }

  onAddCenter() { } //TODO

}
