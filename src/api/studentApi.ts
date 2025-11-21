import apiClient from "./apiClient";  // ← CHANGED: Use apiClient instead of axios
import type { StudentResponseDTO } from "../types/student";
import type { EnrollmentDTO } from "../types/enrollment";
import type { CourseResponseDTO } from "../types/course";

// ============================================
// All these now automatically include JWT token!
// ============================================

export const getStudentDetails = (id: number) =>
  apiClient.get<StudentResponseDTO>(`/student/${id}`);

export const getStudentEnrollments = (id: number) =>
  apiClient.get(`/student/enroll/${id}`);

export const enrollCourse = (data: EnrollmentDTO) =>
  apiClient.post(`/student/enroll`, data);

export const unenrollCourse = (studentId: number, courseId: number) =>
  apiClient.delete(`/student/unenroll/${studentId}/${courseId}`);

export const getCourseDetails = (id: number) =>
  apiClient.get<CourseResponseDTO>(`/student/course/${id}`);