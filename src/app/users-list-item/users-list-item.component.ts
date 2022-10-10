import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list-item',
  templateUrl: './users-list-item.component.html',
  styleUrls: ['./users-list-item.component.scss']
})
export class UsersListItemComponent implements OnInit {

  @Input() id: number;
  @Input() lastName: string = '';
  @Input() firstName: string = '';
  @Input() email: string = '';
  @Input() password: string = '';
  @Input() role: string = '';
  @Input() lastChild: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  onEditClick() { }

  onDeleteClick() { }

}
