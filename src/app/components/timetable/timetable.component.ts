import { Component, Input, OnInit } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { VaccinationCenterService } from '../../services/vaccination-center.service';

const COLUMN_WIDTH = 300;
const ROW_HEIGHT = 10;
const START_HOUR = '8:00';
const END_HOUR = '18:00';
const DURATION = 15;

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements OnInit {
  @Input() centerId: number | null = null;
  translationX: number = 0;

  timetable: {
    date: string;
    cleanDate?: string;
    dateTimestamp?: number;
    startTimestamp?: number;
    appointments: {
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

  constructor(
    private service: VaccinationCenterService,
    protected dateService: DateService
  ) {}

  ngOnInit(): void {
    this.getAppointments();
  }

  // TODO : Review after fix in back-end
  getAppointments() {
    if (this.centerId) {
      this.service
        .getAppointmentsByCenterId(this.centerId)
        .subscribe((timetable) => {
          console.log('ici');
          console.log(timetable);

          this.timetable = timetable.days.map((day) => {
            const date = new Date(day.date);
            const startTimestamp = new Date(
              day.date + ' ' + START_HOUR.trim()
            ).getTime();

            return {
              date: day.date,
              dateTimestamp: date.getTime(),

              cleanDate:
                this.dateService.getDayOfWeek(date.getDay(), 'short') +
                ' ' +
                date.getDate().toString() +
                ' ' +
                this.dateService.getMonth(date.getMonth(), 'short'),
              appointments: day.appointments.map((appointment) => {
                const date = new Date(day.date + ' ' + appointment.time);
                const timestamp = date.getTime();

                return {
                  time: appointment.time,
                  timestamp: timestamp,
                  width: `${COLUMN_WIDTH - 4}px`,
                  height: `${Math.floor(DURATION / 5) * ROW_HEIGHT - 4}px`,
                  top: `${
                    Math.floor((timestamp - startTimestamp) / (1000 * 60 * 5)) *
                      ROW_HEIGHT +
                    5
                  }px`,
                  available: true,
                  duration: 15,
                };
              }),
            };
          });

          this.startHourTimestamp = new Date(
            '2020-01-01 ' + timetable.startTime.trim() // dummy day
          ).getTime();
          this.endHourTimestamp = new Date(
            '2020-01-01 ' + timetable.closeTime.trim() // dummy day
          ).getTime();
        });
    }
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
    const timetableWidth = (this.timetable.length + 1) * COLUMN_WIDTH;
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
