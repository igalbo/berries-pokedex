import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchBar = ({ searchQuery, onSearchChange }: SearchBarProps) => {
  const handleClear = () => {
    onSearchChange("");
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search by name..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                edge="end"
                size="small"
                aria-label="clear search"
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{
        width: 240,
        m: 1,
        "& .MuiOutlinedInput-root": {
          height: "36px", // Make it smaller
        },
        "& .MuiOutlinedInput-input": {
          padding: "8px 0", // Reduce vertical padding
        },
      }}
    />
  );
};
