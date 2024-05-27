import React, { useEffect, useState, useRef } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  TextareaAutosize,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ComposeMail,
  predictMail,
} from '@/app/redux/THUNK/MESSAGE-THUNK/messageslicethunk';
import { useAppDispatch, useAppSelector } from '@/app/redux/STORE/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setPredictedStateToInitial } from '@/app/redux/SLICE/MessageSlice/messageSlice';
import CloseIcon from '@mui/icons-material/Close';
import SpamMailConfirmationDialog from './SpamMailConfirmationDialog';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useRouter } from 'next/navigation';
import MailDataConfirmationDialog from './MailDataConfirmationDialog';
import AlertButton from '../Alert';
import Loader from '../Loader';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 5,
};
interface ComposeMailInterface {
  recipient: string;
  header: string;
  body: string;
}
const ComposeDialog = ({ open, handleClose }: any) => {
  const [recipient, setRecipient] = useState<string>('');
  const [header, setHeader] = useState<any>('');
  const [alertOpen, setAlertOpen] = useState<boolean>(true);
  const [body, setBody] = useState<any>({ '': '' });
  const [composeData, setComposeData] = useState<any>();
  const [spamConfirmationOpen, setSpamConfirmationOpen] = useState(true);
  const [attachment, setAttachment] = useState(null);
  const [confirmSendMail, setConfirmSendMail] = useState<boolean>(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false); // State for the confirmation dialog
  const [formSubmitPending, setFormSubmitPending] = useState<any>(null);
  const router = useRouter();
  const { ComposeMailError, ComposeMailStatus } = useAppSelector(
    (state) => state.message
  );

  const dispatch = useAppDispatch();
  const fileInputRef = useRef(null);
  const {
    predictedEmailStatus,
    predictedEmailError,
    predictedEmailIsSpamOrNot,
  } = useAppSelector((state) => state.message);
  const SpamConfirmationHandler = (isSendAnyWayMail: boolean = false) => {
    console.log('send any way compose', isSendAnyWayMail);

    if (isSendAnyWayMail) dispatch(ComposeMail(composeData));
    setSpamConfirmationOpen(!spamConfirmationOpen);
  };
  const handleFileChange = (e: any) => {
    setAttachment(e.target.files[0]);
  };
  const handleEmailFormSubmit = async (e: any) => {
    console.log(ComposeMailStatus);
    console.log(predictedEmailIsSpamOrNot);
    console.log(predictedEmailStatus);

    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    setComposeData(data);
    if (!data['header'] || !data['body']) {
      setConfirmDialogOpen(true);
      setFormSubmitPending(data);
    } else {
      const body = data['body'] ? data['body'] : data['header'];
      const res = await dispatch(predictMail({ body: body }));
      if (predictedEmailStatus == 'success' && predictedEmailIsSpamOrNot) {
        setSpamConfirmationOpen(true);
      } else {
        setConfirmSendMail(true);
      }
      // console.log(res.payload.data);
    }
  };
  console.log(ComposeMailStatus);
  console.log(predictedEmailIsSpamOrNot);
  console.log(predictedEmailStatus);
  useEffect(() => {
    (async () => {
      console.log('mail compose toast use effect');

      // if (predictedEmailStatus == 'success' && predictedEmailIsSpamOrNot) {
      //   setSpamConfirmationOpen(true);
      // } else {
      //   // console.log("data to compose", composeData);
      if (confirmSendMail) {
        await dispatch(ComposeMail(composeData));
        if (ComposeMailStatus == 'success')
          toast.success('Mail sent successfully');
        else if (ComposeMailError) toast.error(ComposeMailError);
        setConfirmSendMail(false);
      }
      //}
    })();
  }, [confirmSendMail]);
  useEffect(() => {
    console.log('mail compose toast use effect');

    if (ComposeMailStatus == 'success') toast.success('Mail sent successfully');
    else if (ComposeMailError) toast.error(ComposeMailError);
    setConfirmSendMail(false);
  }, [confirmSendMail]);
  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
    setFormSubmitPending(null);
  };

  const handleConfirmDialogConfirm = async () => {
    if (formSubmitPending) {
      const res = await dispatch(
        predictMail({
          body: formSubmitPending['body']
            ? formSubmitPending['body']
            : formSubmitPending['header'],
        })
      );
    }
    handleConfirmDialogClose();
  };

  const alertHandler = () => {
    setAlertOpen(false);
  };
  return (
    <>
      <ToastContainer />
      {ComposeMailStatus == 'loading' && <Loader> </Loader>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="compose-dialog-title"
        aria-describedby="compose-dialog-description"
      >
        <Box sx={style}>
          <CloseIcon
            sx={{ alignItems: 'right', marginLeft: '100%', marginTop: '0' }}
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
                  border: 'solid 1px',
                  padding: '5px',
                  margin: '2px',
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
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              {/* <IconButton
                color="primary"
                aria-label="attach file"
                component="span"
                onClick={() => fileInputRef.current.click()}
              >
                <Tooltip title="Attachment File">
                  <AttachFileIcon />
                </Tooltip>
              </IconButton> */}
            </div>
          </form>
          <Box>
            {ComposeMailStatus == 'error' &&
              toast.success('Error while composing a mail')}
            {predictedEmailStatus == 'success' && predictedEmailIsSpamOrNot && (
              <SpamMailConfirmationDialog
                open={spamConfirmationOpen}
                setOpen={() => SpamConfirmationHandler()}
                emailData={composeData}
              ></SpamMailConfirmationDialog>
            )}
            {predictedEmailStatus == 'successwithError' && (
              <AlertButton
                open={alertOpen}
                setOpen={() => alertHandler()}
                errorMessage={` ${predictedEmailError}`}
              ></AlertButton>
            )}
          </Box>
        </Box>
      </Modal>
      <MailDataConfirmationDialog
        open={confirmDialogOpen}
        onClose={handleConfirmDialogClose}
        onConfirm={handleConfirmDialogConfirm}
        message="Send this message without a subject or text in the body?"
      />
    </>
  );
};

export default ComposeDialog;
