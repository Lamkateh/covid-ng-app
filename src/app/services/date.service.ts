import { Injectable } from '@angular/core';

const DAY_OF_WEEK = [
  {
    long: 'Lundi',
    short: 'Lun',
  },
  {
    long: 'Mardi',
    short: 'Mar',
  },
  {
    long: 'Mercredi',
    short: 'Mer',
  },
  {
    long: 'Jeudi',
    short: 'Jeu',
  },
  {
    long: 'Vendredi',
    short: 'Ven',
  },
  {
    long: 'Samedi',
    short: 'Sam',
  },
  {
    long: 'Dimanche',
    short: 'Dim',
  },
];

const MONTH = [
  {
    long: 'Janvier',
    short: 'Jan',
  },
  {
    long: 'Février',
    short: 'Fév',
  },
  {
    long: 'Mars',
    short: 'Mar',
  },
  {
    long: 'Avril',
    short: 'Avr',
  },
  {
    long: 'Mai',
    short: 'Mai',
  },
  {
    long: 'Juin',
    short: 'Juin',
  },
  {
    long: 'Juillet',
    short: 'Juil',
  },
  {
    long: 'Août',
    short: 'Août',
  },
  {
    long: 'Septembre',
    short: 'Sep',
  },
  {
    long: 'Octobre',
    short: 'Oct',
  },
  {
    long: 'Novembre',
    short: 'Nov',
  },
  {
    long: 'Décembre',
    short: 'Déc',
  },
];

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  getDayOfWeek(index: number, format: 'long' | 'short' = 'long'): string {
    index = (index + 7) % 7;
    return DAY_OF_WEEK[index][format];
  }

  getMonth(index: number, format: 'long' | 'short' = 'long'): string {
    index = (index + 12) % 12;
    return MONTH[index][format];
  }
}
