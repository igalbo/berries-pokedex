import { createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: '"Roboto", sans-serif',
        h6: {
          fontWeight: 600,
        },
      },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            '&.app-container': {
              paddingTop: 32,
              paddingBottom: 32,
              height: { xs: "auto", sm: "100vh" },
              minHeight: { xs: "100vh", sm: "auto" },
              display: "flex",
              flexDirection: "column",
            },
            '&.loading-container': {
              paddingTop: 32,
              paddingBottom: 32,
              display: "flex",
              justifyContent: "center",
            },
            '&.error-container': {
              paddingTop: 32,
              paddingBottom: 32,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            '&.main-paper': {
              padding: 24,
              flex: { xs: "none", sm: 1 },
              overflow: { xs: "visible", sm: "hidden" },
              display: "flex",
              flexDirection: "column",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
          },
        },
      },
      MuiOutlinedInput: {
          styleOverrides: {
            root: {
                borderRadius: 999,
            },
          },
      },
      MuiSlider: {
          styleOverrides: {
            root: {
              height: "288px",
              padding: "16px 0",
              "& .MuiSlider-rail": {
                opacity: 1,
                height: "calc(100% + 32px)",
                top: "-16px",
                background: "linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.04))",
                width: 30,
                borderRadius: 999,
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.16)",
                left: "50%",
                transform: "translateX(-50%)", 
              },
              "& .MuiSlider-thumb": {
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "2px solid #fff",
                backgroundColor: "var(--thumbColor, #9e9e9e)",
                boxShadow: "0 0 18px var(--thumbColor)",
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: "0 0 24px var(--thumbColor), 0 0 0 6px rgba(0,0,0,0.06)",
                },
              },
              "& .MuiSlider-mark": {
                display: "none",
              },
            },
          },
      }
    },
});

export default theme;
