import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { VaccinationCenter } from './vaccination-center';

@Component({
  selector: 'app-vaccination-center',
  templateUrl: './vaccination-center.component.html',
  styleUrls: ['./vaccination-center.component.scss']
})
export class VaccinationCenterComponent implements OnInit {

  center?: VaccinationCenter = {
    id: 1,
    name: "Hopital Central",
    address: "140 rue Saint Dizier",
    zipCode: "54000",
    city: "Nancy",
    phone: "0345567889",
    email: "hopitalcentral@gmail.com"
  };

  constructor() { }

  ngOnInit(): void {
  }

}
