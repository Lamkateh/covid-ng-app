import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { VaccinationCenterService } from '../services/vaccination-center.service';
import { VaccinationCenter } from '../models/vaccination-center';

@Component({
  selector: 'app-centers-management-page',
  templateUrl: './centers-management-page.component.html',
  styleUrls: ['./centers-management-page.component.scss'],
})
export class CentersManagementPageComponent implements OnInit {
  centers?: VaccinationCenter[] = [];
  citySearchTerm: string = '';
  citySearched: string = '';
  listLoading: boolean = false;
  page: number = 0;
  color: string;

  onSearchCity() {
    this.citySearched = this.citySearchTerm;
    this.page = 0;
    this.getResult();
  }

  onMoreRequest() {
    this.page++;
    this.getResult();
  }

  getResult() {
    this.listLoading = true;
    if (this.page === 0) {
      this.centers = [];
    }
    if (this.citySearched === '') {
      this.vaccinationCenterService
        .getAllVaccinationCenters(this.page)
        .subscribe((centers: { content: VaccinationCenter[] }) => {
          this.centers.push(...centers.content);
          this.listLoading = false;
        });
    } else {
      this.vaccinationCenterService
        .getVaccinationCentersByCity(this.citySearched, this.page)
        .subscribe((centers: { content: VaccinationCenter[] }) => {
          this.centers.push(...centers.content);
          this.listLoading = false;
        });
    }
  }

  getColor() {
    this.color = this.authService.getColorTheme();
  }

  constructor(
    private authService: AuthService,
    private vaccinationCenterService: VaccinationCenterService
  ) {}

  ngOnInit(): void {
    this.getColor();
    this.getResult();
  }
}
