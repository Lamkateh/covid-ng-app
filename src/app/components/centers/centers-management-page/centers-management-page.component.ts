import { Component, OnInit } from '@angular/core';
import { CenterService } from '../../../services/center.service';
import { Center } from '../../../models/center';
import { CenterManagementDialogComponent } from '../../dialogs/center-management-dialog/center-management-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-centers-management-page',
  templateUrl: './centers-management-page.component.html',
  styleUrls: ['./centers-management-page.component.scss'],
})
export class CentersManagementPageComponent implements OnInit {
  centers?: Center[] = [];
  citySearchTerm: string = '';
  citySearched: string = '';
  listLoading: boolean = false;
  page: number = 0;
  lastPage: boolean = false;

  constructor(
    private centerService: CenterService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getResult();
  }

  onNewCenter(): void {
    this.dialog.open(CenterManagementDialogComponent, {
      width: '60%',
      data: {
        type: "creation",
      },
    }).afterClosed().subscribe((result: Center) => {
      if (result) {
        this.getResult();
      }
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
      this.centerService
        .getAllCenters(this.page)
        .subscribe((centers: { data: { content: Center[]; last: boolean } }) => {
          this.centers.push(...centers.data.content);
          this.listLoading = false;
          this.lastPage = centers.data.last;
        });
    } else {
      this.centerService
        .getCentersByCity(this.citySearched, this.page)
        .subscribe((centers: { data: { content: Center[]; last: boolean } }) => {
          this.centers.push(...centers.data.content);
          this.listLoading = false;
          this.lastPage = centers.data.last;
        });
    }
  }
}
