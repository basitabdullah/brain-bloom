import React, { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useCourseStore } from "../../stores/useCourseStore";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const CoursesList = () => {
  const { loading, courses, getAllPremiumCourses, deleteCourse } =
    useCourseStore();

  useEffect(() => {
    getAllPremiumCourses();
  }, [getAllPremiumCourses]);

  const handleCourseDelete = async (id) => {
    await deleteCourse(id);
    await getAllPremiumCourses();
  };

  return loading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ClipLoader color="#fff" />
    </div>
  ) : (
    <div className="admin-courses">
      <div className="admin-courses__header">
        <h1>All Courses</h1>
        <div className="admin-courses__stats">
          <div className="stat-card">
            <h3>Total Courses</h3>
            <p>{courses?.length || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Active Courses</h3>
            <p>{courses?.length || 0}</p>
          </div>
        </div>
      </div>

      <div className="admin-courses__table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Instructor</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((course) => (
              <tr key={course._id}>
                <td>{course.title}</td>
                <td>{course.category}</td>
                <td>{course.instructor?.name || "N/A"}</td>
                <td>{course.rating ?? "Not Rated"}</td>
                <td>
                  <div className="action-buttons">
                    <Link
                      to={`/admin/update-course/${course._id}`}
                      className="btn-icon"
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleCourseDelete(course._id)}
                      className="btn-icon"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {courses?.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesList;
