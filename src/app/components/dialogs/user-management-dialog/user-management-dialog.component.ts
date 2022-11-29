import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, filter, ReplaySubject, Subject, takeUntil, tap } from 'rxjs';
import { User } from 'src/app/models/user';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { VaccinationCenterService } from 'src/app/services/vaccination-center.service';
import { Role } from '../../../models/role';
import { VaccinationCenter } from '../../../models/vaccination-center';

@Component({
  selector: 'app-user-management-dialog',
  templateUrl: './user-management-dialog.component.html',
  styleUrls: [
    '../../common/css/dialog.scss',
    './user-management-dialog.component.scss',
  ],
})
export class UserManagementDialogComponent implements OnInit {

  userLastNameFC = new FormControl('', [Validators.required]);
  userFirstNameFC = new FormControl('', [Validators.required]);
  userBirthDateFC = new FormControl(null, [Validators.required]);
  userEmailFC = new FormControl('', [Validators.required, Validators.email]);
  userPhoneFC = new FormControl('', [Validators.required]);
  userPasswordFC = new FormControl('', [Validators.required]);
  userRoleFC = new FormControl({ value: null, disabled: true }, [Validators.required]);
  userCenterFC: UntypedFormControl = new UntypedFormControl(null, [
    Validators.required,
  ]);

  storeLoading: boolean = false;
  roleList: Role[] = this.roleService.roles;
  userCenterServerSideCtrl: UntypedFormControl = new UntypedFormControl();
  centerList: ReplaySubject<VaccinationCenter[]> = new ReplaySubject<VaccinationCenter[]>(1);
  centerListLoading: boolean = false;
  _onDestroy = new Subject<void>();
  hide = true;
  maxDate: Date;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private centerService: VaccinationCenterService,
    public dialogRef: MatDialogRef<UserManagementDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      type: "creation" | "update";
      user?: User;
      role?: Role;
      center?: VaccinationCenter;
    },
    private _snackBar: MatSnackBar,
  ) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    if (this.data.type === "update" && this.data.user !== null) {
      this.userLastNameFC.setValue(this.data.user.lastName);
      this.userFirstNameFC.setValue(this.data.user.firstName);
      this.userBirthDateFC.setValue(new Date(this.data.user.birthDate.getTime()));
      this.userEmailFC.setValue(this.data.user.email);
      this.userPhoneFC.setValue(this.data.user.phone);
      this.userPasswordFC.setValue(this.data.user.password);
      this.userRoleFC.setValue(this.data.user.roles[0]);
      this.userRoleFC.enable();
      if (this.userRoleFC.value !== "superadmin") {
        this.userCenterFC.setValue(this.data.user.centerId);
      }
    } else {
      this.userRoleFC.setValue(this.data.role.value);
    }

    if (this.data.type === "creation" && this.data.role.value !== 'superadmin') {
      this.userCenterFC.setValue(this.data.center);
    }

    if (!this.data.role) {
      this.userRoleFC.enable();
    }

    this.userCenterServerSideCtrl.valueChanges
      .pipe(
        filter((search) => !!search),
        tap(() => (this.centerListLoading = true)),
        takeUntil(this._onDestroy),
        debounceTime(1000),
        takeUntil(this._onDestroy)
      )
      .subscribe({
        next: (response) => {
          this.centerService.getCentersByName(response).subscribe({
            next: (response) => {
              this.centerList.next(response.data.content);
              this.centerListLoading = false;
            },
            error: (error) => {
              console.log(error);
              this.centerListLoading = false;
            },
          });
        },
        error: (error) => {
          console.log(error);
          this.centerListLoading = false;
        },
      });
  }

  formIsValid() {
    if (this.userRoleFC.value === "superadmin") {
      return (
        this.userLastNameFC.valid &&
        this.userFirstNameFC.valid &&
        this.userBirthDateFC.valid &&
        this.userEmailFC.valid &&
        this.userPhoneFC.valid &&
        this.userPasswordFC.valid &&
        (this.userRoleFC.valid || this.userRoleFC.disable)
      );
    } else {
      return (
        this.userLastNameFC.valid &&
        this.userFirstNameFC.valid &&
        this.userBirthDateFC.valid &&
        this.userEmailFC.valid &&
        this.userPhoneFC.valid &&
        this.userPasswordFC.valid &&
        (this.userRoleFC.valid || this.userRoleFC.disable) &&
        this.userCenterFC.valid
      );
    }
  }

  updateUser(user: User) {
    this.storeLoading = true;
    this.userService
      .updateUser(
        user
      )
      .subscribe(
        (res) => {
          this.storeLoading = false;
          this.dialogRef.close(user);
          this._snackBar.open('Utilisateur modifié avec succès', '', {
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

  storeUser() {
    if (!this.formIsValid()) {
      return;
    }

    let user: User = {
      id: this.data.user?.id,
      lastName: this.userLastNameFC.value,
      firstName: this.userFirstNameFC.value,
      birthDate: this.userBirthDateFC.value,
      email: this.userEmailFC.value,
      phone: this.userPhoneFC.value,
      password: this.userPasswordFC.value,
      roles: [this.userRoleFC.value],
      centerId: this.userCenterFC.value?.id,
      disabled: this.data.user?.disabled,
    };

    if (this.data.type === "update") {
      this.updateUser(user);
      return;
    }

    this.storeLoading = true;
    this.userService
      .storeUser(
        user
      )
      .subscribe(
        (res) => {
          this.storeLoading = false;
          this.dialogRef.close(user);
          this._snackBar.open('Utilisateur ajouté avec succès', '', {
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

  disableUser() {
    let user: User = {
      id: this.data.user?.id,
      lastName: this.userLastNameFC.value,
      firstName: this.userFirstNameFC.value,
      birthDate: this.userBirthDateFC.value,
      email: this.userEmailFC.value,
      phone: this.userPhoneFC.value,
      password: this.userPasswordFC.value,
      roles: [this.userRoleFC.value],
      centerId: this.userCenterFC.value.id,
      disabled: true,
    };
    this.updateUser(user);
  }
}
