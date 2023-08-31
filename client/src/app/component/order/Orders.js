import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import { Button, Box } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setUpdate } from "../../model/formSlice";
import {
  fetchUserSkill,
  removeUserSkill,
} from "../../../features/skill/skillSlice";

function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export default function Orders() {
  const dispatch = useDispatch();
  const { skill } = useSelector((state) => state?.skill);
  const { user } = useSelector((state) => state?.account);

  async function openModal(_id = "") {
    if (_id !== "") {
      await dispatch(setUpdate({ res: true, _id }));
    }
    await dispatch(setOpen(true));
  }

  const fetchSkillsData = useCallback(async () => {
    await dispatch(fetchUserSkill(user?._id));
  }, [dispatch, user?._id]);

  useEffect(() => {
    fetchSkillsData();
  }, [fetchSkillsData]);

  const removeSkill = async (id) => {
    try {
      await dispatch(removeUserSkill(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        overflow: "scroll",
        margin: "auto",
      }}
    >
      <Title>Skills</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Language</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Percentage</TableCell>
            <TableCell>Experience</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={6} xs={6}>
          {skill?.map((row, index) => (
            <TableRow sx={3} xs={3} key={row?._id}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{row?.language}</TableCell>
              <TableCell align="center">{row?.level}</TableCell>
              <TableCell align="center">{row?.percentage}</TableCell>
              <TableCell align="center">{row?.experience}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    openModal(row?._id);
                  }}
                >
                  udpate
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => removeSkill(row?._id)}
                  size="small"
                  color="error"
                >
                  remove
                </Button>
              </TableCell>
              <Button></Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          p: 4,
        }}
      >
        <Button
          component={Link}
          color="secondary"
          onClick={() => {
            openModal("");
          }}
          sx={{ mt: 3, display: "flex", justifyContent: "center" }}
        >
          Add Skill
        </Button>
      </Box>
    </Box>
  );
}
