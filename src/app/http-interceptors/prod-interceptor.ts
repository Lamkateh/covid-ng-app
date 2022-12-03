import { Injectable } from "@angular/core";
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable()
export class ProdInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // filter public routes
    if (environment.production) {
      const url = new URL(environment.apiUrl + req.url).toString();
      const apiReq = req.clone({
        url: url,
      });
      return next.handle(apiReq);
    }
    return next.handle(req);
  }
}
