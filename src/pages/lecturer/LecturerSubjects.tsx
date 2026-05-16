import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LecturerNavbar from "../../components/LecturerNavbar";
import CreateSubjectModal from "../../components/CreateSubjectModel";
import AssignSubjectInline from "../../components/AssignSubject";
import ConfirmDialog from "../../components/ConfirmDialog";
import Toast from "../../components/Toast";  // ← Import Toast

import {
  getLecturerDetails,
  getAllSubjects,
  deleteSubject,
} from "../../api/lecturerApi";

import type { LecturerDetails } from "../../types/lecturerDetails";
import type { LecturerSubjectDTO } from "../../types/subject";

import "../../styles/lecturer/LecturerSubject.css";


const LecturerSubjects: React.FC = () => {
  const { lecturerId } = useParams<{ lecturerId: string }>();

  const [lecturer, setLecturer] = useState<LecturerDetails | null>(null);
  const [allSubjects, setAllSubjects] = useState<LecturerSubjectDTO[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showCreate, setShowCreate] = useState(false);
  const [openAssignFor, setOpenAssignFor] = useState<number | null>(null);
  const [deletingSubject, setDeletingSubject] = useState<{ subId: number; name: string } | null>(null);
  const [processing, setProcessing] = useState(false);

  const [activeTab, setActiveTab] = useState<"all" | "mine">("all");

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  useEffect(() => {
    if (lecturerId) loadData();
  }, [lecturerId]);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const lecturerRes = await getLecturerDetails(Number(lecturerId));
      setLecturer(lecturerRes.data);

      const subjectRes = await getAllSubjects();
      setAllSubjects(subjectRes.data);

    } catch (err) {
      console.error(err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (subject: LecturerSubjectDTO, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingSubject({ subId: subject.subId, name: subject.subjectName });
  };

  const confirmDelete = async () => {
    if (!deletingSubject) return;
    setProcessing(true);
    try {
      await deleteSubject(deletingSubject.subId);
      await loadData();
      
      // ✅ Show success toast instead of alert
      setToast({
        message: `Successfully deleted "${deletingSubject.name}"!`,
        type: "success"
      });
      
      setDeletingSubject(null);
    } catch (err: any) {
      // ❌ Show error toast instead of alert
      setToast({
        message: err.response?.data?.message || "Delete failed",
        type: "error"
      });
      setDeletingSubject(null);
    } finally {
      setProcessing(false);
    }
  };

  // NEW: Handle assignment success
  const handleAssignSuccess = async (_courseId: number, subjectName: string) => {
    await loadData();
    setOpenAssignFor(null);
    
    // ✅ Show success toast
    setToast({
      message: `"${subjectName}" added to course successfully!`,
      type: "success"
    });
  };

  if (loading) return <div className="loading-container"><p>Loading subjects...</p></div>;
  if (error) return <div className="error-container"><p>{error}</p></div>;
  if (!lecturer) return <div className="error-container"><p>No lecturer data</p></div>;

  const subjectsToShow = activeTab === "all" ? allSubjects : lecturer.subjects;
  const isMySubjects = activeTab === "mine";

  return (
    <>
      <LecturerNavbar />

      <div className="lecturer-subjects-container">
        
        {/* Page Header */}
        <div className="subjects-header">
          <h2>Subjects</h2>
          <button className="btn-create-subject" onClick={() => setShowCreate(true)}>
            ➕ Create Subject
          </button>
        </div>

        {/* Count Badge */}
        <div className="subjects-count-badge">
          🎓 {subjectsToShow.length} Subject{subjectsToShow.length !== 1 ? 's' : ''}
        </div>

        {/* Filter Tabs */}
        <div className="tabs-container">
          <button
            className={`tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            <span className="tab-icon">📚</span>
            All Subjects
            <span className="tab-count">{allSubjects.length}</span>
          </button>

          <button
            className={`tab ${activeTab === "mine" ? "active" : ""}`}
            onClick={() => setActiveTab("mine")}
          >
            <span className="tab-icon">⭐</span>
            My Subjects
            <span className="tab-count">{lecturer.subjects.length}</span>
          </button>
        </div>

        {/* Table */}
        {subjectsToShow.length > 0 ? (
          <div className="table-container">
            <table className="subjects-table">
              <thead>
                <tr>
                  <th>Subject Name</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {subjectsToShow.map((s: LecturerSubjectDTO) => (
                  <tr key={s.subId} className="subject-row">
                    <td>
                      <div className="subject-name">
                        <span className="subject-icon">📝</span>
                        {s.subjectName}
                      </div>
                    </td>


                    <td>
                      {openAssignFor === s.subId ? (
                        <AssignSubjectInline
                          lecturerCourses={lecturer.courses}
                          subjectId={s.subId}
                          subjectName={s.subjectName}
                          onAdd={(courseId) => handleAssignSuccess(courseId, s.subjectName)}
                          onClose={() => setOpenAssignFor(null)}
                          onError={(message) => setToast({ message, type: "error" })}
                        />
                      ) : (
                        <div className="action-buttons">
                          <button
                            className="btn-assign"
                            onClick={() => setOpenAssignFor(s.subId)}
                          >
                            ➕ Add to Course
                          </button>

                          {isMySubjects && (
                            <>
                              <button className="btn-edit">
                                ✏️ Edit
                              </button>
                              
                              <button
                                className="btn-delete"
                                onClick={(e) => handleDeleteClick(s, e)}
                              >
                                🗑️ Delete
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🎓</div>
            <p className="empty-text">
              {activeTab === "all" ? "No subjects available" : "No subjects created yet"}
            </p>
            <p className="empty-subtext">
              {activeTab === "all" 
                ? "Create your first subject to get started!" 
                : "Switch to 'All Subjects' or create a new one!"}
            </p>
          </div>
        )}

        {/* Modals */}
        {showCreate && (
          <CreateSubjectModal
            lecturerId={Number(lecturerId)}
            onClose={() => setShowCreate(false)}
            onSuccess={() => {
              loadData();
              setToast({
                message: "Subject created successfully!",
                type: "success"
              });
            }}
          />
        )}

        {deletingSubject && (
          <ConfirmDialog
            title="Delete Subject"
            description={`Are you sure you want to delete "${deletingSubject.name}"? This will remove it from all courses.`}
            isOpen={!!deletingSubject}
            onCancel={() => setDeletingSubject(null)}
            onConfirm={confirmDelete}
            loading={processing}
            confirmText="Delete"
            loadingText="Deleting..."
            variant="danger"
          />
        )}

        {/* ✅ Toast Notification */}
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
};

export default LecturerSubjects;