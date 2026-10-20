
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <span className="home-badge">EMPLOYPRO WORKSPACE</span>

        <h1>
          Welcome to <span>EmployPro</span>
        </h1>

        <p>
          Manage your workforce with ease.
          Organize employee information, monitor
          departments, and simplify daily tasks
          from one place.
        </p>

        <div className="home-actions">
          <Link to="/" className="home-primary-button">
            View Dashboard
          </Link>

          <Link to="/employees" className="home-secondary-button">
            View Employees
          </Link>
        </div>
      </section>

      <section className="home-info-grid">
        <article className="home-info-card">
          <h3>Employee Management</h3>
          <p>View and manage employee records in one place.</p>
        </article>

        <article className="home-info-card">
          <h3>Dashboard Analytics</h3>
          <p>Monitor employee statistics and department details.</p>
        </article>

        <article className="home-info-card">
          <h3>Easy Navigation</h3>
          <p>Quickly access the tools you need for your work.</p>
        </article>
      </section>
    </div>
  );
}

export default Home;
