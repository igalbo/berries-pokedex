import { Card, CardContent, Stack, Typography, Chip, Box } from "@mui/material";
import type { ProcessedBerry } from "../types";

interface BerryCardProps {
  berry: ProcessedBerry;
}

const berryStyles = {
  image: {
    padding: 10,
    width: 40,
    height: 40,
    marginRight: 16,
    borderTop: "1px solid #e0e0e0",
    borderRight: "1px solid #e0e0e0",
    borderBottom: "1px solid #e0e0e0",
    borderRadius: "0 30px 30px 0",
    marginLeft: -16,
    boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.15)",
  },
};

export const BerryCard = ({ berry }: BerryCardProps) => {
  return (
    <Card elevation={2} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <img
              src="/raspberry.svg"
              alt="Berry icon"
              style={berryStyles.image}
            />
            <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
              {berry.name}
            </Typography>
          </Box>
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
              <Typography variant="body2" color="textSecondary">
                No active flavors
              </Typography>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

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
