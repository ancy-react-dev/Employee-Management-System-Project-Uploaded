
import { employees } from "../data/employees";
import type { Employee } from "../types/employee";

function Dashboard() {
  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee: Employee) => employee.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee: Employee) => employee.status === "Inactive"
  ).length;

  const departmentStats = employees.reduce<Record<string, number>>(
    (stats, employee) => {
      stats[employee.department] =
        (stats[employee.department] || 0) + 1;

      return stats;
    },
    {}
  );

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">EMPLOYEE MANAGEMENT SYSTEM</p>
          <h1>Dashboard</h1>
          <p className="subtitle">
            Overview of your organization's employees.
          </p>
        </div>
        <span className="dashboard-badge">Overview</span>
      </header>

      <section className="stats-grid">
        <article className="stat-card total-card">
          <p>Total Employees</p>
          <h2>{totalEmployees}</h2>
          <span>All employees</span>
        </article>

        <article className="stat-card active-card">
          <p>Active Employees</p>
          <h2>{activeEmployees}</h2>
          <span>Currently active</span>
        </article>

        <article className="stat-card inactive-card">
          <p>Inactive Employees</p>
          <h2>{inactiveEmployees}</h2>
          <span>Currently inactive</span>
        </article>
      </section>

      <section className="department-section">
        <div className="section-heading">
          <div>
            <h2>Department Statistics</h2>
            <p>Employee count by department</p>
          </div>
          <span className="department-count">
            {Object.keys(departmentStats).length} Departments
          </span>
        </div>

        <div className="department-grid">
          {Object.entries(departmentStats).map(
            ([department, count]) => (
              <article className="department-card" key={department}>
                <div className="department-card-top">
                  <h3>{department}</h3>
                  <span className="department-icon">
                    {department === "IT"
                      ? "💻"
                      : department === "HR"
                        ? "👥"
                        : department === "Finance"
                          ? "💰"
                          : "📊"}
                  </span>
                </div>

                <p className="department-number">{count}</p>
                <p className="department-label">
                  {count === 1 ? "Employee" : "Employees"}
                </p>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(count / totalEmployees) * 100}%`,
                    }}
                  />
                </div>

                <p className="department-percentage">
                  {Math.round((count / totalEmployees) * 100)}% of workforce
                </p>
              </article>
            )
          )}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
