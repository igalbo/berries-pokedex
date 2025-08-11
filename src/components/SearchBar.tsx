import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchBar = ({ searchQuery, onSearchChange }: SearchBarProps) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search berries by name..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
        },
      }}
    />
  );
};
