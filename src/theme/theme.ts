import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#00FF00",
          },
          secondary: {
            main: "#FFA500",
          },
          success: {
            main: "#FF0000",
          },
          background: {
            default: "#f5f5f5",
            paper: "#ffffff",
          },
    },
    typography: {
        fontFamily: '"Roboto", sans-serif',
        h6: {
          fontWeight: 600,
        },
      },
    components: {
    MuiButton: {
        styleOverrides: {
        root: {
            textTransform: "none",
            borderRadius: 8,
        },
        },
    },
    MuiPaper: {
        styleOverrides: {
        root: {
            borderRadius: 12,
        },
        },
    },
    },
});

export default theme;