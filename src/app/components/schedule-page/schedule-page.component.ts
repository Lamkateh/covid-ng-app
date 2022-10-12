import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
})
export class SchedulePageComponent implements OnInit {
  color: string;

  constructor(private authService: AuthService) {
    this.color = this.authService.getColorTheme();
  }

  ngOnInit(): void {}
}
