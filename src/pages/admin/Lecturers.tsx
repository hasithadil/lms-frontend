import React, { useEffect, useState } from 'react'
import type { Lecturer } from '../../types/lecturer'
import apiClient from '../../api/apiClient';
import axios from 'axios';
import LecturerModel from '../../components/LecturerModel';
import ConfirmDialog from '../../components/ConfirmDialog';
import UpdateLecturerModel from '../../components/UpdateLecturerModel';

function Lecturers() {

    const[lecturers, setLecturers] = useState<Lecturer[]>([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState("")
     const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(
        null
      );
      const [showModal, setShowModal] = useState(false);
      const [editingLecturer, setEditingLecturer] = useState<Lecturer | null>(null);
      const [deletingLecturer, setDeletingLecturer] = useState<Lecturer | null>(null);
      const [processing, setProcessing] = useState(false);
    

    const handleRowClick = async (id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/admin/lecturer/${id}`
      );
      setSelectedLecturer(response.data);
      setShowModal(true);
    } catch (error: any) {
      console.error(
        "Failed to load student details",
        error.response?.data || error.message
      );
    }
  };

    const handleEditClick = (s: Lecturer) => {
      setEditingLecturer(s);
    };
  
    const handleDeleteClick = (s: Lecturer) => {
      setDeletingLecturer(s);
    };

      const confirmDelete = async () => {
    if (!deletingLecturer) return;
    setProcessing(true);
    try {
      await apiClient.delete(`/admin/lecturer/${deletingLecturer.lec_id}`);
      // remove from list
      setLecturers((prev) =>
        prev.filter((s) => s.lec_id !== deletingLecturer.lec_id)
      );
      setDeletingLecturer(null);
    } catch (err: any) {
      alert(err.response?.data?.message || "Delete failed");
    } finally {
      setProcessing(false);
    }
  };
  
    const onCloseEdit = () => setEditingLecturer(null);
  
    const onStudentUpdated = (updated: Lecturer) => {
      setLecturers((prev) =>
        prev.map((s) => (s.lec_id === updated.lec_id ? updated : s))
      );
      setEditingLecturer(null);
    };

    useEffect(()=> {
        apiClient.
            get<Lecturer[]>("/admin/lecturers")
            .then((res) => setLecturers(res.data))
            .catch((err) =>
                setError(err.response?.data?.message || "Failed to fetch lecturers")
            )
            .finally(() => setLoading(false))
    }, []);

    if(loading) return <p>Loading students...</p>
    if(error) return <p style={{color: "red"}}>{error}</p>

  return (
    <div>
      <h2>All Lecturers</h2>
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
            {lecturers.map((l) => (
                <tr 
                    key={l.lec_id}
                    onClick={() => handleRowClick(l.lec_id)}
              style={{ cursor: "pointer" }}
                    >
                    <td>
                        {l.firstName} {l.lastName}
                    </td>
                    <td>{l.email}</td>
                    <td>{l.status}</td>
                    <td>
                    {/* show action button only when active */}
                    {l.status === "ACTIVE" ? (
                        <>
                            <button
                                onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(l);
                      }}
                      style={{ marginRight: 8 }}
                            >Update</button>

                            <button
                               onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(l);
                      }} 
                            >Delete</button>
                        </>
                    ) : (
                        <em>-</em>
                    )}
                    </td>
                </tr>
            ))}
        </tbody>
      </table>

      {showModal && (
        <LecturerModel
          lecturer ={selectedLecturer}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Update modal */}
      {editingLecturer && (
        <UpdateLecturerModel
          lecturer={editingLecturer}
          onClose={onCloseEdit}
          onUpdated={onStudentUpdated}
        />
      )}

      {/* Confirm delete */}
      {deletingLecturer && (
        <ConfirmDialog
          title="Confirm delete"
          description={`Are you sure you want to delete ${deletingLecturer.firstName} ${deletingLecturer.lastName}?`}
          isOpen={!!deletingLecturer}
          onCancel={() => setDeletingLecturer(null)}
          onConfirm={confirmDelete}
          loading={processing}
        />
      )}
    </div>
  )
}

export default Lecturers
