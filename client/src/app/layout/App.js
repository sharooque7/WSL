import {
  CssBaseline,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Header from "./Header";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Starting from "../layout/Starting";

function App() {
  const paletteType = false ? "dark" : "light";

  const { init } = useSelector((state) => state.account);

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "eaeaea" : "#121212",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />

      <Header />

      {!init ? (
        <Container
          sx={{
            mt: 4,
          }}
        >
          <Outlet />
        </Container>
      ) : (
        <Starting />
      )}
    </ThemeProvider>
  );
}
export default App;
