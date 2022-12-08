import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
