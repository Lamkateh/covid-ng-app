import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppointmentService {
  constructor(private httpClient: HttpClient) {}

  registerAppointment(
    center_id: number,
    user_id: number,
    date: string,
    time: string
  ) {
    console.log(center_id, user_id, date, time);

    return this.httpClient.post(
      `/private/center/${center_id}/appointments`,
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
}
