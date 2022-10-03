import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  @Input() emailAddress?: string;
  @Input() password?: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigateByUrl('/centers');
  }

}
