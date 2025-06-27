import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  sx?: any;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search",
  sx,
}: SearchInputProps) {
  return (
    <TextField
      placeholder={placeholder}
      size="small"
      value={value}
      onChange={onChange}
      sx={sx}
      InputProps={{
        startAdornment: (
          //afficher un élément visuel à gauche
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
