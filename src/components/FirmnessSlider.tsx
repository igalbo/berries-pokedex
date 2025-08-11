import { Box, Typography, Button, Stack, Chip } from "@mui/material";
import type { FirmnessLevel } from "../types/berry";

interface FirmnessSliderProps {
  selectedFirmness: FirmnessLevel | null;
  onFirmnessChange: (firmness: FirmnessLevel | null) => void;
  firmnessCounts: Record<string, number>;
}

const FIRMNESS_LEVELS: FirmnessLevel[] = [
  "very-soft",
  "soft",
  "hard",
  "very-hard",
  "super-hard",
];

const formatFirmnessLabel = (firmness: string): string => {
  return firmness
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const FirmnessSlider = ({
  selectedFirmness,
  onFirmnessChange,
  firmnessCounts,
}: FirmnessSliderProps) => {
  return (
    <Box sx={{ width: 200, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Firmness Level
      </Typography>

      {/* All berries option */}
      <Button
        fullWidth
        variant={selectedFirmness === null ? "contained" : "outlined"}
        onClick={() => onFirmnessChange(null)}
        sx={{
          mb: 1,
          justifyContent: "space-between",
          textTransform: "none",
        }}
      >
        <span>All Berries</span>
        <Chip
          label={Object.values(firmnessCounts).reduce(
            (sum, count) => sum + count,
            0
          )}
          size="small"
          color={selectedFirmness === null ? "primary" : "default"}
        />
      </Button>

      <Stack spacing={1}>
        {FIRMNESS_LEVELS.map((firmness) => {
          const count = firmnessCounts[firmness] || 0;
          const isSelected = selectedFirmness === firmness;

          return (
            <Button
              key={firmness}
              fullWidth
              variant={isSelected ? "contained" : "outlined"}
              onClick={() => onFirmnessChange(firmness)}
              disabled={count === 0}
              sx={{
                justifyContent: "space-between",
                textTransform: "none",
                opacity: count === 0 ? 0.5 : 1,
              }}
            >
              <span>{formatFirmnessLabel(firmness)}</span>
              <Chip
                label={count}
                size="small"
                color={isSelected ? "primary" : "default"}
              />
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};
