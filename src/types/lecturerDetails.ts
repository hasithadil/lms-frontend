
export interface CourseSummary {
  courseId: number;
  name: string;
}

export interface SubjectSummary{
    subId: number;
    subjectName: string;
}

export interface LecturerDetails{
    lec_id: number;
        kc_id: string;
          email: string;
         name: string;
         status: string;
          courses: CourseSummary[];
          subjects: SubjectSummary[];
}