import axios from "axios";
import type { StudentResponseDTO } from "../types/student";
import type { EnrollmentDTO } from "../types/enrollment";
import type { CourseResponseDTO } from "../types/course";

const API = "http://localhost:8080/student";

export const getStudentDetails = (id: number) =>
  axios.get<StudentResponseDTO>(`${API}/${id}`);

export const getStudentEnrollments = (id: number) =>
  axios.get(`${API}/enroll/${id}`);

export const enrollCourse = (data: EnrollmentDTO) =>
  axios.post(`${API}/enroll`, data);

export const unenrollCourse = (studentId: number, courseId: number) =>
  axios.delete(`${API}/unenroll/${studentId}/${courseId}`);

export const getCourseDetails = (id: number) =>
  axios.get<CourseResponseDTO>(`${API}/course/${id}`);
