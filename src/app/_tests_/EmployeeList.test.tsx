
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../features/employees/employeeSlice";
import EmployeeList from "../pages/EmployeeList";

function renderWithProvider() {
  const store = configureStore({
    reducer: {
      employees: employeesReducer,
    },
  });

  return render(
    <Provider store={store}>
      <EmployeeList />
    </Provider>
  );
}

describe("EmployeeList", () => {
  it("renders the employee list page", () => {
    renderWithProvider();

   expect(
  screen.getByText("Ajay")
).toBeTruthy();
  });
});
