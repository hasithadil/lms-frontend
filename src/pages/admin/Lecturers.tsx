import { useEffect, useState } from 'react'
import type { Lecturer } from '../../types/lecturer'
import type { LecturerDetails } from '../../types/lecturerDetails';
import apiClient from '../../api/apiClient';
import LecturerModel from '../../components/LecturerModel';
import ConfirmDialog from '../../components/ConfirmDialog';
import UpdateLecturerModel from '../../components/UpdateLecturerModel';
import AddLecturerModal from '../../components/AddLecturerModel';
import '../../styles/Admin/Lecturers.css';
import AdminNavbar from '../../components/AdminNavbar';
import Toast from '../../components/Toast';

function Lecturers() {

    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")
    const [selectedLecturer, setSelectedLecturer] = useState<LecturerDetails | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editingLecturer, setEditingLecturer] = useState<Lecturer | null>(null);
    const [deletingLecturer, setDeletingLecturer] = useState<Lecturer | null>(null);
    const [reactivatingLecturer, setReactivatingLecturer] = useState<Lecturer | null>(null);  // ← NEW
    const [processing, setProcessing] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

    const handleRowClick = async (id: number) => {
        try {
            const response = await apiClient.get(`/admin/lecturer/${id}`);
            setSelectedLecturer(response.data);
            setShowModal(true);
        } catch (error: any) {
            console.error("Failed to load lecturer details", error.response?.data || error.message);
        }
    };

    const handleEditClick = (l: Lecturer) => {
        setEditingLecturer(l);
    };

    const handleDeleteClick = (l: Lecturer) => {
        setDeletingLecturer(l);
    };

    // ← NEW: Handle reactivate click
    const handleReactivateClick = (l: Lecturer) => {
        setReactivatingLecturer(l);
    };

    const confirmDelete = async () => {
        if (!deletingLecturer) return;
        setProcessing(true);
        try {
            await apiClient.delete(`/admin/lecturer/${deletingLecturer.lec_id}`);
            
            // ✅ Update status to INACTIVE instead of removing
            setLecturers((prev) => 
                prev.map((l) => 
                    l.lec_id === deletingLecturer.lec_id 
                        ? { ...l, status: "INACTIVE" } 
                        : l
                )
            );

            setToast({
                message: `Lecturer "${deletingLecturer.firstName} ${deletingLecturer.lastName}" deactivated successfully!`,
                type: "success"
            });

            setDeletingLecturer(null);
        } catch (err: any) {
            setToast({
                message: err.response?.data?.message || "Delete failed",
                type: "error"
            });

            setDeletingLecturer(null);
        } finally {
            setProcessing(false);
        }
    };

    // ← NEW: Confirm reactivate
    const confirmReactivate = async () => {
        if (!reactivatingLecturer) return;
        setProcessing(true);
        try {
            await apiClient.put(`/admin/lecturer/${reactivatingLecturer.lec_id}/reactivate`);
            
            // ✅ Update status to ACTIVE
            setLecturers((prev) => 
                prev.map((l) => 
                    l.lec_id === reactivatingLecturer.lec_id 
                        ? { ...l, status: "ACTIVE" } 
                        : l
                )
            );

            setToast({
                message: `Lecturer "${reactivatingLecturer.firstName} ${reactivatingLecturer.lastName}" reactivated successfully!`,
                type: "success"
            });

            setReactivatingLecturer(null);
        } catch (err: any) {
            setToast({
                message: err.response?.data?.message || "Reactivate failed",
                type: "error"
            });

            setReactivatingLecturer(null);
        } finally {
            setProcessing(false);
        }
    };

    const onCloseEdit = () => setEditingLecturer(null);

    const onLecturerUpdated = (updated: Lecturer) => {
        setLecturers((prev) => prev.map((l) => (l.lec_id === updated.lec_id ? updated : l)));
        setEditingLecturer(null);

        setToast({
            message: `Lecturer "${updated.firstName} ${updated.lastName}" updated successfully!`,
            type: "success"
        });
    };

    const fetchLecturer = async () => {
        setLoading(true);
        try {
            const res = await apiClient.get<Lecturer[]>("/admin/lecturers");
            setLecturers(res.data);
            setError("");
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch Lecturer");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLecturer();
    }, []);

    if (loading) return <p className="loading-message">Loading lecturers...</p>
    if (error) return <p className="error-message">{error}</p>

    return (
        <>
            <AdminNavbar />
            <div className="lecturers-container">
                {/* Header with Title and Add Button */}
                <div className="lecturers-header">
                    <h2>All Lecturers</h2>
                    <button onClick={() => setShowAddModal(true)} className="btn-add">
                        ➕ Add Lecturer
                    </button>
                </div>

                {/* Table */}
                <div className="table-container">
                    <table className="lecturers-table">
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
                                >
                                    <td>{l.firstName} {l.lastName}</td>
                                    <td>{l.email}</td>
                                    <td>
                                        <span className={`status-badge ${l.status === 'ACTIVE' ? 'status-active' : 'status-inactive'}`}>
                                            {l.status}
                                        </span>
                                    </td>
                                    <td>
                                        {l.status === "ACTIVE" ? (
                                            <div className="action-buttons">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditClick(l);
                                                    }}
                                                    className="btn-update"
                                                >
                                                    ✏️ Update
                                                </button>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteClick(l);
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
                                                    handleReactivateClick(l);
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
                    <LecturerModel
                        lecturer={selectedLecturer}
                        onClose={() => setShowModal(false)}
                    />
                )}

                {editingLecturer && (
                    <UpdateLecturerModel
                        lecturer={editingLecturer}
                        onClose={onCloseEdit}
                        onUpdated={onLecturerUpdated}
                    />
                )}

                {/* Deactivate Confirmation */}
                {deletingLecturer && (
                    <ConfirmDialog
                        title="Deactivate Lecturer"
                        description={`Are you sure you want to deactivate ${deletingLecturer.firstName} ${deletingLecturer.lastName}? They will be marked as inactive.`}
                        isOpen={!!deletingLecturer}
                        onCancel={() => setDeletingLecturer(null)}
                        onConfirm={confirmDelete}
                        loading={processing}
                        confirmText="Deactivate"
                        loadingText="Deactivating..."
                        variant="danger"
                    />
                )}

                {/* Reactivate Confirmation */}
                {reactivatingLecturer && (
                    <ConfirmDialog
                        title="Reactivate Lecturer"
                        description={`Are you sure you want to reactivate ${reactivatingLecturer.firstName} ${reactivatingLecturer.lastName}? They will be able to access the system again.`}
                        isOpen={!!reactivatingLecturer}
                        onCancel={() => setReactivatingLecturer(null)}
                        onConfirm={confirmReactivate}
                        loading={processing}
                        confirmText="Reactivate"
                        loadingText="Reactivating..."
                        variant="success"
                    />
                )}

                {showAddModal && (
                    <AddLecturerModal
                        onClose={() => setShowAddModal(false)}
                        onSuccess={fetchLecturer}
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
    )
}

export default Lecturers