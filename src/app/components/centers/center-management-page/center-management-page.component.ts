import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-center-management-page',
  templateUrl: './center-management-page.component.html',
  styleUrls: ['./center-management-page.component.scss'],
})
export class CenterManagementPageComponent implements OnInit {
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
  centerId: number;
  nameSearchTerm: string = '';
  nameSearched: string = '';
  listLoading: boolean = false;
  color: string;

  constructor(private authService: AuthService) {
    this.color = this.authService.getColorTheme();
  }

  ngOnInit(): void {
    this.getResult();
  }

  getResult() { }

  isLoading() {
    if (this.listLoading) return true;
    else return false;
  }

  onSearchName() {
    this.nameSearched = this.nameSearchTerm;
    this.getResult();
  }
}
