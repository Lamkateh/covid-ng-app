import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { VaccinationCenterService } from '../../../services/vaccination-center.service';
import { VaccinationCenter } from '../../../models/vaccination-center';
import { CenterManagementDialogComponent } from '../../dialogs/center-management-dialog/center-management-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(
    private vaccinationCenterService: VaccinationCenterService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {
    this.color = this.authService.getColorTheme();
  }

  ngOnInit(): void {
    this.getResult();
  }

  onNewCenter(): void {
    this.dialog.open(CenterManagementDialogComponent, {
      width: '60%',
      data: {
        isAddDialog: true,
        title: "Ajout d'un nouveau centre de vaccination",
      },
    });
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
        .subscribe((centers: { data: { content: VaccinationCenter[] } }) => {
          this.centers.push(...centers.data.content);
          this.listLoading = false;
        });
    } else {
      this.vaccinationCenterService
        .getVaccinationCentersByCity(this.citySearched, this.page)
        .subscribe((centers: { data: { content: VaccinationCenter[] } }) => {
          this.centers.push(...centers.data.content);
          this.listLoading = false;
        });
    }
  }
}
