import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LecturerNavbar from "../../components/LecturerNavbar";
import { getLecturerDetails } from "../../api/lecturerApi";
import type { LecturerDetails } from "../../types/lecturerDetails";

import "../../styles/Lecturer/LecturerDashboard.css";

const LecturerDashboard: React.FC = () => {
  const { lecId } = useParams<{ lecId: string }>();

  const [lecturer, setLecturer] = useState<LecturerDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lecId) loadLecturer();
  }, [lecId]);

  const loadLecturer = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getLecturerDetails(Number(lecId));
      setLecturer(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load lecturer");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-container"><p>Loading lecturer profile...</p></div>;
  if (error) return <div className="error-container"><p>{error}</p></div>;
  if (!lecturer) return <div className="error-container"><p>Lecturer not found</p></div>;

  return (
    <>
      <LecturerNavbar />

      <div className="lecturer-dashboard-container">

        {/* Page Header */}
        <div className="dashboard-header">
          <h2>My Dashboard</h2>
          <div className="stats-badges">
            <div className="stat-badge courses-badge">
              📚 {lecturer.courses.length} Course{lecturer.courses.length !== 1 ? 's' : ''}
            </div>
            <div className="stat-badge subjects-badge">
              🎓 {lecturer.subjects.length} Subject{lecturer.subjects.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {lecturer.name.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <h3 className="profile-name">{lecturer.name}</h3>
              <p className="profile-email">✉️ {lecturer.email}</p>
              <span className={`profile-status ${lecturer.status === 'ACTIVE' ? 'status-active' : 'status-inactive'}`}>
                {lecturer.status}
              </span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">

          {/* My Courses Section */}
          <div className="section-card">
            <h3 className="section-title">
              <span className="section-icon">📚</span>
              My Courses
            </h3>

            {lecturer.courses.length > 0 ? (
              <div className="items-list">
                {lecturer.courses.map((c) => (
                  <div key={c.courseId} className="item-card course-item">
                    <span className="item-icon">📖</span>
                    <span className="item-name">{c.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📚</div>
                <p className="empty-text">No courses created yet</p>
                <p className="empty-subtext">Create your first course to get started!</p>
              </div>
            )}
          </div>

          {/* Subjects Section */}
          <div className="section-card">
            <h3 className="section-title">
              <span className="section-icon">🎓</span>
              Subjects I Teach
            </h3>

            {lecturer.subjects.length > 0 ? (
              <div className="items-list">
                {lecturer.subjects.map((s) => (
                  <div key={s.subId} className="item-card subject-item">
                    <span className="item-icon">📝</span>
                    <span className="item-name">{s.subjectName}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🎓</div>
                <p className="empty-text">No subjects assigned yet</p>
                <p className="empty-subtext">Add subjects to your courses!</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default LecturerDashboard;