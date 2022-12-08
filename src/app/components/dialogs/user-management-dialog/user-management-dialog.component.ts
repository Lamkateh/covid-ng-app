import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, UntypedFormControl, Validators } from '@angular/forms';
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
import { CenterService } from 'src/app/services/center.service';
import { Role } from '../../../models/role';
import { Center } from '../../../models/center';
import { AuthService } from 'src/app/services/auth.service';

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
  userPasswordFC = new FormControl('');
  userRoleFC = new FormControl({ value: null, disabled: true }, [Validators.required]);
  userCenterFC: UntypedFormControl = new UntypedFormControl({ value: null, disabled: true }, [
    Validators.required,
  ]);

  storeLoading: boolean = false;
  roleList: Role[] = this.roleService.roles;
  userCenterServerSideCtrl: UntypedFormControl = new UntypedFormControl();
  centerList: ReplaySubject<Center[]> = new ReplaySubject<Center[]>(1);
  centerListLoading: boolean = false;
  _onDestroy = new Subject<void>();
  maxDate: Date;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService,
    private centerService: CenterService,
    public dialogRef: MatDialogRef<UserManagementDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      type: "creation" | "update";
      user?: User;
      roles?: Role[];
      center?: Center;
    },
    private _snackBar: MatSnackBar,
  ) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    if (this.data.type === "update" && this.data.user !== null && this.data.user !== undefined) {
      this.userLastNameFC.setValue(this.data.user.lastName);
      this.userFirstNameFC.setValue(this.data.user.firstName);
      this.userBirthDateFC.setValue(new Date(this.data.user.birthDate));
      this.userEmailFC.setValue(this.data.user.email);
      this.userPhoneFC.setValue(this.data.user.phone);
      this.userPasswordFC.setValue(this.data.user.password);
      this.userRoleFC.setValue(this.data.user.roles[0]);
      if (this.authService.user.roles[0].toString() === "SUPERADMIN") {
        this.userRoleFC.enable();
        this.userCenterFC.enable();
      }
      if (this.userRoleFC.value !== "SUPERADMIN") {
        this.userCenterFC.setValue(this.data.user.center);
      }
    } else {
      this.userPasswordFC.setValidators([Validators.required]);
      if (this.data.roles.length === 1) {
        this.userRoleFC.setValue(this.data.roles[0].value);
      }
      if (this.data.roles[0].value !== 'SUPERADMIN') {
        this.userCenterFC.setValue(this.data.center);
      }
    }

    if (this.data.roles.length > 1) {
      this.userRoleFC.enable();
      this.roleList = this.data.roles;
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
    let common = this.userLastNameFC.valid &&
      this.userFirstNameFC.valid &&
      this.userBirthDateFC.valid &&
      this.userEmailFC.valid &&
      this.userPhoneFC.valid;

    if (this.data.type === "creation") {
      if (this.userRoleFC.value === "SUPERADMIN") {
        return (
          common &&
          this.userPasswordFC.valid &&
          (this.userRoleFC.valid || this.userRoleFC.status === "DISABLED")
        );
      } else {
        return (
          common &&
          this.userPasswordFC.valid &&
          (this.userRoleFC.valid || this.userRoleFC.status === "DISABLED") &&
          (this.userCenterFC.valid || this.userCenterFC.status === "DISABLED")
        );
      }
    } else {
      if (this.userRoleFC.value === "SUPERADMIN") {
        return (
          common &&
          (this.userRoleFC.valid || this.userRoleFC.status === "DISABLED")
        );
      } else {
        return (
          common &&
          (this.userRoleFC.valid || this.userRoleFC.status === "DISABLED") &&
          (this.userCenterFC.valid || this.userCenterFC.status === "DISABLED")
        );
      }
    }
  }

  updateUser(user: User) {
    this.storeLoading = true;
    if (user.roles[0].toString() === "SUPERADMIN") {
      user.center = null;
      user.centerId = null;
    }
    this.userService.updateUser(user)
      .subscribe({
        next: (response) => {
          this.storeLoading = false;
          this.dialogRef.close(response.data);
          this._snackBar.open('Utilisateur modifié avec succès', '', {
            duration: 2000,
          });
        },
        error: (err) => {
          console.log(err);
          this.storeLoading = false;
          this._snackBar.open(err.error.message, '', {
            panelClass: 'snackbar-error',
            duration: 2000,
          });
        }
      });
  }

  storeUser() {
    if (!this.formIsValid()) {
      return;
    }

    let user = {
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
      .subscribe({
        next:
          (user) => {
            this.storeLoading = false;
            this.dialogRef.close(user);
            this._snackBar.open('Utilisateur ajouté avec succès', '', {
              duration: 2000,
            });
          },
        error: (err) => {
          console.log(err);
          this.storeLoading = false;
          this._snackBar.open(err.error.message, '', {
            panelClass: 'snackbar-error',
            duration: 2000,
          });
        }
      });
  }

  disableUser() {
    let user = {
      id: this.data.user?.id,
      lastName: this.userLastNameFC.value,
      firstName: this.userFirstNameFC.value,
      birthDate: this.userBirthDateFC.value,
      email: this.userEmailFC.value,
      phone: this.userPhoneFC.value,
      password: this.userPasswordFC.value,
      roles: [this.userRoleFC.value],
      centerId: this.userCenterFC.value?.id,
      disabled: this.data.user.disabled ? false : true,
    };
    this.updateUser(user);
  }
}
