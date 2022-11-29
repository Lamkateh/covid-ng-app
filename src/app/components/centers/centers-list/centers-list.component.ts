import { Component, Input, OnInit } from '@angular/core';
import { Center } from '../../../models/center';

@Component({
  selector: 'app-centers-list',
  templateUrl: './centers-list.component.html',
  styleUrls: ['./centers-list.component.scss'],
})
export class CentersListComponent implements OnInit {
  centers?: Center[] = [];

  constructor() { }

  @Input() list: Center[] = [];

  ngOnInit(): void { }
}
