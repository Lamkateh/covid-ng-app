import { Component, Input, OnInit } from '@angular/core';
import { Doctor } from './doctor';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input() list: Doctor[] = [];
  @Input() role: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddClick() { }

}
