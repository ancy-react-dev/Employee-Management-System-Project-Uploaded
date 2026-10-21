
import { BrowserRouter, Routes, Route, NavLink, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import EmployeeList from "./pages/EmployeeList";
import EmployeeForm from "./pages/EmployeeForm";
import { useAppDispatch } from "./app/hooks";
import { addEmployee } from "./features/employees/employeeSlice";
import Admin from "./pages/Admin";
import AdminSettings from "./pages/AdminSettings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function About() {
  return (
    <div className="app">
      <section className="about-card">
        <span className="eyebrow">ABOUT THE PROJECT</span>
        <h1>Employee Management System</h1>
        <p className="subtitle">
          A centralized dashboard to manage employee information and
          monitor workforce statistics.
        </p>
        <div className="about-features">
          <article className="about-feature">
            <h3>Employee Management</h3>
            <p>Add, view, edit and manage employee records.</p>
          </article>
          <article className="about-feature">
            <h3>Dashboard Analytics</h3>
            <p>View employee totals, status and department statistics.</p>
          </article>
          <article className="about-feature">
            <h3>Modern Technology</h3>
            <p>Built with React, TypeScript, Redux Toolkit and API integration.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

function NotFound() {
  return (
    <div className="app">
      <section className="not-found-card">
        <h1>404 - Page Not Found</h1>
        <p className="subtitle">Sorry, we couldn't find that page.</p>
        <Link className="primary-link" to="/">
          Go to Dashboard
        </Link>
      </section>
    </div>
  );
}

function App() {
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="app-shell">
        <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
          <Link to="/" className="brand" onClick={closeMenu}>
            <span className="brand-icon">E</span>
            <span>
              <strong>EmployPro</strong>
              <small>ADMIN CONSOLE</small>
            </span>
          </Link>

          <p className="nav-label">WORKSPACE</p>

          <nav className="sidebar-nav">
            <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <span className="nav-icon">▦</span>
              Dashboard
            </NavLink>

            <NavLink to="/employees" onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <span className="nav-icon">♙</span>
              Employee List
            </NavLink>

            <NavLink to="/employees/add" onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <span className="nav-icon">＋</span>
              Add Employee
            </NavLink>

            <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <span className="nav-icon">ⓘ</span>
              About
            </NavLink>

            <NavLink to="/admin" onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Admin Panel
            </NavLink>

            <NavLink to="/admin/settings" onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Settings
            </NavLink>

            <NavLink to="/home" onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <span className="nav-icon">⌂</span>
              Home
            </NavLink>
          </nav>

          <div className="sidebar-footer">
            <span className="status-dot" />
            <span>
              <strong>System Ready</strong>
              <small>Employee workspace</small>
            </span>
          </div>
        </aside>

        <main className="main-content">
          <header className="topbar">
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              ☰
            </button>

            <div>
              <p className="topbar-label">EMPLOYEE MANAGEMENT</p>
              <h2>Admin Workspace</h2>
            </div>

            <div className="admin-profile">
              <span className="profile-avatar">A</span>
              <span>
                <strong>Administrator</strong>
                <small>Admin</small>
              </span>
              <button
                type="button"
                className="logout-button"
                onClick={() => {
                  sessionStorage.removeItem("authToken");
                  window.location.href = `${import.meta.env.BASE_URL}login`;
                }}
              >
                Logout
              </button>
            </div>
          </header>

          <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/employees" element={<EmployeeList />} />

            <Route
              path="/employees/add"
              element={
                <EmployeeForm
                  onSave={(employee) => {
                    dispatch(
                      addEmployee({
                        ...employee,
                        id: employee.id ?? Date.now(),
                        status: employee.status as "Active" | "Inactive",
                      })
                    );
                  }}
                />
              }
            />

            <Route path="/employees/edit" element={<EmployeeList />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
