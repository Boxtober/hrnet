import { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import Modal from "hrnet-modal-boxtober";
import { useForm, Controller } from "react-hook-form";
import { addEmployee, Employee } from "../../redux/employeeSlice";
import { useAppDispatch } from "../../redux/hooks";
import StateSelect from "../StateSelect/StateSelect";

const EmployeeForm = () => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Employee>({
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      startDate: "",
      department: "",
      street: "",
      city: "",
      state: "",
      zipCode: 0,
    },
  });

  const onSubmit = (data: Employee) => {
    console.log("Form submitted:", data);
    dispatch(addEmployee(data));
    setShowModal(true);
  };

  return (
    <>
      <Box
        component="form"
        id="create-employee"
        className="createemployee"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          padding: "4rem",
        }}>
        <Controller
          name="firstName"
          control={control}
          rules={{
            required: "First name is required",
            minLength: { value: 2, message: "Minimum 2 characters" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          rules={{
            required: "Last name is required",
            minLength: { value: 2, message: "Minimum 2 characters" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          )}
        />

        <Controller
          name="street"
          control={control}
          rules={{ required: "Street is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Street"
              error={!!errors.street}
              helperText={errors.street?.message}
            />
          )}
        />

        <Controller
          name="city"
          control={control}
          rules={{ required: "City is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="City"
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          )}
        />

        <Controller
          name="state"
          control={control}
          rules={{ required: "State is required" }}
          render={({ field }) => (
            <StateSelect
              {...field}
              error={!!errors.state}
              helperText={errors.state?.message}
            />
          )}
        />

        <Controller
          name="zipCode"
          control={control}
          rules={{
            required: "Zip code is required",
            min: { value: 1000, message: "Zip code is required" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Zip Code"
              type="number"
              error={!!errors.zipCode}
              helperText={errors.zipCode?.message}
            />
          )}
        />

        <Controller
          name="dateOfBirth"
          control={control}
          rules={{ required: "Date of birth is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth?.message}
            />
          )}
        />

        <Controller
          name="startDate"
          control={control}
          rules={{ required: "Start date is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
            />
          )}
        />

        <Controller
          name="department"
          control={control}
          rules={{ required: "Department is required" }}
          render={({ field }) => (
            <FormControl error={!!errors.department}>
              <InputLabel id="department-label">Department</InputLabel>
              <Select {...field} labelId="department-label" label="Department">
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="HR">Human Resources</MenuItem>
                <MenuItem value="Legal">Legal</MenuItem>
              </Select>
              {errors.department && (
                <p
                  style={{
                    color: "#d32f2f",
                    fontSize: "0.75rem",
                    marginTop: "3px",
                  }}>
                  {errors.department.message}
                </p>
              )}
            </FormControl>
          )}
        />

        <Button
          type="submit"
          sx={{
            height: "56px",
            borderRadius: "4px",
            backgroundColor: "#646cff",
            color: "white",
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "bold",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#4b52cc",
            },
          }}>
          Save
        </Button>
      </Box>
      <Modal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};
export default EmployeeForm;
