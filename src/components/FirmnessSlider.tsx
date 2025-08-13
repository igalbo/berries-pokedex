import { Box, Typography, Slider, Stack } from "@mui/material";
import type { FirmnessLevel } from "../types";

interface FirmnessSliderProps {
  selectedFirmness: FirmnessLevel;
  onFirmnessChange: (firmness: FirmnessLevel) => void;
  firmnessCounts: Record<string, number>;
}

const FIRMNESS_DATA: Array<{
  level: FirmnessLevel;
  label: string;
  color: string;
}> = [
  { level: "very-soft", label: "Very Soft", color: "#22c55e" },
  { level: "soft", label: "Soft", color: "#22c55e" },
  { level: "hard", label: "Hard", color: "#fb923c" },
  { level: "very-hard", label: "Very Hard", color: "#f97316" },
  { level: "super-hard", label: "Super Hard", color: "#ef4444" },
];

const getFirmnessData = (firmness: FirmnessLevel) =>
  FIRMNESS_DATA.find((item) => item.level === firmness);

const getFirmnessIndex = (firmness: FirmnessLevel) =>
  FIRMNESS_DATA.findIndex((item) => item.level === firmness);

const getFirmnessByIndex = (index: number) => FIRMNESS_DATA[index]?.level;

export const FirmnessSlider = ({
  selectedFirmness,
  onFirmnessChange,
  firmnessCounts,
}: FirmnessSliderProps) => {
  const sliderValue = selectedFirmness ? getFirmnessIndex(selectedFirmness) : 0;
  const currentColor = selectedFirmness
    ? getFirmnessData(selectedFirmness)?.color || "#9e9e9e"
    : "#9e9e9e";

  // click a label to jump slider
  const handlePick = (f: FirmnessLevel) => onFirmnessChange(f);

  return (
    <Box sx={{ width: "100%", p: 1 }}>
      <Typography variant="h6">Firmness Level</Typography>
      <Typography variant="body1" gutterBottom color="textSecondary">
        How tough are you?
      </Typography>

      <Box sx={{ display: "flex", gap: 3, ml: 3, mt: 7 }}>
        {/* Slider */}
        <Box sx={{ "--thumbColor": currentColor }}>
          <Slider
            orientation="vertical"
            min={0}
            max={FIRMNESS_DATA.length - 1}
            step={1}
            value={sliderValue}
            onChangeCommitted={(_, v: number | number[]) =>
              onFirmnessChange(getFirmnessByIndex(v as number))
            }
            marks={FIRMNESS_DATA.map((_, i) => ({ value: i }))}
            track={false}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          sx={{ py: 1, userSelect: "none", mt: -3 }}
        >
          {FIRMNESS_DATA.map((item) => {
            const active = selectedFirmness === item.level;
            const count = firmnessCounts[item.level] || 0;
            const disabled = count === 0;

            return (
              <Box
                key={item.level}
                onClick={() => !disabled && handlePick(item.level)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  cursor: disabled ? "not-allowed" : "pointer",
                  opacity: disabled ? 0.4 : 1,
                  px: 0.75,
                  py: 0.25,
                  mb: 4,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: active ? item.color : "#000",
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    width: 22,
                  }}
                  color="textSecondary"
                >
                  {count}
                </Typography>
              </Box>
            );
          }).reverse()}
        </Stack>
      </Box>
    </Box>
  );
};

export default FirmnessSlider;
