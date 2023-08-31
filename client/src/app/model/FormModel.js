import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Tech from "../../features/skill/Tech";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setUpdate } from "../model/formSlice";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function FormModel() {
  const open = useSelector((state) => state.modal.open);
  const dispatch = useDispatch();

  const handleClose = async () => {
    await dispatch(setUpdate({ res: false, _id: "" }));
    await dispatch(setOpen(false));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Tech />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close Modal</Button>
      </DialogActions>
    </Dialog>
  );
}
