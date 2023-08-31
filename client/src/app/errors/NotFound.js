import React from "react";
import { Container, Divider, Paper, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography gutterBottom variant="h3">
        Oops - we could not find what you are looking for{" "}
      </Typography>
      <Divider />
    </Container>
  );
};

export default NotFound;
