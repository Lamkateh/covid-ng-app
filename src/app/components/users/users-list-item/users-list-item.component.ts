import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { DeleteDialogComponent } from '../../dialogs/delete-dialog/delete-dialog.component';
import { UserManagementDialogComponent } from '../../dialogs/user-management-dialog/user-management-dialog.component';

@Component({
  selector: 'app-users-list-item',
  templateUrl: './users-list-item.component.html',
  styleUrls: ['./users-list-item.component.scss']
})
export class UsersListItemComponent implements OnInit {

  @Input() user: User;
  @Input() role: Role;
  @Input() lastChild: boolean = false;
  @Output() userId: EventEmitter<number> = new EventEmitter<number>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  onEditClick() {
    this.dialog.open(UserManagementDialogComponent, {
      width: '60%',
      data: {
        type: 'update',
        role: this.role,
        user: this.user
      }
    }).afterClosed().subscribe((response) => {
      if (response) {
        this.user = response;
      }
    });
  }

  onDeleteClick() {
    this.dialog.open(DeleteDialogComponent, {
      width: '50%',
      data: {
        user: this.user
      },
      autoFocus: false
    }).afterClosed().subscribe((response) => {
      if (response) {
        this.userId.emit(response);
      }
    });
  }
}
