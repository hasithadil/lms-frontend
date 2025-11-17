import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LecturerNavbar from "../../components/LecturerNavbar";
import { getLecturerDetails } from "../../api/lecturerApi";
import type {LecturerDetails} from "../../types/lecturerDetails";

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
      const res = await getLecturerDetails(Number(lecId));
      setLecturer(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load lecturer");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading lecturer profile...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!lecturer) return <div>Lecturer not found</div>;

  return (
    <>
      <LecturerNavbar />

      <div className="lecturer-dashboard">

        <h2>Lecturer Profile</h2>

        <div className="profile-card">
          <p><strong>Name:</strong> {lecturer.name}</p>
          <p><strong>Email:</strong> {lecturer.email}</p>
          <p><strong>Status:</strong> {lecturer.status}</p>

          <h3>My Courses</h3>
          {lecturer.courses.length > 0 ? (
            <ul>
              {lecturer.courses.map((c) => (
                <li key={c.courseId}>{c.name}</li>
              ))}
            </ul>
          ) : (
            <p>No courses created yet.</p>
          )}

          <h3>Subjects I Teach</h3>
          {lecturer.subjects.length > 0 ? (
            <ul>
              {lecturer.subjects.map((s) => (
                <li key={s.subId}>{s.subjectName}</li>
              ))}
            </ul>
          ) : (
            <p>No subjects assigned yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default LecturerDashboard;
