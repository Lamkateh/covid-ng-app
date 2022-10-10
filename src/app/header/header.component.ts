import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { VaccinationCenterService } from '../services/vaccination-center.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;
  color: string;
  id: number;

  getColor() {
    this.color = this.vaccinationCenterService.getColorTheme();
  }

  getId() {
    this.id = 10; //TODO
  }

  constructor(
    private vaccinationCenterService: VaccinationCenterService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getColor();
    this.getId();
  }
}
