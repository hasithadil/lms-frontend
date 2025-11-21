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