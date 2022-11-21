import { Injectable } from "@angular/core";
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { EMPTY } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // filter public routes
    if (req.url.startsWith("/public")) {
      return next.handle(req);
    }

    // Get the token from localstorage
    const token = localStorage.getItem("rdvaccination-token") ?? null;
    if (token) {
      const authToken = "Basic " + token;

      const authReq = req.clone({
        headers: req.headers.set("Authorization", authToken),
      });

      return next.handle(authReq);
    }
    return EMPTY;
    //return next.handle(req);
  }
}
