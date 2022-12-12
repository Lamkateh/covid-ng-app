import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { CenterService } from 'src/app/services/center.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DateService } from 'src/app/services/date.service';
import { ValidationAppointmentDialogComponent } from '../dialogs/validation-appointment-dialog/validation-appointment-dialog.component';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
})
export class SchedulePageComponent implements OnInit {
  displayedColumnsAdmin: string[] = [
    'time',
    'name',
    'email',
    'phone',
    'doctor',
    'action',
  ];
  displayedColumnsDoctor: string[] = [
    'time',
    'name',
    'email',
    'phone',
    'action',
  ];
  appointments?: Appointment[] | {}[] = [{}];
  allAppointments?: Appointment[];
  nameSearchTerm: string = '';
  nameSearched: string = '';
  centerId: number;
  date: Date = new Date();
  listLoading: boolean = false;
  user: User | null = null;

  constructor(
    protected authService: AuthService,
    private appointmentService: AppointmentService,
    private dateService: DateService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.centerId = this.authService.user?.center.id;
    const user = this.authService.getStoredUserInformation();
    if (user) {
      this.user = user;
      console.log('user', user);

      this.getAppointments();
    }
  }

  getAppointments() {
    this.listLoading = true;
    if (this.user.roles.toString().includes('DOCTOR')) {
      this.appointmentService
        .getAppointmentsByDoctorId(this.user?.id)
        .subscribe({
          next: (data) => {
            this.allAppointments = data.data;
            this.appointments = this.allAppointments
              .filter((appointment: Appointment) => {
                return (
                  new Date(appointment.date).toLocaleDateString() ===
                  this.date.toLocaleDateString()
                );
              })
              .sort(
                (a, b) =>
                  Number('' + a.time[0] + a.time[1]) -
                  Number('' + b.time[0] + b.time[1])
              );
            this.listLoading = false;
          },
          error: (err) => {
            this.listLoading = false;
            console.log(err);
          },
        });
    } else if (this.user.roles.toString() === 'ADMIN') {
      this.appointmentService
        .getAppointmentsByAdminId(this.user?.id)
        .subscribe({
          next: (data) => {
            this.allAppointments = data.data;
            this.appointments = this.allAppointments
              .filter((appointment: Appointment) => {
                return (
                  new Date(appointment.date).toLocaleDateString() ===
                  this.date.toLocaleDateString()
                );
              })
              .sort(
                (a, b) =>
                  Number('' + a.time[0] + a.time[1]) -
                  Number('' + b.time[0] + b.time[1])
              );
            this.listLoading = false;
          },
          error: (err) => {
            this.listLoading = false;
            console.log(err);
          },
        });
    }
  }

  getAppointmentsList() {
    if (!this.nameSearchTerm && this.appointments.length > 0) {
      return this.appointments;
    }
    return this.appointments.filter((appointment: Appointment) => {
      return (
        appointment.patient.lastName !== null &&
        appointment.patient.lastName
          .toLowerCase()
          .includes(this.nameSearchTerm.toLowerCase())
      );
    });
  }

  getDate() {
    const date = this.date; //TODO
    return (
      this.dateService.getDayOfWeek(date.getDay() - 1) +
      ' ' +
      date.getDate() +
      ' ' +
      this.dateService.getMonth(date.getMonth())
    );
  }

  onNextDay() {
    this.date.setDate(this.date.getDate() + 1);
    this.appointments = this.allAppointments
      .filter((appointment: Appointment) => {
        return (
          new Date(appointment.date).toLocaleDateString() ===
          this.date.toLocaleDateString()
        );
      })
      .sort(
        (a, b) =>
          Number('' + a.time[0] + a.time[1]) -
          Number('' + b.time[0] + b.time[1])
      );
  }

  onPreviousDay() {
    this.date.setDate(this.date.getDate() - 1);
    this.appointments = this.allAppointments
      .filter((appointment: Appointment) => {
        return (
          new Date(appointment.date).toLocaleDateString() ===
          this.date.toLocaleDateString()
        );
      })
      .sort(
        (a, b) =>
          Number('' + a.time[0] + a.time[1]) -
          Number('' + b.time[0] + b.time[1])
      );
  }

  onValidate(appointment: Appointment) {
    this.dialog
      .open(ValidationAppointmentDialogComponent, {
        width: '50%',
        data: {
          appointment: appointment,
        },
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((appointmentId: number) => {
        if (appointmentId) {
          this.appointments = this.appointments.map((appointment) => {
            if (appointment.id === appointmentId) {
              appointment.isDone = true;
            }
            return appointment;
          });
        }
      });
  }
}
