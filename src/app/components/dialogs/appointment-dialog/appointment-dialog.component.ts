import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateService } from 'src/app/services/date.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: [
    '../common/css/dialog.scss',
    './appointment-dialog.component.scss',
  ],
})
export class AppointmentDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    protected authService: AuthService,
    protected dateService: DateService,
    @Inject(MAT_DIALOG_DATA)
    protected data: {
      date: string;
      time: string;
    }
  ) { }

  ngOnInit(): void { }

  getTime() {
    return this.data.time;
  }

  getDate() {
    const date = new Date(this.data.date);
    return (
      this.dateService.getDayOfWeek(date.getDay() - 1) +
      ' ' +
      date.getDate() +
      ' ' +
      this.dateService.getMonth(date.getMonth())
    );
  }
}
