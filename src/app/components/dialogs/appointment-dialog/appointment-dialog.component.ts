import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AppointmentService } from "src/app/services/appointment.service";
import { DateService } from "src/app/services/date.service";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-appointment-dialog",
  templateUrl: "./appointment-dialog.component.html",
  styleUrls: [
    "../../common/css/dialog.scss",
    "./appointment-dialog.component.scss",
  ],
})
export class AppointmentDialogComponent implements OnInit {
  storeLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    protected authService: AuthService,
    protected dateService: DateService,
    protected appointmentService: AppointmentService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    protected data: {
      center_id: number;
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
      " " +
      date.getDate() +
      " " +
      this.dateService.getMonth(date.getMonth())
    );
  }

  registerAppointment() {
    this.storeLoading = true;
    this.appointmentService
      .registerAppointment(
        this.data.center_id,
        this.authService.user.id,
        this.data.date,
        this.data.time
      )
      .subscribe({
        next: (res) => {
          this.storeLoading = false;
          this.dialogRef.close(res);
          this._snackBar.open("Rendez-vous pris avec succès !", "", {
            duration: 2000,
          });
        },
        error: (err) => {
          console.log(err);
          this.storeLoading = false;
          this._snackBar.open("Une erreur s'est produite", "", {
            panelClass: "snackbar-error",
            duration: 2000,
          });
        },
      });
  }
}
