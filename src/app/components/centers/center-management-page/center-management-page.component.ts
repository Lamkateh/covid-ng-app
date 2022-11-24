import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-center-management-page',
  templateUrl: './center-management-page.component.html',
  styleUrls: ['./center-management-page.component.scss'],
})
export class CenterManagementPageComponent implements OnInit {
  doctors?: User[];
  centerId: number;
  nameSearchTerm: string = '';
  nameSearched: string = '';
  listLoading: boolean = false;

  constructor(private authService: AuthService) {
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
