import React, { useEffect, useState } from "react";
import type { Student } from "../../types/student";
import apiClient from "../../api/apiClient";
import type { StudentDetails } from "../../types/studentDetails";
import StudentModal from "../../components/StudentModel";
import axios from "axios";

function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentDetails | null>(null);
const [showModal, setShowModal] = useState(false);


const handleRowClick = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:8080/admin/student/${id}`);
    setSelectedStudent(response.data);
    setShowModal(true);
  } catch (error: any) {
    console.error("Failed to load student details", error.response?.data || error.message);
  }
};


  useEffect(() => {
    apiClient
      .get<Student[]>("/admin/students")
      .then((res) => setStudents(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch students")
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>All Students</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.s_id} onClick={() => handleRowClick(s.s_id)} style={{ cursor: "pointer" }}>
              <td>
                {s.firstName} {s.lastName}
              </td>
              <td>{s.email}</td>
              <td>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

       {showModal && (
      <StudentModal
        student={selectedStudent}
        onClose={() => setShowModal(false)}
      />
    )}
    </div>
  );
}

export default Students;
