import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  @Input() emailAddress?: string;
  @Input() password?: string;
  color: string;

  constructor(private router: Router, private authService: AuthService) {
    this.color = this.authService.getColorTheme();
  }

  ngOnInit(): void {}

  login() {
    this.authService.signin(this.emailAddress, this.password).subscribe(
      (response: any) => {
        console.log(response);
        this.authService.storeToken(this.emailAddress, this.password);
        this.router.navigate(['/centers']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
