import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { FirmnessSlider } from "./components/FirmnessSlider";
import { SearchBar } from "./components/SearchBar";
import { BerryCard } from "./components/BerryCard";
import { useBerries } from "./hooks/useBerries";

export default function App() {
  const {
    loading,
    error,
    filteredBerries,
    selectedFirmness,
    searchQuery,
    setSelectedFirmness,
    setSearchQuery,
    firmnessCounts,
  } = useBerries();

  if (loading) {
    return (
      <Container className="loading-container">
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading berries...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="error-container">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="app-container">
      <Typography variant="h4" gutterBottom>
        Berries Pokedex
      </Typography>
      <Paper elevation={4} className="main-paper">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{
            flex: { xs: "none", sm: 1 },
            overflow: { xs: "visible", sm: "hidden" },
          }}
        >
          <Box sx={{ minWidth: { sm: "auto" } }}>
            <FirmnessSlider
              selectedFirmness={selectedFirmness}
              onFirmnessChange={setSelectedFirmness}
              firmnessCounts={firmnessCounts}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: { xs: "visible", sm: "hidden" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-end" },
                mb: { xs: 1, sm: 0 },
              }}
            >
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </Box>
            <Box
              sx={{
                mt: 2,
                flex: { xs: "none", sm: 1 },
                overflow: { xs: "visible", sm: "auto" },
                p: 2,
              }}
            >
              <Stack direction="column" spacing={2}>
                {filteredBerries.length > 0 ? (
                  filteredBerries.map((berry) => (
                    <BerryCard key={berry.id} berry={berry} />
                  ))
                ) : (
                  <Typography variant="body1" color="textDisabled">
                    No berries found matching your criteria.
                  </Typography>
                )}
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
