import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

export default function AlertButton({ open, setOpen }: any) {
  //   const [open, setOpen] = React.useState(true);
  const { messages, status, error } = useSelector(
    (state: any) => state.message
  );
  return (
    <Box sx={{ width: "50%", marginTop: "1rem" }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={setOpen}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Something went wrong try again {error}
        </Alert>
      </Collapse>
    </Box>
  );
}