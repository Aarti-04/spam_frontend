import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "@/app/redux/STORE/store";
import {
  ComposeMail,
  reportSpam,
} from "@/app/redux/THUNK/MESSAGE-THUNK/messageslicethunk";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Loader";
import { useRouter } from "next/navigation";
import { setMailStateToInitial } from "@/app/redux/SLICE/MessageSlice/messageSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function SpamMailConfirmationDialog({
  open,
  setOpen,
  emailData,
}: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { ComposeMailStatus, ComposeMailError, spamReportStatus } =
    useAppSelector((state: any) => state.message);
  const teachSystemHandler = async () => {
    await dispatch(
      reportSpam({ spamMailFeedBack: "ham", message_body: emailData.body })
    );
    // alert('Teach system');
  };
  useEffect(() => {
    if (spamReportStatus == "success") {
      toast.success("Thank you for feedback");
      dispatch(setMailStateToInitial());
      // setOpen(false);
      // await dispatch(ComposeMail(emailData));
    }
  }, [spamReportStatus]);
  // useEffect(() => {
  //   if (ComposeMailStatus == "success") {
  //     toast.success("Email send Successfully");
  //   }
  //   if (ComposeMailError) {
  //     toast.error(ComposeMailError);
  //   }
  // }, [ComposeMailStatus, ComposeMailError]);
  // const MailSendHandler = async () => {
  //   emailData["detected_as_spam"] = "true";
  //   await dispatch(ComposeMail(emailData));
  // };
  return (
    <>
      {ComposeMailStatus == "loading" && <Loader></Loader>}
      <ToastContainer />
      <BootstrapDialog
        onClose={setOpen}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Spam Mail Confirmation
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={setOpen}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            System has detected this mail as{" "}
            <span className="text-red-700 font-bold">Spam Mail.</span>
          </Typography>
          <Typography gutterBottom>
            Click on <span className="text-blue-500">Send Anyway</span> to send
            as spam mail or Click on Cancle to modify your content
          </Typography>
          <Button onClick={() => teachSystemHandler()}>
            <Typography gutterBottom>
              Teach System It is not a spam mail
            </Typography>
          </Button>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setOpen(true)}>
            Send Anyway
          </Button>
          <Button autoFocus onClick={() => setOpen(false)}>
            Cancel
          </Button>
          {/* <Button onClick={setOpen}>Save changes</Button> */}
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
