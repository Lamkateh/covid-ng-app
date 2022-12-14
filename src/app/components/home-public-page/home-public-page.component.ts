import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CenterService } from '../../services/center.service';
import { Center } from '../../models/center';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Subscription, timer } from 'rxjs';
import { QueueSnackbarComponent } from '../snackbar/queue-snackbar/queue-snackbar-component';

@Component({
  selector: 'app-home-public-page',
  templateUrl: './home-public-page.component.html',
  styleUrls: ['./home-public-page.component.scss'],
})
export class HomePublicPageComponent implements OnInit {
  centers?: Center[] = [];
  citySearchTerm: string = '';
  citySearched: string = '';
  listLoading: boolean = false;
  page: number = 0;
  lastPage: boolean = false;
  queueTimer: Subscription;
  counter: number = 0;
  queueSnackBar: MatSnackBarRef<any>;

  constructor(
    private centerService: CenterService,
    private _snackBar: MatSnackBar
  ) { }

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
    if (this.page === 0) {
      this.listLoading = true;
      this.centers = [];
    }
    if (this.citySearched === '') {
      this.centerService.getAllCenters(this.page).subscribe({
        next: (centers: { data: { content: Center[]; last: boolean } }) => {
          this.centers.push(...centers.data.content);
          this.listLoading = false;
          this.lastPage = centers.data.last;
        },
        error: (err) => {
          if (err.status === 429) {
            this.counter = 60;
            this.queueSnackBar = this._snackBar.openFromComponent(
              QueueSnackbarComponent
            );
            this.queueTimer = timer(0, 1000).subscribe((count) => {
              this.queueSnackBar.instance.currentTime = this.counter;

              if (this.counter === 0) {
                if (this.queueTimer) {
                  this.getResult();
                  this.queueSnackBar.dismiss();
                  this.queueTimer.unsubscribe();
                }
              }
              --this.counter;
            });
          }
        },
      });
    } else {
      this.centerService
        .getCentersByCity(this.citySearched, this.page)
        .subscribe(
          (centers: { data: { content: Center[]; last: boolean } }) => {
            this.centers.push(...centers.data.content);
            this.listLoading = false;
            this.lastPage = centers.data.last;
          }
        );
    }
  }
}
