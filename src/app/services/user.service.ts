import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getDoctors(center_id: number): Observable<{ data: User[] }> {
    return this.httpClient.get<{ data: User[] }>(
      "/private/centers/" + center_id + "/doctors"
    );
  }

  getAdmins(center_id: number): Observable<{ data: User[] }> {
    return this.httpClient.get<{ data: User[] }>(
      "/private/centers/" + center_id + "/admins"
    );
  }
}
