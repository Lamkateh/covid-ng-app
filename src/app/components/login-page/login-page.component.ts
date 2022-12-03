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
  hide: boolean = true;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void { }

  login() {
    this.authService.signin(this.emailAddress, this.password).subscribe({
      next: (response: any) => {
        this.authService.storeToken(this.emailAddress, this.password);
        this.authService.setAuthUser(response.data);
        this.router.navigate(["/centers"]);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
