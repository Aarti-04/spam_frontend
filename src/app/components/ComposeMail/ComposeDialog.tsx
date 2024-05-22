import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, TextareaAutosize } from "@mui/material";
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
  const { ComposeMailError, ComposeMailStatus, mailComposedOrNot } =
    useAppSelector((state) => state.message);

  const dispatch = useAppDispatch();
  const {
    predictedEmailStatus,
    predictedEmailError,
    predictedEmailIsSpamOrNot,
  } = useAppSelector((state) => state.message);
  const handleEmailFormSubmit = async (e: any) => {
    e.preventDefault();
    // console.log("body..", body);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data["header"]);
    setComposeData(data);

    console.log("predictedEmailStatus", predictedEmailStatus);
    console.log("predictedEmailError", predictedEmailError);
    console.log("predictedEmailIsSpamOrNot", predictedEmailIsSpamOrNot);

    if (data["body"] !== "") {
      const res = await dispatch(
        predictMail({ body: data["body"] ? data["body"] : data["header"] })
      );
      console.log(res);
    } else {
      await dispatch(ComposeMail(data));
    }
  };
  // console.log(alertOpen);

  // const notify = (str: string | boolean) => toast.error(str);
  const sendAnywayHandler = async () => {
    await dispatch(ComposeMail(composeData));
    console.log(ComposeMailStatus);
    console.log(ComposeMailError);
  };
  const alertHandler = (confirmationAlertResponse = "") => {
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
            sx={{ alignItems: "right" }}
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
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="contained" color="primary">
                Send
              </Button>
              {userWantToReportMail && (
                <Button type="button">Teach System it's not a spam</Button>
              )}
              {/* <button onClick={notify}>Notify</button> */}
            </div>
            {/* <div>
                  {predictedEmailStatus == "success" &&
                    toast.warning(predictedEmailIsSpamOrNot)}
                  {predictedEmailStatus == "successwithError" &&
                    toast.error(predictedEmailError)}
                </div> */}
          </form>
          <Box>
            {predictedEmailStatus == "success" && predictedEmailIsSpamOrNot && (
              // <AlertButton
              //   open={alertOpen}
              //   setOpen={() => alertHandler()}
              //   errorMessage={`System has detected this mail as not a Spam `}
              // ></AlertButton>
              // <p>spam mail</p>
              <ConfirmationDialogBox
                open={alertOpen}
                setOpen={() => alertHandler()}
                message={
                  "System has detected this mail as Spam Mail \n Are you agree with system?? "
                }
              ></ConfirmationDialogBox>
            )}
            {predictedEmailStatus == "successwithError" && (
              <AlertButton
                open={alertOpen}
                setOpen={() => alertHandler()}
                errorMessage={` ${predictedEmailError}`}
              ></AlertButton>
            )}
          </Box>
          <ToastContainer />
        </Box>
      </Modal>
    </>
  );
};

export default ComposeDialog;
