import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vaccination-center-list-item',
  templateUrl: './vaccination-center-list-item.component.html',
  styleUrls: ['./vaccination-center-list-item.component.scss'],
})
export class VaccinationCenterListItemComponent implements OnInit {
  constructor(private router: Router) {}

  @Input() id: number;
  @Input() name: string = '';
  @Input() city: string = '';
  @Input() lastChild: boolean = false;

  onAppointementClick() {
    console.log('Appointement clicked');
    // navigate to appointement page
    this.router.navigateByUrl('/centers/' + this.id);
  }

  ngOnInit(): void {}
}