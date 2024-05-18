import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { ComposeMail } from "@/app/redux/THUNK/MESSAGE-THUNK/messageslicethunk";
import { useAppDispatch, useAppSelector } from "@/app/redux/STORE/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
};

const ComposeDialog = ({ open, handleClose }: any) => {
  const { messages, emailSend } = useAppSelector((state) => state.message);
  console.log(emailSend);

  const dispatch = useAppDispatch();
  const handleEmailFormSubmit = async (e: any) => {
    e.preventDefault();
    console.log("ComposeDialog called");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data);
    await dispatch(ComposeMail(data));
    //handleClose();
  };
  const notify = () => toast.error("System has detected as spam mail");
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="compose-dialog-title"
      aria-describedby="compose-dialog-description"
    >
      <Box sx={style}>
        <h2 className="mb-5" id="compose-dialog-title">
          New Message
        </h2>
        <form onSubmit={handleEmailFormSubmit}>
          <div className="mb-4">
            <TextField
              fullWidth
              label="To"
              name="recipient"
              type="email"
              variant="outlined"
              className="mb-2"
            />
            <TextField
              fullWidth
              label="Subject"
              name="header"
              variant="outlined"
              className="mb-2"
            />
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              name="body"
              multiline
              rows={4}
              className="mb-2"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
            <button onClick={notify}>Notify !</button>
          </div>
        </form>
        <ToastContainer />
      </Box>
    </Modal>
  );
};

export default ComposeDialog;
