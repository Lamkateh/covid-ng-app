import { VaccinationCenter } from "./vaccination-center";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  center?: VaccinationCenter;
}