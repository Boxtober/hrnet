import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import Modal from "../modal/Modal";
import "./employeeForm.scss";
import { SelectChangeEvent } from "@mui/material/Select";

interface Employee {
  firstName: string;
  lastName: string;
  birthDate: string;
  startDate: string;
  department: string;
}

const EmployeeForm: React.FC = () => {
  const [formData, setFormData] = useState<Employee>({
    firstName: "",
    lastName: "",
    birthDate: "",
    startDate: "",
    department: "",
  });

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as keyof Employee]: value as string,
    }));
  };
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmpty = Object.values(formData).some((val) => val.trim() === "");
    if (isEmpty) {
      alert("Please fill in all fields.");
      return;
    }

    setEmployees((prev) => [...prev, formData]);
    console.log("Employés enregistrés :", [...employees, formData]);

    setShowModal(true);

    setFormData({
      firstName: "",
      lastName: "",
      birthDate: "",
      startDate: "",
      department: "",
    });
  };

  return (
    <>
      <Box
        component="form"
        id="create-employee"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300 }}>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Date of Birth"
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Start Date"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
        />
        <FormControl required>
          <InputLabel id="department-label">Department</InputLabel>
          <Select
            labelId="department-label"
            name="department"
            value={formData.department}
            label="Department"
            onChange={handleSelectChange}>
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="marketing">Marketing</MenuItem>
            <MenuItem value="engineering">Engineering</MenuItem>
            <MenuItem value="hr">Human Resources</MenuItem>
            <MenuItem value="legal">Legal</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Box>

      <Modal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default EmployeeForm;
