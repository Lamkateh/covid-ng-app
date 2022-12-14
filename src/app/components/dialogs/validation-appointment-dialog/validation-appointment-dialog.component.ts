import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';


@Component({
  selector: 'app-validation-appointment-dialog',
  templateUrl: './validation-appointment-dialog.component.html',
  styleUrls: [
    "../../common/css/dialog.scss",
    './validation-appointment-dialog.component.scss']
})
export class ValidationAppointmentDialogComponent implements OnInit {

  validateLoading: boolean = false;

  constructor(
    private appointmentService: AppointmentService,
    public dialogRef: MatDialogRef<ValidationAppointmentDialogComponent>,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      appointment?: Appointment;
    }
  ) {
  }

  ngOnInit(): void {
  }

  onConfirmValidate() {
    this.validateLoading = true;
    if (this.data.appointment) {
      this.appointmentService.validateAppointment(this.data.appointment.id).subscribe({
        next: () => {
          this.validateLoading = false;
          this.dialogRef.close(this.data.appointment.id);
          this._snackBar.open('Vaccination validée avec succès', '', {
            duration: 2000,
          });
        },
        error: (err) => {
          console.log(err);
          this.validateLoading = false;
          this.dialogRef.close();
        },
      });
    }
  }
}
