import { User } from "./user";

export interface Appointment {
  id: number;
  date: string;
  time: string;
  isDone: boolean;
  patient: User;
}