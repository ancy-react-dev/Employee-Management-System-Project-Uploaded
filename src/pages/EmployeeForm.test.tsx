
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeForm from "./EmployeeForm";

describe("EmployeeForm", () => {
  it("shows validation error when required fields are empty", () => {
    const onSave = vi.fn();

    render(<EmployeeForm onSave={onSave} />);

    fireEvent.click(
      screen.getByRole("button", { name: "Add Employee" })
    );

    expect(
      screen.getByText("Please fill in all required fields.")
    ).toBeTruthy();

    expect(onSave).not.toHaveBeenCalled();
  });

  it("adds an employee when all required fields are valid", () => {
    const onSave = vi.fn();

    render(<EmployeeForm onSave={onSave} />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter employee name"),
      { target: { value: "Ancy" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter email"),
      { target: { value: "ancy@example.com" } }
    );

    fireEvent.change(
      document.querySelector('select[name="department"]')!,
      { target: { value: "IT" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter designation"),
      { target: { value: "Developer" } }
    );

    fireEvent.change(
      document.querySelector('input[name="joiningDate"]')!,
      { target: { value: "2026-01-15" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Add Employee" })
    );

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Employee added successfully!")).toBeTruthy();
  });
});
