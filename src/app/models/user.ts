import { Role } from "./role";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;
  role: Role;
  password: string;
  center?: number;
  disabled: boolean;
}