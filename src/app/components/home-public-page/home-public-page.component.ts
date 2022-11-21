import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { VaccinationCenterService } from '../../services/vaccination-center.service';
import { VaccinationCenter } from '../../models/vaccination-center';

@Component({
  selector: 'app-home-public-page',
  templateUrl: './home-public-page.component.html',
  styleUrls: ['./home-public-page.component.scss'],
})
export class HomePublicPageComponent implements OnInit {
  centers?: VaccinationCenter[] = [];
  citySearchTerm: string = '';
  citySearched: string = '';
  listLoading: boolean = false;
  page: number = 0;
  lastPage: boolean = false;
  color: string;

  constructor(
    private vaccinationCenterService: VaccinationCenterService,
    private authService: AuthService
  ) {
    this.color = this.authService.getColorTheme();
  }

  ngOnInit(): void {
    this.getResult();
  }

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
        .subscribe(
          (centers: { content: VaccinationCenter[]; last: boolean }) => {
            this.centers.push(...centers.content);
            this.listLoading = false;
            this.lastPage = centers.last;
          }
        );
    } else {
      this.vaccinationCenterService
        .getVaccinationCentersByCity(this.citySearched, this.page)
        .subscribe(
          (centers: { content: VaccinationCenter[]; last: boolean }) => {
            this.centers.push(...centers.content);
            this.listLoading = false;
            this.lastPage = centers.last;
          }
        );
    }
  }

  isLoading() {
    if (this.listLoading) return true;
    else return false;
  }

  isNotLoading() {
    if (this.listLoading) return false;
    else return true;
  }
}