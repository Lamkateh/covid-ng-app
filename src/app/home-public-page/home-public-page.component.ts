import { Component, OnInit } from '@angular/core';
import { VaccinationCenterService } from '../services/vaccination-center.service';
import { VaccinationCenter } from '../vaccination-center/vaccination-center';

@Component({
  selector: 'app-home-public-page',
  templateUrl: './home-public-page.component.html',
  styleUrls: ['./home-public-page.component.scss'],
})
export class HomePublicPageComponent implements OnInit {
  centers?: VaccinationCenter[] = [];
  citySearchTerm: string = '';
  listLoading: boolean = false;

  onSearchCity() {
    this.listLoading = true;
    this.service
      .getVaccinationCentersByCity(this.citySearchTerm)
      .subscribe((centers: { content: VaccinationCenter[] }) => {
        this.centers = centers.content;
        this.listLoading = false;
      });
  }

  constructor(private service: VaccinationCenterService) {}

  ngOnInit(): void {
    this.listLoading = true;
    this.service
      .getAllVaccinationCenters()
      .subscribe((centers: { content: VaccinationCenter[] }) => {
        this.centers = centers.content;
        this.listLoading = false;
      });
  }
}
