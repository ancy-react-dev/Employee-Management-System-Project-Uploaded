
import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../features/employees/employeeSlice";

const savedEmployees = localStorage.getItem("employees");

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
  preloadedState: savedEmployees
    ? {
        employees: {
          employees: JSON.parse(savedEmployees),
          loading: false,
          error: null,
        },
      }
    : undefined,
});

store.subscribe(() => {
  const employees = store.getState().employees.employees;
  localStorage.setItem("employees", JSON.stringify(employees));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
