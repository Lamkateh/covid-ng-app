import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

const DAY_OF_WEEK = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const MONTH = [
  'Jan',
  'Fev',
  'Mar',
  'Avr',
  'Mai',
  'Juin',
  'Juil',
  'Aout',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

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
    @Inject(MAT_DIALOG_DATA)
    protected data: {
      date: string;
      time: string;
    }
  ) {}

  ngOnInit(): void {}

  getTime() {
    return this.data.time;
  }

  getDate() {
    const date = new Date(this.data.date);
    return (
      DAY_OF_WEEK[date.getDay()] +
      ' ' +
      date.getDate() +
      ' ' +
      MONTH[date.getMonth()]
    );
  }
}
