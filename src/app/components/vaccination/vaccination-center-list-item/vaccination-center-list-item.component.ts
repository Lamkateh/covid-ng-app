import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VaccinationCenter } from 'src/app/models/vaccination-center';
import { CenterManagementDialogComponent } from '../../dialogs/center-management-dialog/center-management-dialog.component';
import { UsersManagementDialogComponent } from '../../dialogs/users-management-dialog/users-management-dialog.component';

@Component({
  selector: "app-vaccination-center-list-item",
  templateUrl: "./vaccination-center-list-item.component.html",
  styleUrls: ["./vaccination-center-list-item.component.scss"],
})
export class VaccinationCenterListItemComponent implements OnInit {

  @Input() center: VaccinationCenter;
  @Input() lastChild: boolean = false;
  @Input() available_appointments?: boolean;
  isHomePage: boolean;

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.router.url == "/centers") this.isHomePage = true;
    else this.isHomePage = false;
  }

  onAppointementClick() {
    this.router.navigateByUrl('/centers/' + this.center.id);
  }

  onEditClick() {
    this.dialog.open(CenterManagementDialogComponent, {
      width: "60%",
      data: {
        type: "update",
        center: this.center,
      }
    }).afterClosed().subscribe((result: VaccinationCenter) => {
      if (result) {
        this.center.name = result.name;
        this.center.address = result.address;
        this.center.zipCode = result.zipCode;
        this.center.city = result.city;
        this.center.phone = result.phone;
      }
    });
  }

  onAdminAndMedecinClick() {
    this.dialog.open(UsersManagementDialogComponent, {
      width: "80%",
      height: "80%",
      data: {
        center: this.center
      },
      autoFocus: false
    });
  }
}
