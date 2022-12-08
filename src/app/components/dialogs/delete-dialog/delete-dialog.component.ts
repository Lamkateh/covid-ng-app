import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Center } from 'src/app/models/center';
import { User } from 'src/app/models/user';
import { CenterService } from 'src/app/services/center.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['../../common/css/dialog.scss', './delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {

  deleteLoading: boolean = false;

  constructor(
    private userService: UserService,
    private centerService: CenterService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      user?: User;
      center?: Center;
    }
  ) {
  }

  ngOnInit(): void { }

  onConfirmDelete() {
    this.deleteLoading = true;
    if (this.data.user) {
      this.userService.deleteUser(this.data.user.id).subscribe({
        next: () => {
          this.deleteLoading = false;
          this.dialogRef.close(this.data.user.id);
          this._snackBar.open('Utilisateur supprimé avec succès', '', {
            duration: 2000,
          });
        },
        error: (err) => {
          console.log(err);
          this.deleteLoading = false;
          this._snackBar.open("Une erreur s'est produite", '', {
            panelClass: 'snackbar-error',
            duration: 2000,
          });
        },
      });
    } else if (this.data.center) {
      this.centerService.deleteCenter(this.data.center.id).subscribe({
        next: () => {
          this.deleteLoading = false;
          this.dialogRef.close(this.data.center.id);
          this._snackBar.open('Centre supprimé avec succès', '', {
            duration: 2000,
          });
        },
        error: (err) => {
          console.log(err);
          this.deleteLoading = false;
          this._snackBar.open("Une erreur s'est produite", '', {
            panelClass: 'snackbar-error',
            duration: 2000,
          });
        },
      });
    }
  }
}
