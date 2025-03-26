import React from 'react';
import { FaMoneyBillWave, FaChartLine, FaDownload } from 'react-icons/fa';

const Payments = () => {
  // Dummy data for payments
  const payments = [
    {
      id: 1,
      user: "John Doe",
      course: "Introduction to Web Development",
      amount: 49.99,
      date: "2024-03-15",
      status: "Completed",
      paymentMethod: "Credit Card"
    },
    {
      id: 2,
      user: "Jane Smith",
      course: "Advanced JavaScript",
      amount: 79.99,
      date: "2024-03-14",
      status: "Completed",
      paymentMethod: "PayPal"
    },
    {
      id: 3,
      user: "Mike Johnson",
      course: "UI/UX Design Fundamentals",
      amount: 59.99,
      date: "2024-03-13",
      status: "Pending",
      paymentMethod: "Credit Card"
    }
  ];

  // Calculate statistics
  const totalRevenue = payments.reduce((acc, payment) => acc + payment.amount, 0);
  const completedPayments = payments.filter(payment => payment.status === "Completed").length;
  const pendingPayments = payments.filter(payment => payment.status === "Pending").length;

  return (
    <div className="admin-payments">
      <div className="admin-payments__header">
        <h1>Payments</h1>
        <div className="admin-payments__stats">
          <div className="stat-card">
            <div className="stat-icon">
              <FaMoneyBillWave />
            </div>
            <div className="stat-info">
              <h3>Total Revenue</h3>
              <p>${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaChartLine />
            </div>
            <div className="stat-info">
              <h3>Completed Payments</h3>
              <p>{completedPayments}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaMoneyBillWave />
            </div>
            <div className="stat-info">
              <h3>Pending Payments</h3>
              <p>{pendingPayments}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-payments__filters">
        <div className="date-range">
          <input type="date" />
          <span>to</span>
          <input type="date" />
        </div>
        <div className="filter-buttons">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Completed</button>
          <button className="filter-btn">Pending</button>
          <button className="filter-btn">Failed</button>
        </div>
        <button className="btn btn--icon">
          <FaDownload /> Export
        </button>
      </div>

      <div className="admin-payments__table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Course</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.user}</td>
                <td>{payment.course}</td>
                <td>${payment.amount}</td>
                <td>{payment.date}</td>
                <td>
                  <span className={`status-badge ${payment.status.toLowerCase()}`}>
                    {payment.status}
                  </span>
                </td>
                <td>{payment.paymentMethod}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="View Details">
                      <FaMoneyBillWave />
                    </button>
                    <button className="btn-icon" title="Download Receipt">
                      <FaDownload />
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

export default Payments; 