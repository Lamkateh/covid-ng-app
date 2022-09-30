import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VaccinationCenter } from '../vaccination-center/vaccination-center';

@Injectable({
  providedIn: 'root',
})
export class VaccinationCenterService {
  constructor(private httpClient: HttpClient) {}

  getVaccinationCentersByCity(city: string): Observable<VaccinationCenter[]> {
    return this.httpClient.get<VaccinationCenter[]>(
      '/public/centers/city/' + city
    );
  }
}
