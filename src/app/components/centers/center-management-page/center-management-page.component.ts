import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role';
import { Center } from 'src/app/models/center';
import { CenterService } from 'src/app/services/center.service';
import { UserService } from 'src/app/services/user.service';
import { DeleteDialogComponent } from '../../dialogs/delete-dialog/delete-dialog.component';
import { UserManagementDialogComponent } from '../../dialogs/user-management-dialog/user-management-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-center-management-page',
  templateUrl: './center-management-page.component.html',
  styleUrls: ['./center-management-page.component.scss'],
})
export class CenterManagementPageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];
  doctors?: User[] | {}[] = [{}];
  center: Center;
  nameSearchTerm: string = '';
  nameSearched: string = '';
  listLoading: boolean = false;
  role: Role = this.roleService.roles[2];
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private centerService: CenterService,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getStoredUserInformation();
    if (this.user && this.user.center) {
      this.getCenter();
      this.getDoctors();
    }
  }

  getCenter() {
    this.centerService
      .getCenterById(this.user.center.id)
      .subscribe((center: { data: Center }) => {
        this.center = center.data;
      });
  }

  getDoctors() {
    this.listLoading = true;
    this.userService.getDoctors(this.user.center.id).subscribe({
      next: (data) => {
        this.doctors = data.data.sort((a, b) => a.id - b.id);
        this.listLoading = false;
      },
      error: (err) => {
        this.listLoading = false;
        console.log(err);
      },
    });
  }

  getDoctorsList() {
    if (!this.nameSearchTerm && this.doctors.length > 0) {
      return this.doctors;
    }
    return this.doctors.filter((doctor: User) => {
      return (
        doctor.lastName !== null &&
        doctor.lastName
          .toLowerCase()
          .includes(this.nameSearchTerm.toLowerCase())
      );
    });
  }

  onAddClick() {
    this.dialog
      .open(UserManagementDialogComponent, {
        width: '60%',
        data: {
          type: 'creation',
          roles: [this.role],
          center: this.center,
        },
      })
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          const newList = [...this.doctors];
          newList.push(response.data);
          this.doctors = newList;
        }
      });
  }

  onEditClick(doctor: User) {
    this.dialog
      .open(UserManagementDialogComponent, {
        width: '60%',
        data: {
          type: 'update',
          roles: [this.role],
          user: doctor,
        },
      })
      .afterClosed()
      .subscribe((userEdited: User) => {
        this.doctors = this.doctors.map((doctor: User) => {
          if (doctor.id === userEdited.id) {
            return userEdited;
          }
          return doctor;
        });
      });
  }

  onDeleteClick(doctor: User) {
    this.dialog
      .open(DeleteDialogComponent, {
        width: '50%',
        data: {
          user: doctor,
        },
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((userEditedId: number) => {
        this.doctors = this.doctors.filter((doctor: User) => {
          return doctor.id !== userEditedId;
        });
      });
  }
}
