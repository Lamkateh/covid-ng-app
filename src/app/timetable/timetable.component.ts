import { Component, OnInit } from '@angular/core';

const COLUMN_WIDTH = 300;
const ROW_HEIGHT = 5;
const START_HOUR = '8:00';
const END_HOUR = '18:00';

const DAY_OF_WEEK = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
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
  }[] = [
    {
      date: '2021-05-01',
      list: [
        {
          time: '2021-05-01 10:00',
          available: true,
          duration: 30,
        },
        {
          time: '2021-05-01 10:30',
          available: false,
          duration: 30,
        },
      ],
    },
    {
      date: '2021-05-02',
      list: [
        {
          time: '2021-05-02 10:00',
          available: true,
          duration: 30,
        },
        {
          time: '2021-05-02 10:30',
          available: false,
          duration: 30,
        },
      ],
    },
    {
      date: '2021-05-03',
      list: [
        {
          time: '2021-05-03 10:00',
          available: true,
          duration: 30,
        },
        {
          time: '2021-05-03 10:30',
          available: false,
          duration: 30,
        },
      ],
    },
    {
      date: '2021-05-04',
      list: [
        {
          time: '2021-05-04 10:00',
          available: true,
          duration: 30,
        },
        {
          time: '2021-05-04 10:30',
          available: false,
          duration: 30,
        },
      ],
    },
  ];
  startHourTimestamp: number = new Date(
    '2020-01-01 ' + START_HOUR.trim()
  ).getTime();
  endHourTimestamp: number = new Date(
    '2020-01-01 ' + END_HOUR.trim()
  ).getTime();
  timetableHeight: string = `${Math.floor(
    ((this.endHourTimestamp - this.startHourTimestamp) / (1000 * 60)) *
      ROW_HEIGHT
  )}px`;

  constructor() {}

  ngOnInit(): void {
    console.log(this.getYLabel());
  }

  getAppointmentList() {
    this.appointments.forEach((day) => {
      const date = new Date(day.date);
      day.cleanDate =
        DAY_OF_WEEK[date.getDay().toString()] +
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
        appointment.width = `${COLUMN_WIDTH - 2}px`;
        appointment.height = `${
          Math.floor(appointment.duration / 5) * ROW_HEIGHT - 2
        }px`;
        appointment.top = `${
          Math.floor(
            (appointment.timestamp - day.startTimestamp) / (1000 * 60 * 5)
          ) * ROW_HEIGHT
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
}
