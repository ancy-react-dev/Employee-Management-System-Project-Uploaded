

import { useState } from "react";
import { useAppSelector } from "../app/hooks";

function Admin() {
  const [adminName, setAdminName] = useState("Administrator");
  const [adminEmail, setAdminEmail] = useState("admin@employpro.com");
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const employees = useAppSelector(
    (state) => state.employees.employees
  );

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

const departmentStats = employees.reduce<Record<string, number>>(
  (stats, employee) => {
    stats[employee.department] =
      (stats[employee.department] || 0) + 1;

    return stats;
  },
  {}
);

const maxDepartmentCount = Math.max(
  1,
  ...Object.values(departmentStats)
);

 return (
    <main className="admin-page">
        
<button
  type="button"
  className="admin-logout-button"
  onClick={() => {
    alert("Login authentication is not configured yet.");
  }}
>
  <span aria-hidden="true">↪</span> Logout
</button>

      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">EMPLOYPRO / ADMIN</p>
          <h1>Admin Panel</h1>
          <p>Manage your workspace from one place.</p>
        </div>

        <div className="admin-avatar">A</div>
      </header>

<section className="admin-department-section">
  <div className="admin-recent-heading">
    <div>
      <h2>Department Overview</h2>
      <p>Employee distribution across departments</p>
    </div>
  </div>

  {Object.keys(departmentStats).length === 0 ? (
    <p className="admin-empty-state">
      No department data available.
    </p>
  ) : (
    <div className="admin-department-list">
      {Object.entries(departmentStats).map(
        ([department, count]) => (
          <div className="admin-department-item" key={department}>
            <div className="admin-department-label">
              <strong>{department}</strong>
              <span>
                {count} {count === 1 ? "employee" : "employees"}
              </span>
            </div>

            <div className="admin-department-track">
              <div
                className="admin-department-fill"
                style={{
                  width: `${(count / maxDepartmentCount) * 100}%`,
                }}
              />
            </div>
          </div>
        )
      )}
    </div>
  )}
</section>

      
<section className="admin-recent-section">
  <div className="admin-recent-heading">
    <div>
      <h2>Recent Employees</h2>
      <p>Employee records in your workspace</p>
    </div>

    <a href={`${import.meta.env.BASE_URL}employees`}>
      View All →
    </a>
  </div>

  <div className="admin-recent-list">
    {employees.length === 0 ? (
      <p className="admin-empty-state">No employees found.</p>
    ) : (
      employees.slice(-5).reverse().map((employee) => (
        <div
          className="admin-recent-item"
          key={employee.id}
        >
          <div className="admin-recent-avatar">
            {employee.name.charAt(0).toUpperCase()}
          </div>

          <div className="admin-recent-details">
            <strong>{employee.name}</strong>
            <span>{employee.designation}</span>
          </div>

          <span
            className={`admin-recent-status ${
              employee.status === "Active"
                ? "is-active"
                : "is-inactive"
            }`}
          >
            {employee.status}
          </span>
        </div>
      ))
    )}
  </div>
</section>

<section className="admin-profile-card">
  <div className="admin-profile-avatar">
    {adminName.charAt(0).toUpperCase() || "A"}
  </div>

  <div className="admin-profile-details">
    {isEditing ? (
      <div className="admin-edit-fields">
        <label>
          Admin Name
          <input
            value={adminName}
            onChange={(e) => {
              setAdminName(e.target.value);
              setSaved(false);
            }}
            placeholder="Enter admin name"
          />
        </label>

        <label>
          Email Address
          <input
            type="email"
            value={adminEmail}
            onChange={(e) => {
              setAdminEmail(e.target.value);
              setSaved(false);
            }}
            placeholder="Enter email address"
          />
        </label>

        <button
          type="button"
          onClick={() => {
            if (
              adminName.trim() &&
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)
            ) {
              setAdminName(adminName.trim());
              setAdminEmail(adminEmail.trim());
              setIsEditing(false);
              setSaved(true);
            } else {
              alert("Please enter a valid name and email.");
            }
          }}
        >
          Save Changes
        </button>

        <button
          type="button"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    ) : (
      <>
        <h2>{adminName}</h2>
        <p>{adminEmail}</p>
        <span className="admin-status">● Account Active</span>

        <div>
          <button
            type="button"
            onClick={() => {
              setIsEditing(true);
              setSaved(false);
            }}
          >
            Edit Profile
          </button>
        </div>

        {saved && <p role="status">Profile updated successfully!</p>}
      </>
    )}
  </div>
</section>

      <section className="admin-stats">
        <article className="admin-stat-card">
          <span>Total Employees</span>
          <h2>{employees.length}</h2>
        </article>

        <article className="admin-stat-card">
          <span>Active Employees</span>
          <h2>{activeEmployees}</h2>
        </article>

        <article className="admin-stat-card">
          <span>Inactive Employees</span>
          <h2>{employees.length - activeEmployees}</h2>
        </article>
      </section>

      <section className="admin-info-card">
        <h2>Admin Information</h2>
        <div className="admin-info-row">
          <span>Role</span>
          <strong>Administrator</strong>
        </div>
        <div className="admin-info-row">
          <span>Access</span>
          <strong>Employee Management</strong>
        </div>
        <div className="admin-info-row">
          <span>Platform</span>
          <strong>EmployPro</strong>
        </div>
      </section>
      
<section className="admin-shortcuts">
  <h2>Quick Actions</h2>

  <div className="admin-shortcut-grid">
    <a href={`${import.meta.env.BASE_URL}employees`}>
      <span className="shortcut-icon">👥</span>
      <span>
        <strong>Employee Management</strong>
        <small>View and manage employees</small>
      </span>
      <span className="shortcut-arrow">→</span>
    </a>

    <a href={`${import.meta.env.BASE_URL}admin/settings`}>
      <span className="shortcut-icon">⚙️</span>
      <span>
        <strong>Admin Settings</strong>
        <small>Manage workspace preferences</small>
      </span>
      <span className="shortcut-arrow">→</span>
    </a>
  </div>
</section>

    </main>
  );
}

export default Admin;
