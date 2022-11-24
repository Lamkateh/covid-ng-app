import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VaccinationCenter } from 'src/app/models/vaccination-center';
import { CenterManagementDialogComponent } from '../../dialogs/center-management-dialog/center-management-dialog.component';
import { UsersManagementDialogComponent } from '../../dialogs/users-management-dialog/users-management-dialog.component';

@Component({
  selector: 'app-vaccination-center-list-item',
  templateUrl: './vaccination-center-list-item.component.html',
  styleUrls: ['./vaccination-center-list-item.component.scss'],
})
export class VaccinationCenterListItemComponent implements OnInit {
  constructor(private router: Router, public dialog: MatDialog) { }

  @Input() id: number;
  @Input() name: string = '';
  @Input() zipCode: string = '';
  @Input() city: string = '';
  @Input() address: string = '';
  @Input() phone: string = '';
  @Input() lastChild: boolean = false;

  onAppointementClick() {
    // navigate to appointement page
    this.router.navigateByUrl('/centers/' + this.id);
  }

  isHomePage(): boolean {
    if (this.router.url == "/centers") return true;
    else return false;
  }

  isManagementCentersPage(): boolean {
    if (this.router.url == "/management/centers") return true;
    else return false;
  }

  onEditClick() {
    let center: VaccinationCenter = {
      id: this.id,
      name: this.name,
      address: this.address,
      zipCode: this.zipCode,
      city: this.city,
      phone: this.phone,
      email: ''
    };

    this.dialog.open(CenterManagementDialogComponent, {
      width: '60%',
      data: {
        type: "update",
        center: center,
      }
    }).afterClosed().subscribe((result: VaccinationCenter) => {
      if (result) {
        this.name = result.name;
        this.address = result.address;
        this.zipCode = result.zipCode;
        this.city = result.city;
        this.phone = result.phone;
      }
    });
  }

  onAdminAndMedecinClick() {
    this.dialog.open(UsersManagementDialogComponent, {
      width: '80%',
      height: '80%',
      data: {
        title: 'Gestion des admins et médecins du centre',
        centerId: this.id
      },
      autoFocus: false
    });
  }

  ngOnInit(): void { }
}
