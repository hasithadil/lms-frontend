// src/types/subject.ts
export interface SubjectDTO {
  subId: number;
  subjectName: string;
  lecturerId?: number;
}

export interface CourseSummaryDTO {
  courseId: number;
  courseName: string;
}

export interface LecturerSubjectDTO {
    subId: number;
  subjectName: string;
}
