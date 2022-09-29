import { Component, OnInit } from '@angular/core';
import { VaccinationCenter } from '../vaccination-center/vaccination-center';

@Component({
  selector: 'app-vaccination-center-list',
  templateUrl: './vaccination-center-list.component.html',
  styleUrls: ['./vaccination-center-list.component.scss']
})
export class VaccinationCenterListComponent implements OnInit {

  centers?: VaccinationCenter[] = [{
    id: 1,
    name: "Hopital Central",
    address: "140 rue Saint Dizier",
    zipCode: "54000",
    city: "Nancy",
    phone: "0345567889",
    email: "hopitalcentral@gmail.com"
  }, {
    id: 2,
    name: "Hopital Nord",
    address: "140 rue de Metz",
    zipCode: "54000",
    city: "Nancy",
    phone: "0345567889",
    email: "hopitalnord@gmail.com"
  }, {
    id: 3,
    name: "Hopital Ouest",
    address: "140 rue Jeanne d'Arc",
    zipCode: "54000",
    city: "Nancy",
    phone: "0345567889",
    email: "hopitalouest@gmail.com"
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
