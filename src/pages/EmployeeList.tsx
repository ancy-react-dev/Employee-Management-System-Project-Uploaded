


import { useEffect, useState } from "react";
import type React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../app/hooks";

import {
  fetchEmployees,
  addEmployeeAsync,
  updateEmployeeAsync,
  deleteEmployeeAsync,
} from "../features/employees/employeeSlice";

import type {
  Employee,
} from "../features/employees/employeeSlice";


function EmployeeList() {
  
const employees = useAppSelector(
  (state) => state.employees.employees
);
const loading = useAppSelector((state) => state.employees.loading);
const error = useAppSelector((state) => state.employees.error);
const dispatch = useAppDispatch();
useEffect(() => {
  dispatch(fetchEmployees());
}, [dispatch]);
 const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
const [statusFilter, setStatusFilter] = useState("All");
const [sortOrder, setSortOrder] = useState("A-Z");
const [currentPage, setCurrentPage] = useState(1);

const employeesPerPage = 5;
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState<Employee>({
    id: 0,
    name: "",
    email: "",
    department: "",
    designation: "",
    joiningDate: "",
    status: "Active",
  });
const filteredEmployees = employees
  .filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  )
  .filter((employee) =>
    departmentFilter === "All"
      ? true
      : employee.department === departmentFilter
  )
  .filter((employee) =>
    statusFilter === "All"
      ? true
      : employee.status === statusFilter
  )
  .sort((a, b) =>
    sortOrder === "A-Z"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

const currentEmployees = filteredEmployees.slice(
  (currentPage - 1) * employeesPerPage,
  currentPage * employeesPerPage
);
 
  

 
function handleEdit(employee: Employee) {
  setForm({ ...employee });
  setEditingId(employee.id);
  setMessage("");
}

function handleChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) {
  setForm({ ...form, [e.target.name]: e.target.value });
}





async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (
    !form.name.trim() ||
    !form.email.trim() ||
    !form.department ||
    !form.designation.trim() ||
    !form.joiningDate
  ) {
    setMessage("Please fill in all required fields.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    setMessage("Please enter a valid email address.");
    return;
  }

  if (editingId === null) {
    setMessage("Please select an employee to edit.");
    return;
  }

  const updatedEmployee: Employee = {
    ...form,
    id: editingId,
    status: form.status,
  };

  try {
    await dispatch(updateEmployeeAsync(updatedEmployee)).unwrap();

    setEditingId(null);
    setForm({
      id: 0,
      name: "",
      email: "",
      department: "",
      designation: "",
      joiningDate: "",
      status: "Active",
    });

    setMessage("Employee updated successfully!");
  } catch (error) {
    console.error(error);
    setMessage("Update failed. Please try again.");
  }
}

async function handleAddEmployee(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  if (
    !form.name.trim() ||
    !form.email.trim() ||
    !form.department ||
    !form.designation.trim() ||
    !form.joiningDate
  ) {
    setMessage("Please fill in all required fields.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
  setMessage("Please enter a valid email address.");
  return;
}

  const newEmployee: Employee = {
    ...form,
    id: Date.now(),
    status: form.status as "Active" | "Inactive",
  };

  try {
    await dispatch(addEmployeeAsync(newEmployee)).unwrap();
setSearch("");
setCurrentPage(1);
    setForm({
      id: 0,
      name: "",
      email: "",
      department: "",
      designation: "",
      joiningDate: "",
      status: "Active",
    });

    setMessage("Employee added successfully!");
  } catch {
    setMessage("Failed to add employee. Please try again.");
  }
}

function handleDeleteEmployee(id: number) {
  dispatch(deleteEmployeeAsync(id));

  if (editingId === id) {
    setEditingId(null);
  }

  setMessage("Employee deleted successfully!");
}

 return (
    <div style={{ padding: "20px" }}>
      <h1>Employee Management</h1>

      {message && <p>{message}</p>}
{loading && <p>Loading employees...</p>}

{error && <p>Error: {error}</p>}

{!loading && !error && employees.length === 0 && (
  <p>No employees found.</p>
)}

      {editingId === null && (
        <form onSubmit={handleAddEmployee}>
          <h2>Add Employee</h2>

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>

          <input
            name="designation"
            placeholder="Designation"
            value={form.designation}
            onChange={handleChange}
            required
          />

          <input
            name="joiningDate"
            type="date"
            value={form.joiningDate}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button type="submit">Add Employee</button>
        </form>
      )}

      {editingId !== null && (
        <form onSubmit={handleUpdate}>
          <h2>Edit Employee</h2>

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>

          <input
            name="designation"
            placeholder="Designation"
            value={form.designation}
            onChange={handleChange}
            required
          />

          <input
            name="joiningDate"
            type="date"
            value={form.joiningDate}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button type="submit">Update Employee</button>

          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setMessage("");
            }}
          >
            Cancel
          </button>
        </form>
      )}

      
<div style={{ marginBottom: "20px" }}>
  <select
    value={departmentFilter}
    onChange={(e) => {
      setDepartmentFilter(e.target.value);
      setCurrentPage(1);
    }}
  >
    <option value="All">All Departments</option>
    <option value="IT">IT</option>
    <option value="HR">HR</option>
    <option value="Finance">Finance</option>
    <option value="Marketing">Marketing</option>
  </select>

  <select
    value={statusFilter}
    onChange={(e) => {
      setStatusFilter(e.target.value);
      setCurrentPage(1);
    }}
  >
    <option value="All">All Status</option>
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
  </select>

  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
  >
    <option value="A-Z">Name A-Z</option>
    <option value="Z-A">Name Z-A</option>
  </select>
</div>


      <table
        border={1}
        cellPadding={10}
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Joining Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.designation}</td>
              <td>{employee.joiningDate}</td>
              <td>{employee.status}</td>
              <td>
                <button onClick={() => alert(JSON.stringify(employee, null, 2))}>
                  View
                </button>{" "}
                <button onClick={() => handleEdit(employee)}>
                  Edit
                </button>{" "}
                <button onClick={() => handleDeleteEmployee(employee.id)}>
  Delete
</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
<div style={{ marginTop: "20px" }}>
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((page) => page - 1)}
  >
    Previous
  </button>

  <span style={{ margin: "0 12px" }}>
    Page {currentPage} of {Math.max(totalPages, 1)}
  </span>

  <button
    disabled={currentPage >= totalPages}
    onClick={() => setCurrentPage((page) => page + 1)}
  >
    Next
  </button>
</div>


      
    </div>
  );
}

export default EmployeeList;
