import React, { useState } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ComposeDialog from "./ComposeDialog";

const ComposeButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <ComposeDialog open={open} handleClose={handleClose}></ComposeDialog>
    </div>
  );
};

export default ComposeButton;
