import React, { useState } from "react";
import ComposeDialog from "./ComposeDialog";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ComposeButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <ComposeDialog open={open} handleClose={handleClose} />
    </div>
  );
};

export default ComposeButton;
