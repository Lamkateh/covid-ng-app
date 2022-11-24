import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CenterManagementDialogComponent } from '../center-management-dialog/center-management-dialog.component';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-users-management-dialog',
  templateUrl: './users-management-dialog.component.html',
  styleUrls: [
    '../../common/css/dialog.scss',
    './users-management-dialog.component.scss',
  ],
})
export class UsersManagementDialogComponent implements OnInit {
  doctors?: User[];
  admins?: User[];
  centerId: number;
  nameSearchTerm: string = '';
  nameSearched: string = '';
  //listLoading: boolean = false;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<CenterManagementDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      centerId: number;
    }
  ) {
  }

  ngOnInit(): void {
    this.getResult();
  }

  getResult() { }

  /*isLoading() {
    if (this.listLoading) return true;
    else return false;
  }*/

  onSearchName() {
    this.nameSearched = this.nameSearchTerm;
    this.getResult();
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
