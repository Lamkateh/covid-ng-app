import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Center } from "../models/center";

@Injectable({
  providedIn: "root",
})
export class CenterService {
  constructor(private httpClient: HttpClient) { }

  getCenterById(
    id: number
  ): Observable<{ data: Center }> {
    return this.httpClient.get<{ data: Center }>(
      "/public/centers/" + id
    );
  }

  getCentersByCity(
    city: string,
    page: number = 0
  ): Observable<{ data: { content: Center[] } }> {
    // encode to base64 to base64-url
    city = btoa(city)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/\=+$/, "");
    return this.httpClient.get<{ data: { content: Center[] } }>(
      "/public/centers/city/" + city,
      {
        params: {
          page: page.toString(),
        },
      }
    );
  }

  getAllCenters(
    page: number = 0
  ): Observable<{ data: { content: Center[] } }> {
    return this.httpClient.get<{ data: { content: Center[] } }>(
      "/public/centers",
      {
        params: {
          page: page.toString(),
        },
      }
    );
  }

  getCentersByName(
    name: string
  ): Observable<{ data: { content: Center[] } }> {
    name = btoa(name)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/\=+$/, '');
    return this.httpClient.get<{ data: { content: Center[] } }>(
      '/public/centers/name/' + name,
      {
        params: {
          page: '1',
        },
      }
    );
  }

  storeCenter(
    center: Center
  ): Observable<any> {
    return this.httpClient.post('/private/centers', center);
  }

  updateCenter(
    center: Center
  ): Observable<any> {
    return this.httpClient.put('/private/centers/' + center.id, center);
  }

  deleteCenter(
    centerId: number
  ): Observable<any> {
    return this.httpClient.delete('/private/centers/' + centerId);
  }
}
