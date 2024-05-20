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
  const [header, setHeader] = useState<{}>("");
  const [body, setBody] = useState<any>({ "": "" });

  const [composeData, setComposeData] = useState<any>();
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
    console.log("ComposeDialog called");
    console.log("body..", body);
    console.log(body["body"]);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    await dispatch(predictMail({ body: body["body"] }));
    // setComposeData(data);
    // console.log("Form Data:", data["body"]);

    //handleClose();
  };

  const notify = (str: string | boolean) => toast.error(str);
  const sendAnywayHandler = async () => {
    await dispatch(ComposeMail(composeData));
    console.log(ComposeMailStatus);
    console.log(ComposeMailError);
  };
  // console.log(predictedEmailError);
  // console.log(predictedEmailStatus);
  const [alertOpen, setAlertOpen] = useState<boolean>(true);
  let componant_to_render = "";
  const alertHandler = () => {
    setAlertOpen(false);
  };
  console.log(predictedEmailStatus);
  console.log(ComposeMailError);
  console.log(predictedEmailIsSpamOrNot);

  return (
    <>
      <Box sx={{ padding: "20px", margin: "10px" }}>{}</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="compose-dialog-title"
        aria-describedby="compose-dialog-description"
      >
        {ComposeMailStatus == "loading" ? (
          <Loader></Loader>
        ) : (
          <>
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
                    onChange={(e) =>
                      setHeader({ [e.target.name]: e.target.value })
                    }
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
                    onChange={(e) =>
                      setBody({ [e.target.name]: e.target.value })
                    }
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" variant="contained" color="primary">
                    Send
                  </Button>
                  {/* <button onClick={notify}>Notify</button> */}
                  {predictedEmailStatus == "success" && (
                    <>
                      <Button
                        type="submit"
                        variant="contained"
                        color="error"
                        onClick={() => {
                          sendAnywayHandler;
                        }}
                      >
                        Send Anyways
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => {}}
                      >
                        It's not a spam mail
                      </Button>
                    </>
                  )}
                </div>
                {/* <div>
                  {predictedEmailStatus == "success" &&
                    toast.warning(predictedEmailIsSpamOrNot)}
                  {predictedEmailStatus == "successwithError" &&
                    toast.error(predictedEmailError)}
                </div> */}
              </form>
              <ToastContainer />
            </Box>
          </>
        )}
      </Modal>
    </>
  );
};

export default ComposeDialog;
