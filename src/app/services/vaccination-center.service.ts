import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentPreview } from '../models/appointment-preview';
import { VaccinationCenter } from '../models/vaccination-center';

@Injectable({
  providedIn: 'root',
})
export class VaccinationCenterService {
  constructor(private httpClient: HttpClient) { }

  getVaccinationCenterById(id: number): Observable<VaccinationCenter> {
    return this.httpClient.get<VaccinationCenter>('/public/centers/' + id);
  }

  getVaccinationCentersByCity(
    city: string,
    page: number = 0
  ): Observable<{ data: { content: VaccinationCenter[] } }> {
    // encode to base64 to base64-url
    city = btoa(city)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/\=+$/, '');
    return this.httpClient.get<{ data: { content: VaccinationCenter[] } }>(
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
  ): Observable<{ data: { content: VaccinationCenter[] } }> {
    return this.httpClient.get<{ data: { content: VaccinationCenter[] } }>(
      '/public/centers',
      {
        params: {
          page: page.toString(),
        },
      }
    );
  }

  getCentersByName(
    name: string
  ): Observable<any> {
    name = btoa(name)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/\=+$/, '');
    return this.httpClient.get<any>(
      '/public/centers/name/' + name
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
    }>('/public/center/' + id + '/appointments');
  }

  storeVaccinationCenter(
    center: VaccinationCenter
  ): Observable<any> {
    return this.httpClient.post('/private/centers', center);
  }

  updateVaccinationCenter(
    center: VaccinationCenter
  ): Observable<any> {
    return this.httpClient.put('/private/centers/' + center.id, center);
  }

  deleteVaccinationCenter(
    centerId: number
  ): Observable<any> {
    return this.httpClient.delete('/private/centers/' + centerId);
  }
}
