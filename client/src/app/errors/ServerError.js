import { useLocation } from "react-router-dom";
import { Container, Typography, Paper, Divider } from "@mui/material";

const ServerError = () => {
  const { state } = useLocation();
  const { error } = state;
  const { statusText } = error.response;
  const { message } = error.response.data.error;
  return (
    <Container component={Paper}>
      {state.error ? (
        <>
          <Typography gutterBottom variant="h3" color="secondary">
            {statusText}
          </Typography>
          <Divider />
          <Typography variant="body1">
            {message || "internal sever error"}
          </Typography>
        </>
      ) : (
        <Typography gutterBottom variant="h5">
          Server error
        </Typography>
      )}
    </Container>
  );
};

export default ServerError;
