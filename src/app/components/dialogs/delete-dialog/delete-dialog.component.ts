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
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  color: string = '';

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
    this.color = this.authService.getColorTheme();
  }

  ngOnInit(): void { }

  onConfirmDelete() { } //TODO
}
