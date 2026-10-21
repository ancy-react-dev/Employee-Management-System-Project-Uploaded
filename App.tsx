
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";

import EmployeeList from "./pages/EmployeeList";
import EmployeeForm from "./pages/EmployeeForm";
import { useAppDispatch } from "./app/hooks";
import { addEmployee } from "./features/employees/employeeSlice";
import "./App.css";

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
     <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
}

function App() {
    const dispatch = useAppDispatch();

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <nav>
       <Link to="/dashboard">Dashboard</Link>
        <Link to="/employees">Employee List</Link>{" | "}
        <Link to="/employees/add">Add Employee</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
<Route path="/login" element={<Login />} />
<Route path="/dashboard" element={<Dashboard />} />
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
        <Route
          path="/employees/edit"
          element={<EmployeeList />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
