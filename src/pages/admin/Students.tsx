import React, { useEffect, useState } from "react";
import type { Student } from "../../types/student";
import apiClient from "../../api/apiClient";
import type { StudentDetails } from "../../types/studentDetails";
import StudentModal from "../../components/StudentModel";
import axios from "axios";
import UpdateStudentModal from "../../components/UpdateStudentModel";
import ConfirmDialog from "../../components/ConfirmDialog";

function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentDetails | null>(null);
const [showModal, setShowModal] = useState(false);
const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [processing, setProcessing] = useState(false);


const handleRowClick = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:8080/admin/student/${id}`);
    setSelectedStudent(response.data);
    setShowModal(true);
  } catch (error: any) {
    console.error("Failed to load student details", error.response?.data || error.message);
  }
};

const handleEditClick = (s: Student) => {
    setEditingStudent(s);
  };

  const handleDeleteClick = (s: Student) => {
    setDeletingStudent(s);
  };

  const onCloseEdit = () => setEditingStudent(null);

  const onStudentUpdated = (updated: Student) => {
    setStudents(prev => prev.map(s => (s.s_id === updated.s_id ? updated : s)));
    setEditingStudent(null);
  };

  const confirmDelete = async () => {
    if (!deletingStudent) return;
    setProcessing(true);
    try {
      await apiClient.delete(`/admin/student/${deletingStudent.s_id}`);
      // remove from list
      setStudents(prev => prev.filter(s => s.s_id !== deletingStudent.s_id));
      setDeletingStudent(null);
    } catch (err: any) {
      alert(err.response?.data?.message || "Delete failed");
    } finally {
      setProcessing(false);
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
            <th>Action</th>
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
              <td>
                  {/* Show buttons only when ACTIVE */}
                  {s.status === "ACTIVE" ? (
                    <>
                      <button onClick={(e) =>{ 
                        e.stopPropagation();
                        handleEditClick(s)}}
                        style={{ marginRight: 8 }}>
                        Update
                      </button>

                      <button onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(s)}}>
                        Delete
                      </button>
                    </>
                  ) : (
                    <em>—</em>
                  )}
                </td>
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

     {/* Update modal */}
      {editingStudent && (
        <UpdateStudentModal
          student={editingStudent}
          onClose={onCloseEdit}
          onUpdated={onStudentUpdated}
        />
      )}

      {/* Confirm delete */}
      {deletingStudent && (
        <ConfirmDialog
          title="Confirm delete"
          description={`Are you sure you want to delete ${deletingStudent.firstName} ${deletingStudent.lastName}?`}
          isOpen={!!deletingStudent}
          onCancel={() => setDeletingStudent(null)}
          onConfirm={confirmDelete}
          loading={processing}
        />
      )}
    </div>
  );
}

export default Students;
