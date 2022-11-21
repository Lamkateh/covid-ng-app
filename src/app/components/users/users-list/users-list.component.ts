import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { UserManagementDialogComponent } from '../../dialogs/user-management-dialog/user-management-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  @Input() list: User[] = [];
  @Input() role: string = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  onAddClick() {
    this.dialog.open(UserManagementDialogComponent, {
      width: '60%',
      data: {
        title: "Ajout d'un utilisateur",
      },
    });
  }
}
