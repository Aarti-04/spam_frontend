"use client";
import React, { useState } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ComposeDialog from "./ComposeDialog";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
const ComposeButton = () => {
  const [open, setOpen] = useState(false);

  const HandleOpen = () => {
    setOpen(true);
    console.log("handleopen called");
  };
  const HandleClose = () => {
    console.log("handle close called");
    // setOpen(!open);
    setOpen(false); // Use functional update form
  };
  console.log(open);

  return (
    <Box
      sx={{
        backgroundColor: "#c2e7fe",
        fontSize: "15px",
        height: "60px",
        borderRadius: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mx: "1rem",
        mb: "1rem",
        width: "200px", // Fixed width in pixels
        cursor: "pointer",
        boxShadow: "0 3px 5px rgba(0, 0, 0, 0.4)",
        "&:hover": {
          backgroundColor: "#b0d4f5",
        },
      }}
    >
      <EditIcon onClick={() => HandleOpen()} sx={{ marginRight: "10px" }} />
      Compose
      <ComposeDialog open={open} handleClose={() => HandleClose()} />
    </Box>
  );
};

export default ComposeButton;
