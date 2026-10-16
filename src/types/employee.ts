
export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: "Active" | "Inactive";
}
