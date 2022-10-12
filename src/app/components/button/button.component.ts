import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService) {}

  getColor() {
    this.color = this.authService.getColorTheme();
  }

  ngOnInit(): void {
    this.getColor();
  }
}
