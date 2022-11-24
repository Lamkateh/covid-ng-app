import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { VaccinationCenter } from 'src/app/models/vaccination-center';
import { UsersManagementDialogComponent } from '../users-management-dialog/users-management-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VaccinationCenterService } from 'src/app/services/vaccination-center.service';

@Component({
  selector: 'app-center-management-dialog',
  templateUrl: './center-management-dialog.component.html',
  styleUrls: [
    '../../common/css/dialog.scss',
    './center-management-dialog.component.scss',
  ],
})
export class CenterManagementDialogComponent implements OnInit {

  centerNameFC = new FormControl('', [Validators.required]);
  centerAddressFC = new FormControl('');
  centerZipCodeFC = new FormControl('');
  centerCityFC = new FormControl('');
  centerPhoneFC = new FormControl('');

  storeLoading: boolean = false;

  constructor(
    private centerService: VaccinationCenterService,
    public dialogRef: MatDialogRef<CenterManagementDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      type: "creation" | "update";
      center?: VaccinationCenter;
    },
    private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    if (this.data.type === "update" && this.data.center !== null) {
      this.centerNameFC.setValue(this.data.center.name);
      this.centerAddressFC.setValue(this.data.center.address);
      this.centerZipCodeFC.setValue(this.data.center.zipCode);
      this.centerCityFC.setValue(this.data.center.city);
      this.centerPhoneFC.setValue(this.data.center.phone);
    }
  }

  formIsValid(): boolean {
    return (
      this.centerNameFC.valid &&
      this.centerAddressFC.valid &&
      this.centerZipCodeFC.valid &&
      this.centerCityFC.valid &&
      this.centerPhoneFC.valid
    );
  }

  onManageUser() {
    this.dialog.open(UsersManagementDialogComponent, {
      width: '80%',
      height: '80%',
      data: {
        title: 'Gestion des admins et médecins du centre',
        centerId: this.data.center.id,
      },
    });
  }

  updateCenter(center: VaccinationCenter) {
    this.storeLoading = true;
    this.centerService
      .updateVaccinationCenter(
        center
      )
      .subscribe(
        (res) => {
          this.storeLoading = false;
          this.dialogRef.close(center);
          this._snackBar.open('Centre modifié avec succès', '', {
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
  }

  storeCenter() {
    if (!this.formIsValid()) {
      return;
    }

    let center: VaccinationCenter = {
      id: this.data.center?.id,
      name: this.centerNameFC.value,
      address: this.centerAddressFC.value,
      zipCode: this.centerZipCodeFC.value,
      city: this.centerCityFC.value,
      phone: this.centerPhoneFC.value,
      email: this.data.center?.email,
    };

    if (this.data.type === "update") {
      this.updateCenter(center);
      return;
    }

    this.storeLoading = true;
    this.centerService
      .storeVaccinationCenter(
        center
      )
      .subscribe(
        (res) => {
          this.storeLoading = false;
          this.dialogRef.close(center);
          this._snackBar.open('Centre ajouté avec succès', '', {
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
  }

  deleteCenter() {
    this.storeLoading = true;
    this.centerService
      .deleteVaccinationCenter(this.data.center.id)
      .subscribe(
        (res) => {
          this.storeLoading = false;
          this.dialogRef.close(this.data.center);
          this._snackBar.open('Centre supprimé avec succès', '', {
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
  }
}
