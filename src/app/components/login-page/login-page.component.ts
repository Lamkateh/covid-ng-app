import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
  emailAddressFC = new FormControl("", [Validators.required, Validators.email,]);
  passwordFC = new FormControl("", [Validators.required]);
  matcher = new MyErrorStateMatcher();
  loginLoading: boolean = false;
  errorMessage: string | null = null;
  hide: boolean = true;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void { }

  login() {
    if (
      this.emailAddressFC.invalid ||
      this.passwordFC.invalid ||
      this.emailAddressFC.value === "" ||
      this.passwordFC.value === "" ||
      this.emailAddressFC.value === null ||
      this.passwordFC.value === null
    ) {
      return;
    }
    this.loginLoading = true;
    this.errorMessage = null;
    this.authService.signin(this.emailAddressFC.value, this.passwordFC.value).subscribe({
      next: (response: any) => {
        this.authService.storeToken(this.emailAddressFC.value, this.passwordFC.value);
        this.authService.setAuthUser(response.data);
        this.loginLoading = false;
        this.router.navigate(["/centers"]);
      },
      error: (err: any) => {
        this.loginLoading = false;
        this.errorMessage = err.error.message;
        console.log(err);
      },
    });
  }
}
