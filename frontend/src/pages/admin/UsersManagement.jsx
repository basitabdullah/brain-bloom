import React, { useEffect } from "react";
import { FaUser, FaUserSlash, FaUserCheck } from "react-icons/fa";
import { useUserStore } from "../../stores/useUserStore";
import { ClipLoader } from "react-spinners";

const UsersManagement = () => {
  const { users, getAllUsers, loading } = useUserStore();

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleClick = (role) => {
    const filteredUsers = users.filter((user) => user.role === role);
    return filteredUsers;
  };

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
          {/* <div className="stat-card">
            <h3>Active Users</h3>
            <p>{users.filter(user => user.status === "Active").length}</p>
          </div> */}
          <div className="stat-card">
            <h3>Admins</h3>
            <p>{users.filter((user) => user.role === "admin").length}</p>
          </div>
        </div>
      </div>

      <div className="admin-users__filters">
        <div className="search-box">
          <input type="text" placeholder="Search users..." />
        </div>
        <div className="filter-buttons">
          <button
            className="filter-btn active"
            onClick={() => handleClick("All")}
          >
            All
          </button>
          <button className="filter-btn" onClick={() => handleClick("user")}>
            Users
          </button>
          <button className="filter-btn" onClick={() => handleClick("admin")}>
            Admins
          </button>
          <button
            className="filter-btn"
            onClick={() => handleClick("subscriber")}
          >
            Subscribers
          </button>
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
            {loading ? (
              <tr
                style={{
                  width: "80vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ClipLoader color="#fff" size={12} />
              </tr>
            ) : (
              users.map((user) => (
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
