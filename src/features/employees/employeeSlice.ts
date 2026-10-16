
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

import {
  getEmployees,
  addEmployeeAPI,
  updateEmployeeAPI,
  deleteEmployeeAPI,
} from "../../services/employeeService";

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: "Active" | "Inactive";
}

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const savedEmployees = localStorage.getItem("employees");
const hasSavedEmployees = savedEmployees !== null;

const initialState: EmployeeState = {
  employees: savedEmployees ? JSON.parse(savedEmployees) : [],
  loading: false,
  error: null,
};

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => getEmployees()
);

export const addEmployeeAsync = createAsyncThunk(
  "employees/addEmployee",
  async (employee: Employee) => {
    try {
      await addEmployeeAPI(employee);
    } catch (error) {
      console.error("Demo API add request failed:", error);
    }
    // Keep the user's ID and details in local state.
    return employee;
  }
);

export const updateEmployeeAsync = createAsyncThunk(
  "employees/updateEmployee",
  async (employee: Employee) => {
    try {
      await updateEmployeeAPI(employee);
    } catch (error) {
      console.error("Demo API update request failed:", error);
    }
    return employee;
  }
);

export const deleteEmployeeAsync = createAsyncThunk(
  "employees/deleteEmployee",
  async (id: number) => {
    try {
      await deleteEmployeeAPI(id);
    } catch (error) {
      console.error("Demo API delete request failed:", error);
    }
    return id;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },

    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(
        (employee) => employee.id === action.payload.id
      );

      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },

    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;

        // Load API data only on the first visit.
        // Do not restore deleted records after refresh.
        if (!hasSavedEmployees) {
          state.employees = action.payload;
        }
      })

      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch employees";
      })

      .addCase(addEmployeeAsync.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })

      .addCase(updateEmployeeAsync.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (employee) => employee.id === action.payload.id
        );

        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })

      .addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload
        );
      });
  },
});

export const { addEmployee, updateEmployee, deleteEmployee } =
  employeeSlice.actions;

export default employeeSlice.reducer;
