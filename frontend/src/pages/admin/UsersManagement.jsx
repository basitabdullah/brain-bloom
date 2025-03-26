import React from 'react';
import { FaUser, FaUserSlash, FaUserCheck } from 'react-icons/fa';

const UsersManagement = () => {
  // Dummy data for users
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Student",
      status: "Active",
      joinedDate: "2024-01-15",
      coursesEnrolled: 3
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Instructor",
      status: "Active",
      joinedDate: "2024-02-01",
      coursesEnrolled: 0
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Student",
      status: "Inactive",
      joinedDate: "2024-02-10",
      coursesEnrolled: 1
    }
  ];

  return (
    <div className="admin-users">
      <div className="admin-users__header">
        <h1>Users Management</h1>
        <div className="admin-users__stats">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>
          <div className="stat-card">
            <h3>Active Users</h3>
            <p>{users.filter(user => user.status === "Active").length}</p>
          </div>
          <div className="stat-card">
            <h3>Instructors</h3>
            <p>{users.filter(user => user.role === "Instructor").length}</p>
          </div>
        </div>
      </div>

      <div className="admin-users__filters">
        <div className="search-box">
          <input type="text" placeholder="Search users..." />
        </div>
        <div className="filter-buttons">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Students</button>
          <button className="filter-btn">Instructors</button>
          <button className="filter-btn">Active</button>
          <button className="filter-btn">Inactive</button>
        </div>
      </div>

      <div className="admin-users__table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th>Courses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">
                      <FaUser />
                    </div>
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.joinedDate}</td>
                <td>{user.coursesEnrolled}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="View Profile">
                      <FaUser />
                    </button>
                    {user.status === "Active" ? (
                      <button className="btn-icon" title="Deactivate">
                        <FaUserSlash />
                      </button>
                    ) : (
                      <button className="btn-icon" title="Activate">
                        <FaUserCheck />
                      </button>
                    )}
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

export default UsersManagement; 