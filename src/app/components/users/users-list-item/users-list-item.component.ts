import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../dialogs/delete-dialog/delete-dialog.component';
import { UserManagementDialogComponent } from '../../dialogs/user-management-dialog/user-management-dialog.component';

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

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  onEditClick() {
    this.dialog.open(UserManagementDialogComponent, {
      width: '60%',
      data: {
        title: 'Modification d\'un ' + this.role,
        lastName: this.lastName,
        firstName: this.firstName,
        email: this.email,
        password: this.password,
        role: this.role
      }
    });
  }

  onDeleteClick() {
    this.dialog.open(DeleteDialogComponent, {
      width: '50%',
      data: {
        lastName: this.lastName,
        firstName: this.firstName
      },
      autoFocus: false
    });
  }

}
