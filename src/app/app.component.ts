import { Component } from '@angular/core';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'RDVaccination';

  constructor(protected authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (response: {
        data: User;
      }) => {
        this.authService.setAuthUser(response.data);
      }
    ),
      (error: any) => {
        console.log(error);
      };
  }
}
