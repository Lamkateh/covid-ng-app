import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['../../common/css/dialog.scss', './delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      lastName: string;
      firstName: string;
    }
  ) {
  }

  ngOnInit(): void { }

  onConfirmDelete() { } //TODO
}
