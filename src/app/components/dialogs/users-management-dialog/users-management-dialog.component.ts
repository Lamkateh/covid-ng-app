import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CenterManagementDialogComponent } from '../center-management-dialog/center-management-dialog.component';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-users-management-dialog',
  templateUrl: './users-management-dialog.component.html',
  styleUrls: [
    '../../common/css/dialog.scss',
    './users-management-dialog.component.scss',
  ],
})
export class UsersManagementDialogComponent implements OnInit {
  doctors?: User[] = [
    {
      id: 1,
      firstName: 'Gaëtan',
      lastName: 'Nousse',
      email: 'gaetannousse@gmail.com',
      password: 'azerty',
      role: 'Médecin',
    },
    {
      id: 2,
      firstName: 'Bruno',
      lastName: 'Di Livio',
      email: 'brunodilivio@gmail.com',
      password: 'qwerty',
      role: 'Médecin',
    },
  ];
  admins?: User[] = [
    {
      id: 1,
      firstName: 'Gaëtan',
      lastName: 'Nousse',
      email: 'gaetannousse@gmail.com',
      password: 'azerty',
      role: 'Médecin',
    },
    {
      id: 2,
      firstName: 'Bruno',
      lastName: 'Di Livio',
      email: 'brunodilivio@gmail.com',
      password: 'qwerty',
      role: 'Médecin',
    },
    {
      id: 2,
      firstName: 'Bruno',
      lastName: 'Di Livio',
      email: 'brunodilivio@gmail.com',
      password: 'qwerty',
      role: 'Médecin',
    },
    {
      id: 2,
      firstName: 'Bruno',
      lastName: 'Di Livio',
      email: 'brunodilivio@gmail.com',
      password: 'qwerty',
      role: 'Médecin',
    },
    {
      id: 2,
      firstName: 'Bruno',
      lastName: 'Di Livio',
      email: 'brunodilivio@gmail.com',
      password: 'qwerty',
      role: 'Médecin',
    },
  ];
  centerId: number;
  nameSearchTerm: string = '';
  nameSearched: string = '';
  //listLoading: boolean = false;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<CenterManagementDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      centerId: number;
    }
  ) {
  }

  ngOnInit(): void {
    this.getResult();
  }

  getResult() { }

  /*isLoading() {
    if (this.listLoading) return true;
    else return false;
  }*/

  onSearchName() {
    this.nameSearched = this.nameSearchTerm;
    this.getResult();
  }
}
