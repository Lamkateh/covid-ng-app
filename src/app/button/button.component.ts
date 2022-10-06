import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VaccinationCenterService } from '../services/vaccination-center.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  onClick() {
    this.clickEvent.emit();
  }

  @Input() title: string;
  color: string;
  @Output() clickEvent = new EventEmitter();

  constructor(private service: VaccinationCenterService) { }

  getColor() {
    this.color = this.service.getColorTheme();
  }

  ngOnInit(): void {
    this.getColor();
  }
}
