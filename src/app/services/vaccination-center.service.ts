import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentPreview } from '../appointment-preview/appointment-preview';
import { VaccinationCenter } from '../vaccination-center/vaccination-center';

@Injectable({
  providedIn: 'root',
})
export class VaccinationCenterService {
  constructor(private httpClient: HttpClient) { }

  user_role: string;

  getColorTheme() {
    this.user_role = ""; //TODO

    if (this.user_role == "SUPERADMIN") return "#D24848";
    else if (this.user_role == "ADMIN") return "#E59C01";
    else if (this.user_role == "DOCTOR") return "#84B56C";
    else return "#3791D8";
  }

  getVaccinationCenterById(
    id: number
  ): Observable<VaccinationCenter> {
    return this.httpClient.get<VaccinationCenter>(
      '/public/center/' + id
    );
  }

  getVaccinationCentersByCity(
    city: string,
    page: number = 0
  ): Observable<{ content: VaccinationCenter[] }> {
    return this.httpClient.get<{ content: VaccinationCenter[] }>(
      '/public/centers/city/' + city,
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
      '/public/centers',
      {
        params: {
          page: page.toString(),
        },
      }
    );
  }

  getAppointmentsByCenterId(id: number): Observable<AppointmentPreview[]> {
    return this.httpClient.get<AppointmentPreview[]>(
      '/public/appointments/' + id
    );
  }
}
