import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'RDVaccination';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (response: {
        data: {
          id: number;
          name: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          birth_date: string;
          roles: string[];
          center: string | null;
        };
      }) => {
        this.authService.setAuthUser({
          id: response.data.id,
          email: response.data.email,
          roles: response.data.roles,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          phone_number: response.data.phone,
          birth_date: response.data.birth_date,
          center: response.data.center,
        });
      }
    ),
      (error: any) => {
        console.log(error);
      };
  }
}
