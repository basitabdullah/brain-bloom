import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useUserStore } from "../../stores/useUserStore";
import { ClipLoader } from "react-spinners";

const UsersManagement = () => {
  const { users, getAllUsers, loading } = useUserStore();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (users) {
      setFilteredUsers(users);
    }
  }, [users]);

  const handleClick = (role) => {
    setSelectedRole(role);
    if (users) {
      if (role === "all") {
        setFilteredUsers(users);
      } else {
        const filtered = users.filter((user) => user.role === role);
        setFilteredUsers(filtered);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const displayedUsers = filteredUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || //includes checks for any portion that matches like im in fahim
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!users || loading) {
    return (
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
    );
  }

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
            <h3>Admins</h3>
            <p>{users.filter((user) => user.role === "admin").length}</p>
          </div>
        </div>
      </div>

      <div className="admin-users__filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="filter-buttons">
          {["all", "user", "admin", "subscriber"].map((role) => (
            <button
              key={role}
              className={`filter-btn ${selectedRole === role ? "active" : ""}`}
              onClick={() => handleClick(role)}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-users__table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No users found.
                </td>
              </tr>
            ) : (
              displayedUsers.map((user) => (
                <tr key={user._id}>
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
                    <div className="action-buttons">
                      <button className="btn-icon" title="View Profile">
                        <FaUser />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
