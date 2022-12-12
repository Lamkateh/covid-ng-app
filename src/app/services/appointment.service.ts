import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Appointment } from "../models/appointment";
import { AppointmentPreview } from "../models/appointment-preview";

@Injectable({
  providedIn: "root",
})
export class AppointmentService {
  constructor(private httpClient: HttpClient) { }

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

  getAppointmentsByAdminId(id: number): Observable<{ data: Appointment[] }> {
    return this.httpClient.get<{ data: Appointment[] }>("/private/admins/" + id + "/appointments");
  }

  getAppointmentsByDoctorId(id: number): Observable<{ data: Appointment[] }> {
    return this.httpClient.get<{ data: Appointment[] }>("/private/doctors/" + id + "/appointments");
  }

  registerAppointment(
    center_id: number,
    user_id: number,
    date: string,
    time: string
  ) {
    return this.httpClient.post(
      `/private/centers/${center_id}/appointments`,
      {
        patient_id: user_id.toString(),
        date: date,
        time: time,
      },
      {
        headers: {
          "content-type": "application/json",
        },
        params: {
          patient_id: user_id.toString(),
          date: date,
          time: time,
        },
      }
    );
  }

  validateAppointment(id: number): Observable<any> {
    return this.httpClient.put<any>("/private/appointments/" + id, id);
  }
}
