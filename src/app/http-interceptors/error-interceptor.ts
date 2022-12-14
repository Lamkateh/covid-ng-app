import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  errorMessage: string = "Une erreur s'est produite";

  constructor(private _snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.startsWith("/private")) {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 412) {
            this._snackBar.open("Accès refusé.", 'Rafraîchir', {
              panelClass: 'error-snackbar',
              duration: 5000,
            }).afterDismissed().subscribe(() => {
              window.location.reload();
            });
          } else {
            if (error.error.message === "Error: Email is already taken!") {
              this.errorMessage = "Cette adresse mail est déjà utilisée";
            }
            this._snackBar.open(this.errorMessage, '', {
              panelClass: 'error-snackbar',
              duration: 2000,
            });
          }
          return throwError(error);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
