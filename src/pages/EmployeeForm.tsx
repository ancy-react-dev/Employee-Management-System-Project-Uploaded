
import { useState } from "react";
import type React from "react";
import type { Employee } from "../features/employees/employeeSlice";

type EmployeeFormProps = {
  initialData?: Employee;
  onSave: (employee: Employee) => void;
};

function EmployeeForm({ initialData, onSave }: EmployeeFormProps) {
  const [form, setForm] = useState<Employee>(
    initialData ?? {
      id: 0,
      name: "",
      email: "",
      department: "",
      designation: "",
      joiningDate: "",
      status: "Active",
    }
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.department ||
      !form.designation.trim() ||
      !form.joiningDate
    ) {
      setError("Please fill in all required fields.");
      setSuccess("");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      setSuccess("");
      return;
    }

    onSave(form);
    setError("");
    setSuccess(
      initialData ? "Employee updated successfully!" : "Employee added successfully!"
    );

    if (!initialData) {
  setForm({
    id: 0,
    name: "",
    email: "",
    department: "",
    designation: "",
    joiningDate: "",
    status: "Active",
  });
}
  }

  return (
    <div style={{ maxWidth: 500, margin: "20px auto" }}>
      <h2>{initialData ? "Edit Employee" : "Add Employee"}</h2>

      <form onSubmit={handleSubmit}>
        <label>Name *</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter employee name"
          style={{ display: "block", width: "100%", marginBottom: 12 }}
        />

        <label>Email *</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
          style={{ display: "block", width: "100%", marginBottom: 12 }}
        />

        <label>Department *</label>
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          style={{ display: "block", width: "100%", marginBottom: 12 }}
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>

        <label>Designation *</label>
        <input
          name="designation"
          value={form.designation}
          onChange={handleChange}
          placeholder="Enter designation"
          style={{ display: "block", width: "100%", marginBottom: 12 }}
        />

        <label>Joining Date *</label>
        <input
          name="joiningDate"
          type="date"
          value={form.joiningDate}
          onChange={handleChange}
          style={{ display: "block", width: "100%", marginBottom: 12 }}
        />

        <label>Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={{ display: "block", width: "100%", marginBottom: 12 }}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button type="submit">
          {initialData ? "Update Employee" : "Add Employee"}
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
