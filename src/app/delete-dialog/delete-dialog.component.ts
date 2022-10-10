import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VaccinationCenterService } from '../services/vaccination-center.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  color: string = '';

  constructor(private service: VaccinationCenterService, public dialogRef: MatDialogRef<DeleteDialogComponent>, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      lastName: string,
      firstName: string
    }) { }

  ngOnInit(): void {
    this.getColor();
  }

  getColor() {
    this.color = this.service.getColorTheme();
  }

  onConfirmDelete() { } //TODO

}
