
import type { Employee } from "../features/employees/employeeSlice";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function getEmployees(): Promise<Employee[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  const users: {
    id: number;
    name: string;
    email: string;
  }[] = await response.json();

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    department: "IT",
    designation: "Developer",
    joiningDate: "2026-01-01",
    status: "Active",
  }));
}

export async function addEmployeeAPI(employee: Employee): Promise<Employee> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Failed to add employee");
  }

  return await response.json();
}

export async function updateEmployeeAPI(employee: Employee): Promise<Employee> {
  const response = await fetch(`${API_URL}/${employee.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Failed to update employee");
  }

  return await response.json();
}

export async function deleteEmployeeAPI(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }
}
