import axios from "axios";
import type { LecturerDetails } from "../types/lecturerDetails";

const API = "http://localhost:8080/lecturer";

export const getLecturerDetails = (id: number) =>
  axios.get<LecturerDetails>(`${API}/${id}`);