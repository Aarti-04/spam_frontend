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
import {
  setMailStateToInitial,
  setPredictedStateToInitial,
} from '@/app/redux/SLICE/MessageSlice/messageSlice';
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
  const [recipient, setRecipient] = useState<any>('');
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
  const SpamConfirmationHandler = async (isSendAnyWayMail: boolean = false) => {
    console.log('send any way compose', isSendAnyWayMail);

    if (isSendAnyWayMail == true) {
      console.log('sendany called');

      composeData['detected_as_spam'] = 'true';
      await dispatch(ComposeMail(composeData));
      console.log(ComposeMailStatus);

      if (ComposeMailStatus === 'success')
        toast.success('Mail Sent successfully');
    }
    // setSpamConfirmationOpen(!spamConfirmationOpen);
  };
  const handleFileChange = (e: any) => {
    setAttachment(e.target.files[0]);
  };
  const handleEmailFormSubmit = async (e: any) => {
    await e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    setComposeData(data);
    if (!data['header'] || !data['body']) {
      setConfirmDialogOpen(true);
      setFormSubmitPending(data);
    } else {
      const body = data['body'] ? data['body'] : data['header'];
      const res = await dispatch(predictMail({ body: body }));
      if (predictedEmailStatus == 'success' && !predictedEmailIsSpamOrNot) {
        await dispatch(ComposeMail(composeData));
        toast.success('Mail sent successfully');
      } else {
        setSpamConfirmationOpen(true);
      }
    }
  };
  console.log(ComposeMailStatus);
  console.log(predictedEmailIsSpamOrNot);
  console.log(predictedEmailStatus);
  useEffect(() => {
    if (ComposeMailError) toast.error(ComposeMailError);
    setConfirmSendMail(false);

    dispatch(setMailStateToInitial());
  }, [ComposeMailStatus, spamConfirmationOpen]);
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
              dispatch(setMailStateToInitial());
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
                onChange={(e: any) =>
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
            {ComposeMailStatus === 'loading' && (
              <p style={{ backgroundColor: 'blue' }}>Composing mail</p>
            )}
          </form>
          <Box>
            {ComposeMailStatus == 'error' &&
              toast.success('Error while composing a mail')}
            {predictedEmailStatus == 'success' && predictedEmailIsSpamOrNot && (
              <SpamMailConfirmationDialog
                open={spamConfirmationOpen}
                setOpen={SpamConfirmationHandler}
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
