import { Component, Input, OnInit } from '@angular/core';
import { Center } from '../../../models/center';

@Component({
  selector: 'app-centers-list',
  templateUrl: './centers-list.component.html',
  styleUrls: ['./centers-list.component.scss'],
})
export class CentersListComponent implements OnInit {
  @Input() list: Center[] = [];

  constructor() { }

  ngOnInit(): void { }

  deleteCenter(centerId: number) {
    this.list = this.list.filter((center) => center.id !== centerId);
  }
}
