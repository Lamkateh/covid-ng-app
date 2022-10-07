import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VaccinationCenterService } from '../services/vaccination-center.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  @Input() emailAddress?: string;
  @Input() password?: string;
  color: string;

  constructor(private router: Router, private service: VaccinationCenterService) { }

  ngOnInit(): void {
    this.getColor();
  }

  getColor() {
    this.color = this.service.getColorTheme();
  }

  login() {
    this.router.navigateByUrl('/centers');
  }

}
