import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  firstNameFC = new FormControl("", [Validators.required]);
  lastNameFC = new FormControl("", [Validators.required]);
  emailAddressFC = new FormControl("", [Validators.required, Validators.email,]);
  phoneFC = new FormControl("", [Validators.required]);
  birthDateFC = new FormControl(null, [Validators.required]);
  passwordFC = new FormControl("", [Validators.required]);
  passwordConfirmationFC = new FormControl("", [Validators.required]);
  signupLoading: boolean = false;
  maxDate: Date;
  errorMessage: string;
  errorMessageSnackBar: string = "Une erreur s'est produite";

  constructor(private router: Router, private authService: AuthService, private _snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
  }

  formIsValid(): boolean {
    return (
      this.firstNameFC.valid &&
      this.lastNameFC.valid &&
      this.emailAddressFC.valid &&
      this.phoneFC.valid &&
      this.birthDateFC.valid &&
      this.passwordFC.valid &&
      this.passwordConfirmationFC.valid
    );
  }

  signup() {
    this.errorMessage = '';
    if (!this.formIsValid()) {
      return;
    }
    if (this.passwordFC.value !== this.passwordConfirmationFC.value) {
      this.errorMessage = "Les mots de passe ne correspondent pas";
      return;
    }
    this.signupLoading = true;
    this.errorMessage = null;
    let formattedBirthDate = this.birthDateFC.value.getFullYear() + "-" + String(this.birthDateFC.value.getMonth() + 1).padStart(2, '0') + "-" + String(this.birthDateFC.value.getDate()).padStart(2, '0');
    let user: User = {
      id: null,
      lastName: this.lastNameFC.value,
      firstName: this.firstNameFC.value,
      birthDate: formattedBirthDate,
      email: this.emailAddressFC.value,
      phone: this.phoneFC.value,
      password: this.passwordFC.value,
      roles: null,
      centerId: null,
      disabled: false,
    };
    this.authService.signup(user).subscribe({
      next: (response: any) => {
        this.signupLoading = false;
        this.router.navigate(["/login"]);
        this._snackBar.open("Votre compte a bien été créé", "", {
          duration: 2000,
        });
      },
      error: (err: any) => {
        this.signupLoading = false;
        console.log(err);
        if (err.error.message === "Error: Email is already taken!") {
          this.errorMessageSnackBar = "Cette adresse mail est déjà utilisée";
        }
        this._snackBar.open(this.errorMessageSnackBar, "", {
          "panelClass": "snackbar-error",
          duration: 2000,
        });
      },
    });
  }
}
