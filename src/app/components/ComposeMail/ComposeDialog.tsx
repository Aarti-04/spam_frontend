import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  TextareaAutosize,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  ComposeMail,
  predictMail,
} from "@/app/redux/THUNK/MESSAGE-THUNK/messageslicethunk";
import { useAppDispatch, useAppSelector } from "@/app/redux/STORE/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader";
import AlertButton from "../Alert";
import Image from "next/image";
import { setPredictedStateToInitial } from "@/app/redux/SLICE/MessageSlice/messageSlice";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmationDialogBox from "../DialogBoxes/ConfirmationDialogBox";
import SpamMailConfirmationDialog from "./SpamMailConfirmationDialog";
import AttachFileIcon from "@mui/icons-material/AttachFile";
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
interface ComposeMailInterface {
  recipient: string;
  header: string;
  body: string;
}
const ComposeDialog = ({ open, handleClose }: any) => {
  const [recipient, setRecipient] = useState<{}>({ "": "" });
  const [header, setHeader] = useState<any>("");
  const [alertOpen, setAlertOpen] = useState<boolean>(true);
  const [body, setBody] = useState<any>({ "": "" });
  const [composeData, setComposeData] = useState<any>();
  const [userWantToReportMail, setWantToReportMail] = useState<boolean>(false);
  const [spamConfirmationOpen, setSpamConfirmationOpen] = useState(true);
  const [attachment, setAttachment] = useState(null);
  const { ComposeMailError, ComposeMailStatus, mailComposedOrNot } =
    useAppSelector((state) => state.message);

  const dispatch = useAppDispatch();
  const fileInputRef = useRef(null);
  const {
    predictedEmailStatus,
    predictedEmailError,
    predictedEmailIsSpamOrNot,
    spamMailFeedBack,
  } = useAppSelector((state) => state.message);
  const SpamConfirmationHandler = () => {
    setSpamConfirmationOpen(!spamConfirmationOpen);
  };
  const handleFileChange = (e: any) => {
    setAttachment(e.target.files[0]);
  };
  const handleEmailFormSubmit = async (e: any) => {
    e.preventDefault();
    setSpamConfirmationOpen(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    setComposeData(data);
    console.log("predictedEmailStatus", predictedEmailStatus);
    console.log("predictedEmailError", predictedEmailError);
    console.log("predictedEmailIsSpamOrNot", predictedEmailIsSpamOrNot);
    console.log(data);
    if (data["body"] !== "") {
      const res = await dispatch(
        predictMail({ body: data["body"] ? data["body"] : data["header"] })
      );
      console.log(res);
      console.log(predictedEmailIsSpamOrNot);
      console.log(predictedEmailIsSpamOrNot);

      if (predictedEmailStatus == "success" && spamMailFeedBack == "spam") {
        console.log(data);

        dispatch(ComposeMail(data));
      }
    } else {
      alert("You are sending mail without header and body");
      await dispatch(ComposeMail(data));
    }
  };

  const alertHandler = (confirmationAlertResponse = "") => {
    console.log("confirmationAlertResponse", confirmationAlertResponse);

    setAlertOpen(false);
    // setTimeout(() => {
    if (confirmationAlertResponse) {
      dispatch(ComposeMail(composeData));
    } else {
      setWantToReportMail(true);
      setAlertOpen(true);
    }
    dispatch(setPredictedStateToInitial());
    //   console.log("called....");
    // }, 4000);
  };
  const feedbackHandler = () => {
    console.log("hello");
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="compose-dialog-title"
        aria-describedby="compose-dialog-description"
      >
        <Box sx={style}>
          <CloseIcon
            sx={{ alignItems: "right", marginLeft: "100%", marginTop: "0" }}
            onClick={() => {
              dispatch(setPredictedStateToInitial());
              handleClose();
            }}
          ></CloseIcon>
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
                required
                onChange={(e) =>
                  setRecipient({ [e.target.name]: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Subject"
                name="header"
                variant="outlined"
                className="mb-2 mt-2 pt-5"
                onChange={(e) => setHeader({ [e.target.name]: e.target.value })}
              />
              <TextareaAutosize
                maxRows={10}
                minRows={5}
                className="mb-2"
                placeholder="body"
                name="body"
                style={{
                  border: "solid 1px",
                  padding: "5px",
                  margin: "2px",
                }}
                cols={38}
                onChange={(e) => setBody({ [e.target.name]: e.target.value })}
              />
              <Button type="submit" variant="contained" color="primary">
                Send
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <IconButton
                color="primary"
                aria-label="attach file"
                component="span"
                onClick={() => fileInputRef.current.click()}
              >
                <Tooltip title="Attachment File">
                  <AttachFileIcon />
                </Tooltip>
              </IconButton>
            </div>
            <div className="flex justify-end">
              {userWantToReportMail && (
                <Button type="button" onClick={() => feedbackHandler()}>
                  Teach System it's not a spam
                </Button>
              )}
            </div>
          </form>
          <Box>
            {predictedEmailStatus == "success" && predictedEmailIsSpamOrNot && (
              // <ConfirmationDialogBox
              //   open={alertOpen}
              //   setOpen={() => alertHandler()}
              //   message={
              //     "System has detected this mail as Spam Mail \n  ? "
              //   }
              // ></ConfirmationDialogBox>
              <SpamMailConfirmationDialog
                open={spamConfirmationOpen}
                setOpen={() => SpamConfirmationHandler()}
                emailData={composeData}
              ></SpamMailConfirmationDialog>
            )}
            {predictedEmailStatus == "successwithError" && (
              <AlertButton
                open={alertOpen}
                setOpen={() => alertHandler()}
                errorMessage={` ${predictedEmailError}`}
              ></AlertButton>
            )}
            {mailComposedOrNot && toast.success("Mail sent successfully")}
          </Box>
          <ToastContainer />
        </Box>
      </Modal>
    </>
  );
};

export default ComposeDialog;
