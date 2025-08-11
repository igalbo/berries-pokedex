import { Button, Container, Typography } from "@mui/material";

export default function App() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Berries Pokedex
      </Typography>
      <Button variant="contained" color="primary">
        Soft
      </Button>
      <Button variant="contained" color="secondary">
        Hard
      </Button>
      <Button variant="contained" color="success">
        Very Hard
      </Button>
    </Container>
  );
}
