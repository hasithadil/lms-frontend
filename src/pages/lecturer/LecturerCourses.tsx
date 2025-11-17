import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LecturerNavbar from "../../components/LecturerNavbar";
import CreateCourseModal from "../../components/CreateCourseModel";
import UpdateCourseModal from "../../components/UpdateCourseModel";
import CourseDetailsModal from "../../components/CourseDetailsModel";

import { getLecturerDetails, deleteLecturerCourse } from "../../api/lecturerApi";
import axios from "axios";

import type { CourseDTO, CourseResponseDTO } from "../../types/course";

const LecturerCourses: React.FC = () => {
  const { lecturerId } = useParams<{ lecturerId: string }>();

  const [courses, setCourses] = useState<CourseDTO[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<CourseResponseDTO | null>(null);
  const [courseForUpdate, setCourseForUpdate] = useState<CourseResponseDTO | null>(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    if (lecturerId) loadCourses();
  }, [lecturerId]);

  const loadCourses = async () => {
    try {
      const res = await getLecturerDetails(Number(lecturerId));
      setCourses(res.data.courses || []);
    } catch {
      setCourses([]);
    }
  };

  const openUpdate = (course: CourseResponseDTO) => {
    setCourseForUpdate(course);
    setShowUpdateModal(true);
  };

  const openCourseDetails = async (courseId: number) => {
    const res = await axios.get(`http://localhost:8080/lecturer/course/${courseId}`);
    setSelectedCourse(res.data);
    setShowDetailsModal(true);
  };

  const handleDelete = async (courseId: number) => {
    try {
      await deleteLecturerCourse(courseId);
      loadCourses();
    } catch (err) {
      console.error("Delete failed");
    }
  };

  return (
    <>
      <LecturerNavbar />

      <div className="lecturer-courses">
        <h2>My Courses</h2>

        <button className="primary-btn" onClick={() => setShowCreateModal(true)}>
          + Create Course
        </button>

        <table className="courses-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Max Students</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((c) => (
              <tr key={c.courseId}>
                <td onClick={() => openCourseDetails(c.courseId)}>{c.name}</td>
                <td>{c.maxStudent}</td>
                <td>
                  <button onClick={() => openUpdate(c)}>Update</button>
                  <button onClick={() => handleDelete(c.courseId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showCreateModal && (
          <CreateCourseModal
            lecturerId={Number(lecturerId)}
            onClose={() => setShowCreateModal(false)}
            onSuccess={loadCourses}
          />
        )}

        {showUpdateModal && courseForUpdate && (
          <UpdateCourseModal
            lecturerId={Number(lecturerId)}
            course={courseForUpdate}
            onClose={() => setShowUpdateModal(false)}
            onSuccess={loadCourses}
          />
        )}

        {showDetailsModal && selectedCourse && (
          <CourseDetailsModal
            course={selectedCourse}
            onClose={() => setShowDetailsModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default LecturerCourses;
