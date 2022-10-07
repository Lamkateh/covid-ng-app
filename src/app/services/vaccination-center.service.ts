import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppointmentPreview } from "../appointment-preview/appointment-preview";
import { VaccinationCenter } from "../vaccination-center/vaccination-center";

@Injectable({
  providedIn: "root",
})
export class VaccinationCenterService {
  constructor(private httpClient: HttpClient) {}

  user_role: string = "PATIENT";

  getColorTheme() {
    if (this.user_role == "SUPERADMIN") return "#DE0F0F"; //TODO with roles
    else return "#2B51D2";
  }

  getVaccinationCenterById(id: number): Observable<VaccinationCenter> {
    return this.httpClient.get<VaccinationCenter>("/public/center/" + id);
  }

  getVaccinationCentersByCity(
    city: string,
    page: number = 0
  ): Observable<{ content: VaccinationCenter[] }> {
    return this.httpClient.get<{ content: VaccinationCenter[] }>(
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
  ): Observable<{ content: VaccinationCenter[] }> {
    return this.httpClient.get<{ content: VaccinationCenter[] }>(
      "/public/centers",
      {
        params: {
          page: page.toString(),
        },
      }
    );
  }

  getAppointmentsByCenterId(id: number): Observable<{
    days: {
      date: string;
      appointments: AppointmentPreview[];
    }[];
    startTime: string;
    closeTime: string;
  }> {
    return this.httpClient.get<{
      days: {
        date: string;
        appointments: AppointmentPreview[];
      }[];
      startTime: string;
      closeTime: string;
    }>("/public/center/" + id + "/appointments");
  }
}
