import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useMockData, mockEmployees } from "../utils/mockData";

export interface Employee {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  department: string;
  street: string;
  city: string;
  state: string;
  zipCode: number;
}
// const initialState: Employee[] = [];
const initialState: Employee[] = useMockData ? [...mockEmployees] : [];

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee(state, action: PayloadAction<Employee>) {
      console.log("action dans employeeSlice :", action.payload);
      state.push(action.payload);
      console.log("nouvel etat après addEmployee :", state);
    },
  },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
