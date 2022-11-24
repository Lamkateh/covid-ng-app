import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VaccinationCenterService } from '../../services/vaccination-center.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.scss'],
})
export class ConfigurationPageComponent implements OnInit {
  superadmins?: User[];
  nameSearchTerm: string = '';
  nameSearched: string = '';
  listLoading: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getResult();
  }

  getResult() { }

  isLoading() {
    if (this.listLoading) return true;
    else return false;
  }

  onSearchName() {
    this.nameSearched = this.nameSearchTerm;
    this.getResult();
  }
}
