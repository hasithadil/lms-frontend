// import React, { useEffect, useState } from "react";
// import type { Student } from "../../types/student";
// import apiClient from "../../api/apiClient";
// import type { StudentDetails } from "../../types/studentDetails";
// import StudentModal from "../../components/StudentModel";
// import UpdateStudentModal from "../../components/UpdateStudentModel";
// import ConfirmDialog from "../../components/ConfirmDialog";
// import AddStudentModal from "../../components/AddStudentModel";
// import '../../styles/Admin/Students.css';  
// import AdminNavbar from "../../components/AdminNavbar";
// import Toast from "../../components/Toast";

// function Students() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedStudent, setSelectedStudent] = useState<StudentDetails | null>(null);
//   const [showModal, setShowModal] = useState(false);
//   const [editingStudent, setEditingStudent] = useState<Student | null>(null);
//   const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
//   const [processing, setProcessing] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//     const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);


//   const handleRowClick = async (id: number) => {
//     try {
//       const response = await apiClient.get(`admin/student/${id}`);
//       setSelectedStudent(response.data);
//       setShowModal(true);
//     } catch (error: any) {
//       console.error("Failed to load student details", error.response?.data || error.message);
//     }
//   };

//   const handleEditClick = (s: Student) => {
//     setEditingStudent(s);
//   };

//   const handleDeleteClick = (s: Student) => {
//     setDeletingStudent(s);
//   };

//   const onCloseEdit = () => setEditingStudent(null);

//   const onStudentUpdated = (updated: Student) => {
//     setStudents((prev) => prev.map((s) => (s.s_id === updated.s_id ? updated : s)));
//     setEditingStudent(null);

//      setToast({
//       message: `Student "${updated.firstName} ${updated.lastName}" updated successfully!`,
//       type: "success"
//     });

//   };

//   const fetchStudents = async () => {
//     setLoading(true);
//     try {
//       const res = await apiClient.get<Student[]>("/admin/students");
//       setStudents(res.data);
//       setError("");
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to fetch students");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmDelete = async () => {
//     if (!deletingStudent) return;
//     setProcessing(true);
//     try {
//       await apiClient.delete(`/admin/student/${deletingStudent.s_id}`);
//       setStudents((prev) => prev.filter((s) => s.s_id !== deletingStudent.s_id));

//       setToast({
//         message: `Student "${deletingStudent.firstName} ${deletingStudent.lastName}" deleted successfully!`,
//         type: "success"
//       });

//       setDeletingStudent(null);
//     } catch (err: any) {
//   setToast({
//         message: err.response?.data?.message || "Delete failed",
//         type: "error"
//       });

//       setDeletingStudent(null);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   if (loading) return <p className="loading-message">Loading students...</p>;
//   if (error) return <p className="error-message">{error}</p>;

//   return (
//     <>
//     <AdminNavbar />
//     <div className="students-container">
//       {/* Header with Title and Add Button */}
//       <div className="students-header">
//         <h2>All Students</h2>
//         <button onClick={() => setShowAddModal(true)} className="btn-add">
//           ➕ Add Student
//         </button>
//       </div>

//       {/* Table */}
//       <div className="table-container">
//         <table className="students-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Status</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((s) => (
//               <tr key={s.s_id} onClick={() => handleRowClick(s.s_id)}>
//                 <td>{s.firstName} {s.lastName}</td>
//                 <td>{s.email}</td>
//                 <td>
//                   <span className={`status-badge ${s.status === 'ACTIVE' ? 'status-active' : 'status-inactive'}`}>
//                     {s.status}
//                   </span>
//                 </td>
//                 <td>
//                   {s.status === "ACTIVE" ? (
//                     <div className="action-buttons">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleEditClick(s);
//                         }}
//                         className="btn-update"
//                       >
//                         Update
//                       </button>

//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleDeleteClick(s);
//                         }}
//                         className="btn-delete"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   ) : (
//                     <span className="no-actions">—</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modals */}
//       {showModal && (
//         <StudentModal
//           student={selectedStudent}
//           onClose={() => setShowModal(false)}
//         />
//       )}

//       {editingStudent && (
//         <UpdateStudentModal
//           student={editingStudent}
//           onClose={onCloseEdit}
//           onUpdated={onStudentUpdated}
//         />
//       )}

//       {deletingStudent && (
//         <ConfirmDialog
//           title="Confirm delete"
//           description={`Are you sure you want to delete ${deletingStudent.firstName} ${deletingStudent.lastName}?`}
//           isOpen={!!deletingStudent}
//           onCancel={() => setDeletingStudent(null)}
//           onConfirm={confirmDelete}
//           loading={processing}
//         />
//       )}

//       {showAddModal && (
//         <AddStudentModal
//           onClose={() => setShowAddModal(false)}
//           onSuccess={fetchStudents}
//                     onShowToast={(message, type) => setToast({ message, type })}  // ← Pass toast callback

//         />
//       )}

//           {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}
//     </div>
//     </>
//   );
// }

// export default Students;

import { useEffect, useState } from "react";
import type { Student } from "../../types/student";
import apiClient from "../../api/apiClient";
import type { StudentDetails } from "../../types/studentDetails";
import StudentModal from "../../components/StudentModel";
import UpdateStudentModal from "../../components/UpdateStudentModel";
import ConfirmDialog from "../../components/ConfirmDialog";
import AddStudentModal from "../../components/AddStudentModel";
import '../../styles/Admin/Students.css';  
import AdminNavbar from "../../components/AdminNavbar";
import Toast from "../../components/Toast";

