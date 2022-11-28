import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppointmentPreview } from "../models/appointment-preview";
import { VaccinationCenter } from "../models/vaccination-center";

@Injectable({
  providedIn: "root",
})
export class VaccinationCenterService {
  constructor(private httpClient: HttpClient) {}

  getVaccinationCenterById(
    id: number
  ): Observable<{ data: VaccinationCenter }> {
    return this.httpClient.get<{ data: VaccinationCenter }>(
      "/public/centers/" + id
    );
  }

  getVaccinationCentersByCity(
    city: string,
    page: number = 0
  ): Observable<{ data: { content: VaccinationCenter[] } }> {
    // encode to base64 to base64-url
    city = btoa(city)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/\=+$/, "");
    return this.httpClient.get<{ data: { content: VaccinationCenter[] } }>(
      "/public/centers/city/" + city,
      {
        params: {
          page: page.toString(),
        },
      }
    );
  }

  getAllVaccinationCenters(
    page: number = 0
  ): Observable<{ data: { content: VaccinationCenter[] } }> {
    return this.httpClient.get<{ data: { content: VaccinationCenter[] } }>(
      "/public/centers",
      {
        params: {
          page: page.toString(),
        },
      }
    );
  }

  getAppointmentsByCenterId(id: number): Observable<{
    data: {
      days: {
        date: string;
        appointments: AppointmentPreview[];
      }[];
      startTime: string;
      closeTime: string;
    };
  }> {
    return this.httpClient.get<{
      data: {
        days: {
          date: string;
          appointments: AppointmentPreview[];
        }[];
        startTime: string;
        closeTime: string;
      };
    }>("/public/centers/" + id + "/appointments");
  }

  getAllDoctorsFromCenter(id: number) {
    //TODO
  }

  getDoctorsFromCenterByName(id: number, name: string) {
    //TODO
  }
}
