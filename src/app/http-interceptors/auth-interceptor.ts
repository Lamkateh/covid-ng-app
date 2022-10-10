import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // TODO : filter private routes

    // Get the token from localstorage
    const token = localStorage.getItem('rdvaccination-token') ?? null;
    if (token) {
      const authToken = 'Basic ' + token;

      const authReq = req.clone({
        headers: req.headers.set('Authorization', authToken),
      });

      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
