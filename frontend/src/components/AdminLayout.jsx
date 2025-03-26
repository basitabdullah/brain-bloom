import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaBook, FaUsers, FaMoneyBillWave, FaPlus } from "react-icons/fa";

const AdminLayout = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="admin-layout">
      <div className="admin-layout__sidebar">
        <div className="admin-layout__logo">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-layout__nav">
          <Link
            to="/admin/courses"
            className={`admin-layout__nav-item ${
              isActive("/admin/courses") ? "active" : ""
            }`}
          >
            <FaBook /> All Courses
          </Link>
          <Link
            to="/admin/add-course"
            className={`admin-layout__nav-item ${
              isActive("/admin/add-course") ? "active" : ""
            }`}
          >
            <FaPlus /> Add Course
          </Link>
          <Link
            to="/admin/users"
            className={`admin-layout__nav-item ${
              isActive("/admin/users") ? "active" : ""
            }`}
          >
            <FaUsers /> Users
          </Link>
          <Link
            to="/admin/payments"
            className={`admin-layout__nav-item ${
              isActive("/admin/payments") ? "active" : ""
            }`}
          >
            <FaMoneyBillWave /> Payments
          </Link>
        </nav>
      </div>
      <div className="admin-layout__main">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
