import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { signOut, signIn } from "../../features/account/accountSlice";

import { useDispatch, useSelector } from "react-redux";

export default function ButtonAppBar() {
    const dispatch = useDispatch();
  const islogged = useSelector((state) => state.account.islogged);

  const login = async () => {
    try {
      await dispatch(signIn(islogged));
    } catch (error) {
      console.log(error);
    }
  };

  const loginOut = async () => {
    try {
      await dispatch(signOut(islogged));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Skill
          </Typography>
          <Button color="inherit">Dashboard</Button>
          {islogged ? (
            <Button onClick={loginOut} color="inherit">
              Logout
            </Button>
          ) : (
            <Button onClick={login} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
