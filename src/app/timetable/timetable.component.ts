import { Component, Input, OnInit } from '@angular/core';
import { VaccinationCenterService } from '../services/vaccination-center.service';

const COLUMN_WIDTH = 300;
const ROW_HEIGHT = 10;
const START_HOUR = '8:00';
const END_HOUR = '18:00';

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
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements OnInit {
  @Input() centerId: number | null = null;
  translationX: number = 0;

  appointments: {
    date: string;
    cleanDate?: string;
    dateTimestamp?: number;
    startTimestamp?: number;
    list: {
      time: string;
      timestamp?: number;
      available: boolean;
      duration: number;
      width?: string;
      height?: string;
      top?: string;
    }[];
  }[] = [];
  startHourTimestamp: number = new Date(
    '2020-01-01 ' + START_HOUR.trim()
  ).getTime();
  endHourTimestamp: number = new Date(
    '2020-01-01 ' + END_HOUR.trim()
  ).getTime();
  timetableHeight: string = `${Math.floor(
    ((this.endHourTimestamp - this.startHourTimestamp) / (1000 * 60 * 5)) *
      ROW_HEIGHT +
      50 +
      10
  )}px`;

  constructor(private service: VaccinationCenterService) {}

  ngOnInit(): void {
    this.getAppointments();
  }

  // TODO : Review after fix in back-end
  getAppointments() {
    if (this.centerId) {
      this.service
        .getAppointmentsByCenterId(this.centerId)
        .subscribe((appointments) => {
          let result = [];
          appointments.forEach((appointment) => {
            if (result.find((day) => day.date === appointment.date)) {
              result
                .find((day) => day.date === appointment.date)
                .list.push({
                  time: appointment.date + ' ' + appointment.time,
                  available: true,
                  duration: 15,
                });
            } else {
              result.push({
                date: appointment.date,
                list: [
                  {
                    time: appointment.date + ' ' + appointment.time,
                    available: true,
                    duration: 15,
                  },
                ],
              });
            }
          });
          this.appointments = result;
        });
    }
  }

  getAppointmentList() {
    this.appointments.forEach((day) => {
      const date = new Date(day.date);
      day.cleanDate =
        DAY_OF_WEEK[date.getDay()] +
        ' ' +
        date.getDate().toString() +
        ' ' +
        MONTH[date.getMonth().toString()];
      day.dateTimestamp = new Date(day.date).getTime();
      day.startTimestamp = new Date(
        day.date + ' ' + START_HOUR.trim()
      ).getTime();
      day.list.forEach((appointment) => {
        appointment.timestamp = new Date(appointment.time).getTime();
        appointment.width = `${COLUMN_WIDTH - 4}px`;
        appointment.height = `${
          Math.floor(appointment.duration / 5) * ROW_HEIGHT - 4
        }px`;
        appointment.top = `${
          Math.floor(
            (appointment.timestamp - day.startTimestamp) / (1000 * 60 * 5)
          ) *
            ROW_HEIGHT +
          5
        }px`;
      });
    });

    return this.appointments;
  }

  getYLabel() {
    const yLabels = [];
    for (
      let i = this.startHourTimestamp;
      i <= this.endHourTimestamp;
      i += 1000 * 60 * 5
    ) {
      const date = new Date(i);
      yLabels.push(
        ('0' + date.getHours()).slice(-2) +
          ':' +
          ('0' + date.getMinutes()).slice(-2)
      );
    }
    return yLabels;
  }

  translateToRight() {
    if (this.canTranslateToRight()) {
      this.translationX -= COLUMN_WIDTH;
    }
  }

  canTranslateToRight() {
    const screenWidth = window.innerWidth;
    const timetableWidth = (this.appointments.length + 1) * COLUMN_WIDTH;
    return timetableWidth + this.translationX > screenWidth;
  }

  translateToLeft() {
    if (this.canTranslateToLeft()) {
      this.translationX += COLUMN_WIDTH;
    }
  }

  canTranslateToLeft() {
    return this.translationX < 0;
  }
}
