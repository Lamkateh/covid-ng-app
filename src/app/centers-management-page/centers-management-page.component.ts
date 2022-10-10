import { Component, OnInit } from '@angular/core';
import { VaccinationCenterService } from '../services/vaccination-center.service';
import { VaccinationCenter } from '../models/vaccination-center';
import { CenterManagementDialogComponent } from '../center-management-dialog/center-management-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-centers-management-page',
  templateUrl: './centers-management-page.component.html',
  styleUrls: ['./centers-management-page.component.scss']
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
      this.service
        .getAllVaccinationCenters(this.page)
        .subscribe((centers: { content: VaccinationCenter[] }) => {
          this.centers.push(...centers.content);
          this.listLoading = false;
        });
    } else {
      this.service
        .getVaccinationCentersByCity(this.citySearched, this.page)
        .subscribe((centers: { content: VaccinationCenter[] }) => {
          this.centers.push(...centers.content);
          this.listLoading = false;
        });
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

  getColor() {
    this.color = this.service.getColorTheme();
  }

  constructor(private service: VaccinationCenterService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getColor();
    this.getResult();
  }

  onNewCenter(): void {
    this.dialog.open(CenterManagementDialogComponent, {
      width: '60%',
      data: {
        isAddDialog: true,
        title: 'Ajout d\'un nouveau centre de vaccination'
      }
    });
  }
}