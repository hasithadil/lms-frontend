export type StudentStatus = "ACTIVE" | "INACTIVE";

export interface Student {
  s_id: number;
  kc_id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: StudentStatus;
}