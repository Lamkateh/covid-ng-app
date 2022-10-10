import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss'],
})
export class AppointmentDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AppointmentDialogComponent>) {}

  ngOnInit(): void {}
}
