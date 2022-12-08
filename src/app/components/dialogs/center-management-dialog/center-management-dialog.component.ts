import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Center } from 'src/app/models/center';
import { UsersManagementDialogComponent } from '../users-management-dialog/users-management-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CenterService } from 'src/app/services/center.service';

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
    private centerService: CenterService,
    public dialogRef: MatDialogRef<CenterManagementDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      type: "creation" | "update";
      center?: Center;
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
        center: this.data.center
      },
      autoFocus: false
    });
  }

  updateCenter(center: Center) {
    this.storeLoading = true;
    this.centerService
      .updateCenter(
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

    let center: Center = {
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
      .storeCenter(
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
      .deleteCenter(this.data.center.id)
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
