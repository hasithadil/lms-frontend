export interface CourseDTO {
  courseId: number;
  name: string;
  maxStudent: number;
  lecturerId: number;
}

export interface SubjectResponseDTO {
  subjectId: number;
  subjectName: string;
}

export interface CourseResponseDTO {
  courseId: number;
  name: string;
  maxStudent: number;
  enrolledCount: number;
  availableSlots: number;
  lecturerName: string;
  subjects: SubjectResponseDTO[];
}
