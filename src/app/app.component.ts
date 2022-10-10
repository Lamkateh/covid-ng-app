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
    this.authService
      .getUserInfo()
      .subscribe(
        (response: {
          id: number;
          name: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          birth_date: string;
          roles: string[];
          center: string | null;
        }) => {
          this.authService.setAuthUser({
            id: response.id,
            email: response.email,
            roles: response.roles,
            first_name: response.first_name,
            last_name: response.last_name,
            phone_number: response.phone,
            birth_date: response.birth_date,
            center: response.center,
          });
        }
      ),
      (error: any) => {
        console.log(error);
      };
  }
}
