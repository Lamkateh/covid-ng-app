import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { VaccinationCenterService } from '../services/vaccination-center.service';
import { User } from '../models/user';

@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.scss']
})
export class ConfigurationPageComponent implements OnInit {
  superadmins?: User[] = [{
    "id": 1,
    "firstName": "Gaëtan",
    "lastName": "Nousse",
    "email": "gaetannousse@gmail.com",
    "password": "azerty",
    "role": "Superadmin"
  },
  {
    "id": 2,
    "firstName": "Bruno",
    "lastName": "Di Livio",
    "email": "brunodilivio@gmail.com",
    "password": "qwerty",
    "role": "Superadmin"
  }];
  nameSearchTerm: string = '';
  nameSearched: string = '';
  listLoading: boolean = false;
  color: string;

  constructor(private service: VaccinationCenterService) { }

  ngOnInit(): void {
    this.getColor();
    this.getResult();
  }

  getResult() { }

  isLoading() {
    if (this.listLoading) return true;
    else return false;
  }

  getColor() {
    this.color = this.service.getColorTheme();
  }

  onSearchName() {
    this.nameSearched = this.nameSearchTerm;
    this.getResult();
  }
}
