import axios from "axios";
import type { LecturerDetails } from "../types/lecturerDetails";

const API = "http://localhost:8080/lecturer";

export const getLecturerDetails = (id: number) =>
  axios.get<LecturerDetails>(`${API}/${id}`);

export const createLecturerCourse = (data: {
  name: string;
  maxStudent: number;
  lecturerId: number;
}) => {
  return axios.post(`http://localhost:8080/lecturer/courses`, data);
};

export const updateLecturerCourse = (courseId: number, payload: any) =>
  axios.put(`${API}/course/${courseId}`, payload);

// Lecturer deletes a course (admin endpoint)
export const deleteLecturerCourse = (courseId: number) =>
  axios.delete(`${API}/course/${courseId}`);