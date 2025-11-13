export interface CourseSummary {
  courseId: number;
  courseName: string;
}

export interface StudentDetails {
  id: number;
  name: string;
  email: string;
  status: string;
  enrollments: CourseSummary[];
}
