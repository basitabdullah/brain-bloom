import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CoursesList = () => {
  // Dummy data for courses
  const courses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      category: "Programming",
      instructor: "John Doe",
      students: 150,
      rating: 4.5,
      price: 49.99,
      status: "Active"
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      category: "Programming",
      instructor: "Jane Smith",
      students: 120,
      rating: 4.8,
      price: 79.99,
      status: "Active"
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      category: "Design",
      instructor: "Mike Johnson",
      students: 200,
      rating: 4.6,
      price: 59.99,
      status: "Draft"
    }
  ];

  return (
    <div className="admin-courses">
      <div className="admin-courses__header">
        <h1>All Courses</h1>
        <div className="admin-courses__stats">
          <div className="stat-card">
            <h3>Total Courses</h3>
            <p>{courses.length}</p>
          </div>
          <div className="stat-card">
            <h3>Active Courses</h3>
            <p>{courses.filter(course => course.status === "Active").length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Students</h3>
            <p>{courses.reduce((acc, course) => acc + course.students, 0)}</p>
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
              <th>Students</th>
              <th>Rating</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.category}</td>
                <td>{course.instructor}</td>
                <td>{course.students}</td>
                <td>{course.rating}</td>
                <td>${course.price}</td>
                <td>
                  <span className={`status-badge ${course.status.toLowerCase()}`}>
                    {course.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Edit">
                      <FaEdit />
                    </button>
                    <button className="btn-icon" title="Delete">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesList; 