function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentDetails | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [reactivatingStudent, setReactivatingStudent] = useState<Student | null>(null);  // ← NEW
  const [processing, setProcessing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const handleRowClick = async (id: number) => {
    try {
      const response = await apiClient.get(`admin/student/${id}`);
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

  // ← NEW: Handle reactivate click
  const handleReactivateClick = (s: Student) => {
    setReactivatingStudent(s);
  };

  const onCloseEdit = () => setEditingStudent(null);

  const onStudentUpdated = (updated: Student) => {
    setStudents((prev) => prev.map((s) => (s.s_id === updated.s_id ? updated : s)));
    setEditingStudent(null);

    setToast({
      message: `Student "${updated.firstName} ${updated.lastName}" updated successfully!`,
      type: "success"
    });
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get<Student[]>("/admin/students");
      setStudents(res.data);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingStudent) return;
    setProcessing(true);
    try {
      await apiClient.delete(`/admin/student/${deletingStudent.s_id}`);
      
      // ✅ Update status to INACTIVE instead of removing from list
      setStudents((prev) => 
        prev.map((s) => 
          s.s_id === deletingStudent.s_id 
            ? { ...s, status: "INACTIVE" } 
            : s
        )
      );

      setToast({
        message: `Student "${deletingStudent.firstName} ${deletingStudent.lastName}" deactivated successfully!`,
        type: "success"
      });

      setDeletingStudent(null);
    } catch (err: any) {
      setToast({
        message: err.response?.data?.message || "Delete failed",
        type: "error"
      });

      setDeletingStudent(null);
    } finally {
      setProcessing(false);
    }
  };

  // ← NEW: Confirm reactivate
  const confirmReactivate = async () => {
    if (!reactivatingStudent) return;
    setProcessing(true);
    try {
      await apiClient.put(`/admin/student/${reactivatingStudent.s_id}/reactivate`);
      
      // ✅ Update status to ACTIVE
      setStudents((prev) => 
        prev.map((s) => 
          s.s_id === reactivatingStudent.s_id 
            ? { ...s, status: "ACTIVE" } 
            : s
        )
      );

      setToast({
        message: `Student "${reactivatingStudent.firstName} ${reactivatingStudent.lastName}" reactivated successfully!`,
        type: "success"
      });

      setReactivatingStudent(null);
    } catch (err: any) {
      setToast({
        message: err.response?.data?.message || "Reactivate failed",
        type: "error"
      });

      setReactivatingStudent(null);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) return <p className="loading-message">Loading students...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <>
      <AdminNavbar />
      <div className="students-container">
        {/* Header with Title and Add Button */}
        <div className="students-header">
          <h2>All Students</h2>
          <button onClick={() => setShowAddModal(true)} className="btn-add">
            ➕ Add Student
          </button>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="students-table">
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
                <tr key={s.s_id} onClick={() => handleRowClick(s.s_id)}>
                  <td>{s.firstName} {s.lastName}</td>
                  <td>{s.email}</td>
                  <td>
                    <span className={`status-badge ${s.status === 'ACTIVE' ? 'status-active' : 'status-inactive'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    {s.status === "ACTIVE" ? (
                      <div className="action-buttons">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(s);
                          }}
                          className="btn-update"
                        >
                          ✏️ Update
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(s);
                          }}
                          className="btn-delete"
                        >
                          🚫 Deactivate
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReactivateClick(s);
                        }}
                        className="btn-reactivate"
                      >
                        ✅ Reactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modals */}
        {showModal && (
          <StudentModal
            student={selectedStudent}
            onClose={() => setShowModal(false)}
          />
        )}

        {editingStudent && (
          <UpdateStudentModal
            student={editingStudent}
            onClose={onCloseEdit}
            onUpdated={onStudentUpdated}
          />
        )}

        {/* Delete (Deactivate) Confirmation */}
        {deletingStudent && (
          <ConfirmDialog
            title="Deactivate Student"
            description={`Are you sure you want to deactivate ${deletingStudent.firstName} ${deletingStudent.lastName}? They will be marked as inactive.`}
            isOpen={!!deletingStudent}
            onCancel={() => setDeletingStudent(null)}
            onConfirm={confirmDelete}
            loading={processing}
            confirmText="Deactivate"
            loadingText="Deactivating..."
            variant="danger"
          />
        )}

        {/* Reactivate Confirmation */}
        {reactivatingStudent && (
          <ConfirmDialog
            title="Reactivate Student"
            description={`Are you sure you want to reactivate ${reactivatingStudent.firstName} ${reactivatingStudent.lastName}? They will be able to access the system again.`}
            isOpen={!!reactivatingStudent}
            onCancel={() => setReactivatingStudent(null)}
            onConfirm={confirmReactivate}
            loading={processing}
            confirmText="Reactivate"
            loadingText="Reactivating..."
            variant="success"
          />
        )}

        {showAddModal && (
          <AddStudentModal
            onClose={() => setShowAddModal(false)}
            onSuccess={fetchStudents}
            onShowToast={(message, type) => setToast({ message, type })}
          />
        )}

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </>
  );
}

export default Students;