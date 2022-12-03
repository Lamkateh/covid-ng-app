import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { UserManagementDialogComponent } from '../../dialogs/user-management-dialog/user-management-dialog.component';
import { Role } from 'src/app/models/role';
import { Center } from 'src/app/models/center';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  @Input() list: User[] = [];
  @Input() role: Role;
  @Input() center: Center;
  @Output() userEdited: EventEmitter<User> = new EventEmitter<User>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  onUserEdited(user: User) {
    this.userEdited.emit(user);
  }

  onUserDeleted(id: number) {
    this.list = this.list.filter((user) => user.id !== id);
  }

  onAddClick() {
    this.dialog.open(UserManagementDialogComponent, {
      width: '60%',
      data: {
        type: 'creation',
        role: this.role,
        center: this.center,
      },
    }).afterClosed().subscribe((response) => {
      if (response) {
        this.list.push(response.data);
      }
    });
  }
}
