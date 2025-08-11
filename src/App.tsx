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
    berries,
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
      <Container sx={{ py: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading berries...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container
      sx={{ py: 4, height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h4" gutterBottom>
        Berries Pokedex
      </Typography>
      <Paper
        elevation={4}
        sx={{
          p: 3,
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack direction="row" spacing={3} sx={{ flex: 1, overflow: "hidden" }}>
          <FirmnessSlider
            selectedFirmness={selectedFirmness}
            onFirmnessChange={setSelectedFirmness}
            firmnessCounts={firmnessCounts}
          />
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <Box sx={{ mt: 2, flex: 1, overflow: "auto", p: 2 }}>
              <Stack direction="column" spacing={2}>
                {filteredBerries.length > 0 ? (
                  filteredBerries.map((berry) => (
                    <BerryCard key={berry.id} berry={berry} />
                  ))
                ) : (
                  <Typography variant="body1" color="text.secondary">
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
