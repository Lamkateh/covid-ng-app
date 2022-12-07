import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserManagementDialogComponent } from '../dialogs/user-management-dialog/user-management-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.scss'],
})
export class ConfigurationPageComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'actions'
  ];
  superadmins?: User[] = [];
  nameSearchTerm: string = '';
  nameSearched: string = '';
  listLoading: boolean = false;
  role: Role = this.roleService.roles[0];

  constructor(private roleService: RoleService, private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSuperadmins();
  }

  getSuperadmins() {
    this.userService.getSuperadmins().subscribe({
      next: (data) => {
        this.superadmins = data.data;
      },
      error: (err) => { },
    });
  }

  getSuperadminsList() {
    if (!this.nameSearchTerm && this.superadmins.length > 0) {
      return this.superadmins;
    }
    return this.superadmins.filter((superadmin) => {
      return (
        superadmin.lastName !== null &&
        superadmin.lastName
          .toLowerCase()
          .includes(this.nameSearchTerm.toLowerCase())
      );
    });
  }

  onAddClick() {
    this.dialog.open(UserManagementDialogComponent, {
      width: '60%',
      data: {
        type: 'creation',
        roles: [this.role]
      },
    }).afterClosed().subscribe((response) => {
      if (response) {
        const newList = [...this.superadmins];
        newList.push(response.data);
        this.superadmins = newList;
      }
    });
  }

  onEditClick(superadmin: User) {
    this.dialog.open(UserManagementDialogComponent, {
      width: '60%',
      data: {
        type: 'update',
        roles: [this.role],
        user: superadmin
      }
    }).afterClosed().subscribe((userEdited) => {
      this.superadmins = this.superadmins.map((superadmin) => {
        if (superadmin.id === userEdited.id) {
          return userEdited;
        }
        return superadmin;
      });
    });
  }

  onDeleteClick(superadmin: User) {
    this.dialog.open(DeleteDialogComponent, {
      width: '50%',
      data: {
        user: superadmin
      },
      autoFocus: false
    }).afterClosed().subscribe((userEditedId) => {
      this.superadmins = this.superadmins.filter((superadmin) => {
        return superadmin.id !== userEditedId;
      });
    });
  }
}
