import { Card, CardContent, Stack, Typography, Chip, Box } from "@mui/material";
import type { ProcessedBerry } from "../types/berry";

interface BerryCardProps {
  berry: ProcessedBerry;
}

export const BerryCard = ({ berry }: BerryCardProps) => {
  return (
    <Card elevation={2} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          {/* Left side: Berry name and icon */}
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <img
              src="/raspberry.svg"
              alt="Berry icon"
              style={{
                width: 40,
                height: 40,
                marginRight: 16,
              }}
            />
            <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
              {berry.name}
            </Typography>
          </Box>

          {/* Right side: Flavor chips */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {berry.flavors.length > 0 ? (
              berry.flavors.map((flavor) => (
                <Chip
                  key={flavor}
                  label={flavor}
                  size="small"
                  sx={{
                    textTransform: "capitalize",
                    backgroundColor: getFlavorColor(flavor),
                    color: "white",
                    fontWeight: 500,
                  }}
                />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No active flavors
              </Typography>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

// Helper function to get color for each flavor
const getFlavorColor = (flavor: string): string => {
  const flavorColors: Record<string, string> = {
    spicy: "#FF6B6B",
    dry: "#4ECDC4",
    sweet: "#45B7D1",
    bitter: "#96CEB4",
    sour: "#FFEAA7",
  };
  return flavorColors[flavor] || "#95A5A6";
};
