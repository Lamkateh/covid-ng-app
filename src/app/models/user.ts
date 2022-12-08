import { Center } from "./center";
import { Role } from "./role";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;
  phone: string;
  roles: Role[];
  password: string;
  center?: Center;
  centerId?: number;
  disabled: boolean;
}