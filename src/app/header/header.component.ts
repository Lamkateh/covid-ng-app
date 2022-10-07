import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VaccinationCenterService } from '../services/vaccination-center.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title!: string;
  color: string;
  id: number;

  getColor() {
    this.color = this.service.getColorTheme();
  }

  getId() {
    this.id = 10; //TODO
  }

  constructor(private service: VaccinationCenterService) { }

  ngOnInit(): void {
    this.getColor();
    this.getId();
  }

}
