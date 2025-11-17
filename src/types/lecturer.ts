export type LecturerStatus = "ACTIVE" | "INACTIVE";

export interface Lecturer{
    lec_id: number;
    kc_id: string;
      email: string;
      firstName: string;
      lastName: string;
      status: LecturerStatus;
}

export interface LecturerCourseDTO {
  courseId: number;
  name: string;
  maxStudent: number;
  lecturerId: number;
}
