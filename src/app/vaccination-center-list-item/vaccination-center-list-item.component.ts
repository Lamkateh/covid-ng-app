import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vaccination-center-list-item',
  templateUrl: './vaccination-center-list-item.component.html',
  styleUrls: ['./vaccination-center-list-item.component.scss'],
})
export class VaccinationCenterListItemComponent implements OnInit {
  constructor() {}

  @Input() name: string = '';
  @Input() city: string = '';
  @Input() lastChild: boolean = false;

  ngOnInit(): void {}
}
