import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { states } from "../../utils/states";

interface StateSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  label?: string;
  id?: string;
  error?: string | boolean;
  helperText?: string | boolean;
}

export const StateSelect: React.FC<StateSelectProps> = ({
  value,
  onChange,
  label = "State",
  id = "state",
}) => (
  <FormControl fullWidth required>
    <InputLabel id={`${id}-label`}>{label}</InputLabel>
    <Select
      labelId={`${id}-label`}
      id={id}
      name="state"
      value={value}
      label={label}
      onChange={onChange}>
      <MenuItem value="">
        <em>— Sélectionner un état —</em>
      </MenuItem>
      {states.map((st) => (
        <MenuItem key={st.abbreviation} value={st.abbreviation}>
          {st.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default StateSelect;
