import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vaccination-center-list-item',
  templateUrl: './vaccination-center-list-item.component.html',
  styleUrls: ['./vaccination-center-list-item.component.scss'],
})
export class VaccinationCenterListItemComponent implements OnInit {
  constructor(private router: Router) { }

  @Input() id: number;
  @Input() name: string = '';
  @Input() city: string = '';
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

  hasCity(): boolean {
    if (this.city) return true;
    else return false;
  }

  hasPhone(): boolean {
    if (this.phone) return true;
    else return false;
  }

  onEditClick() { }

  onAdminAndMedecinClick() { }

  ngOnInit(): void { }
}
