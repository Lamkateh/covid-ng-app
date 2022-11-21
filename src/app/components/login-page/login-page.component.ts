import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
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
    this.authService.signin(this.emailAddress, this.password).subscribe({
      next: (response: any) => {
        console.log(response);
        this.authService.storeToken(this.emailAddress, this.password);
        this.authService.setAuthUser({
          id: response.data.id,
          first_name: response.data.firstName,
          last_name: response.data.lastName,
          email: response.data.email,
          birth_date: response.data.birth_date,
          phone_number: response.data.phone_number,
          center: response.data.center,
          roles: response.data.roles,
        });
        this.router.navigate(["/centers"]);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
