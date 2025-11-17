import React, { useEffect, useState } from "react";
import axios from "axios";
import { enrollCourse } from "../../api/studentApi";
import type { CourseDTO, CourseResponseDTO } from "../../types/course";
import { useParams } from "react-router-dom";
import StudentNavbar from "../../components/StudentNavbar";
import CourseDetailsModal from "../../components/CourseDetailsModel";

const StudentCourses: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();

  const [courses, setCourses] = useState<CourseDTO[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseResponseDTO | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("http://localhost:8080/student/courses");
      setCourses(res.data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent row click from firing

    if (!studentId) {
      alert("Student ID not found");
      return;
    }

    try {
      await enrollCourse({ studentId: Number(studentId), courseId });
      alert("Enrolled successfully!");
      load();
    } catch (err: any) {
      alert(err.response?.data?.error || "Enrollment failed");
    }
  };

  const handleRowClick = async (id: number) => {
    try {
      const res = await axios.get(`http://localhost:8080/student/course/${id}`);
      setSelectedCourse(res.data);
      setShowModal(true);
    } catch (err: any) {
      console.error("Failed to load course details", err);
      alert("Failed to load course details.");
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading courses...</p>;

  return (
    <>
      <StudentNavbar />

      <div className="student-courses">
        <h2>All Courses</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <table className="courses-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Maximum Students</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((c) => (
              <tr 
                key={c.courseId}
                onClick={() => handleRowClick(c.courseId)}
                style={{ cursor: "pointer" }}
              >
                <td>{c.name}</td>
                <td>{c.maxStudent}</td>
                <td>
                  <button
                    onClick={(e) => handleEnroll(c.courseId, e)}
                    style={{ cursor: "pointer" }}
                  >
                    Enroll
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && selectedCourse && (
          <CourseDetailsModal
            course={selectedCourse}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default StudentCourses;
