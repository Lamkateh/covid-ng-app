import { Component, Input, OnInit } from '@angular/core';
import { VaccinationCenterService } from '../services/vaccination-center.service';
import { VaccinationCenter } from '../vaccination-center/vaccination-center';

@Component({
  selector: 'app-vaccination-center-list',
  templateUrl: './vaccination-center-list.component.html',
  styleUrls: ['./vaccination-center-list.component.scss'],
})
export class VaccinationCenterListComponent implements OnInit {
  centers?: VaccinationCenter[] = [];

  constructor() {}

  @Input() list: VaccinationCenter[] = [];

  ngOnInit(): void {}
}
