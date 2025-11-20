// import axios from "axios";
// import type { LecturerDetails } from "../types/lecturerDetails";

// const API = "http://localhost:8080/lecturer";

// export const getLecturerDetails = (id: number) =>
//   axios.get<LecturerDetails>(`${API}/${id}`);

// export const createLecturerCourse = (data: {
//   name: string;
//   maxStudent: number;
//   lecturerId: number;
// }) => {
//   return axios.post(`http://localhost:8080/lecturer/courses`, data);
// };

// export const updateLecturerCourse = (courseId: number, payload: any) =>
//   axios.put(`${API}/course/${courseId}`, payload);

// // Lecturer deletes a course (admin endpoint)
// export const deleteLecturerCourse = (courseId: number) =>
//   axios.delete(`${API}/course/${courseId}`);

// export const getAllSubjects = () =>
//   axios.get(`${API}/subjects`);

// export const deleteSubject = (subId: number) =>
//   axios.delete(`${API}/subject/${subId}`)

// // Create a subject as lecturer
// export const createSubject = (payload: { subjectName: string; lecturerId: number }) =>
//   axios.post(`${API}/subjects`, payload);

// // Get courses for a lecturer (to populate the dropdown)
// export const getLecturerCourses = (lecturerId: number) =>
//   axios.get(`${API}/${lecturerId}/courses`);

// // Assign subject to course (your controller method: POST /subjecttocourse)
// export const addSubjectToCourse = (payload: { courseId: number; subjectId: number }) =>
//   axios.post(`${API}/subjecttocourse`, { courseId: payload.courseId, subjectId: payload.subjectId });

// // Get subjects for a course (if needed)
// export const getSubjectsByCourse = (courseId: number) =>
//   axios.get(`${API}/${courseId}/subjects`);

// // Remove subject from course
// export const removeSubjectFromCourse = (courseId: number, subId: number) =>
//   axios.delete(`${API}/course/${courseId}/subject/${subId}`);

import apiClient from "./apiClient";  // ← CHANGED: Use apiClient
import type { LecturerDetails } from "../types/lecturerDetails";

// ============================================
// All these now automatically include JWT token!
// ============================================

export const getLecturerDetails = (id: number) =>
  apiClient.get<LecturerDetails>(`/lecturer/${id}`);

export const createLecturerCourse = (data: {
  name: string;
  maxStudent: number;
  lecturerId: number;
}) => {
  return apiClient.post(`/lecturer/courses`, data);
};

export const updateLecturerCourse = (courseId: number, payload: any) =>
  apiClient.put(`/lecturer/course/${courseId}`, payload);

export const deleteLecturerCourse = (courseId: number) =>
  apiClient.delete(`/lecturer/course/${courseId}`);

export const getAllSubjects = () =>
  apiClient.get(`/lecturer/subjects`);

export const deleteSubject = (subId: number) =>
  apiClient.delete(`/lecturer/subject/${subId}`)

export const createSubject = (payload: { subjectName: string; lecturerId: number }) =>
  apiClient.post(`/lecturer/subjects`, payload);

export const getLecturerCourses = (lecturerId: number) =>
  apiClient.get(`/lecturer/${lecturerId}/courses`);

export const addSubjectToCourse = (payload: { courseId: number; subjectId: number }) =>
  apiClient.post(`/lecturer/subjecttocourse`, { courseId: payload.courseId, subjectId: payload.subjectId });

export const getSubjectsByCourse = (courseId: number) =>
  apiClient.get(`/lecturer/${courseId}/subjects`);

export const removeSubjectFromCourse = (courseId: number, subId: number) =>
  apiClient.delete(`/lecturer/course/${courseId}/subject/${subId}`);