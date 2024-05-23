// import { List, ListItem, Paper } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
// import { Box } from "@mui/system";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import { fetchMessages } from "../reduxToolKit/messageSlice";
// import { useDispatch, useSelector } from "react-redux";
// import EmailMessage from "../emailmessage/page";
// import Loader from "./Loader";
// import AlertButton from "./Alert";
// import Pagination from "@mui/material/Pagination";
// const Middle = ({ message_data }: any) => {
//   const [loaderOpen, setLoaderOpen] = useState<boolean>(true);
//   const [alertOpen, setAlterOpen] = useState<boolean>(true);
//   const dispatch: any = useDispatch();
//   const { messages, status, error } = useSelector(
//     (state: any) => state.message
//   );
//   const { user_google_cred, user_token, userStatus, userError } = useSelector(
//     (state: any) => state.user
//   );
//   console.log(user_google_cred);
//   console.log("middle called");

//   console.log(user_token);
//   const getdata = async () => {
//     await dispatch(
//       fetchMessages({
//         creds: user_google_cred,
//         user_token: user_token,
//         queryLabel: message_data,
//       })
//     );
//   };
//   if (message_data != "Spam") {
//     useEffect(() => {
//       getdata();
//     }, [message_data]);
//   }

//   console.log(messages);
//   const setLoaderStatus = () => {
//     setLoaderOpen(!open);
//   };
//   const setAlertLoader = () => {
//     console.log("cros clicked");

//     setAlterOpen(!alertOpen);
//   };
//   console.log(status);
//   console.log(messages.length);

//   return (
//     <>
//       {status == "loading" && status !== "succeeded" && (
//         <Loader open={open} loaderOpen={setLoaderStatus}></Loader>
//       )}
//       {status == "failed" && status !== "succeeded" && (
//         <AlertButton open={alertOpen} setOpen={setAlertLoader}></AlertButton>
//       )}
//       <Box>
//         <RefreshIcon
//           sx={{
//             marginTop: "1vw",
//             marginLeft: "1vw",
//             marginBottom: "1vw",
//           }}
//           onClick={() => getdata()}
//         ></RefreshIcon>
//         {messages.length > 0 &&
//           message_data == "Spam" &&
//           messages.map((message: any) => {
//             return (
//               <>
//                 {message.spam && (
//                   <Paper
//                     elevation={0}
//                     key={message.id}
//                     sx={{
//                       borderBottom: "1px solid lightgrey",
//                       borderTop: "1px solid lightgrey",
//                       backgroundColor: "#F8FCFF",
//                     }}
//                   >
//                     <List>
//                       <ListItem>
//                         <StarBorderOutlinedIcon></StarBorderOutlinedIcon>
//                         {/* <Typography variant="body1">{messageBody}</Typography> */}
//                         <span
//                           style={{ marginLeft: "1.2vw", fontWeight: "500" }}
//                         >
//                           {message.header}
//                           <EmailMessage
//                             messageBody={message.sender}
//                           ></EmailMessage>
//                           {/* <span
//                       style={{ marginLeft: "12vw", fontWeight: "200" }}
//                     ></span> */}
//                         </span>
//                       </ListItem>
//                     </List>
//                   </Paper>
//                 )}
//               </>
//             );
//           })}
//         {messages.length > 0 &&
//           message_data !== "Spam" &&
//           messages.map((message: any) => {
//             return (
//               <Paper
//                 elevation={0}
//                 key={message.id}
//                 sx={{
//                   borderBottom: "1px solid lightgrey",
//                   borderTop: "1px solid lightgrey",
//                   backgroundColor: "#F8FCFF",
//                 }}
//               >
//                 <List>
//                   <ListItem>
//                     <StarBorderOutlinedIcon></StarBorderOutlinedIcon>
//                     {/* <Typography variant="body1">{messageBody}</Typography> */}
//                     <span style={{ marginLeft: "1.2vw", fontWeight: "500" }}>
//                       {message.header}
//                       <EmailMessage messageBody={message.sender}></EmailMessage>
//                       {/* <span
//                       style={{ marginLeft: "12vw", fontWeight: "200" }}
//                     ></span> */}
//                     </span>
//                   </ListItem>
//                 </List>
//               </Paper>
//             );
//           })}
//       </Box>
//     </>
//   );
// };

// export default Middle;
"use client";
import {
  Box,
  Paper,
  List,
  ListItem,
  Typography,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import { fetchMessages } from "@/app/redux/THUNK/MESSAGE-THUNK/messageslicethunk";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import AlertButton from "../Alert";
import Pagination from "@mui/material/Pagination";
import MiddlePagination from "./MiddlePagination";
import { useRouter } from "next/navigation";
import MailBody1 from "../EmailBody/MailBody";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux/STORE/store";
import { type } from "os";
interface mailSectionLabelType {
  mailSectionLabel: string;
}
const Middle = ({ mailSectionLabel }: mailSectionLabelType) => {
  const [loaderOpen, setLoaderOpen] = useState<boolean>(true);
  const [alertOpen, setAlterOpen] = useState<boolean>(true);
  const [checked, setChecked] = React.useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const [paginationPage, setPage] = React.useState(2);
  // const msg = useSelector((state: any) => state);
  // console.log("msg selector", msg.message);
  const { messages, messageCount, messageStatus, messageError } =
    useAppSelector((state) => state.message);
  const { userError } = useAppSelector((state) => state.user);
  // console.log(user_token);
  console.log(mailSectionLabel);

  const pages = Math.ceil(messageCount / 10);

  console.log(messages);
  console.log(messageCount);
  // console.log(messages.data);

  const getMessageData = async () => {
    await dispatch(
      fetchMessages({
        queryLabel: mailSectionLabel,
      })
    );
  };

  useEffect(() => {
    getMessageData();
  }, [mailSectionLabel]);

  const handlePageChange: any = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // Fetch data for the selected page
    // You might need to modify your Redux action to pass the page number as well
    console.log("page value", value);

    dispatch(
      fetchMessages({
        queryLabel: mailSectionLabel,
        page: value,
      })
    );
  };
  const get_date_and_month = (date: any) => {
    const dt = new Date(date);
    // Format the date as "day month"
    const options = {
      day: "2-digit",
      month: "long",
    } as Intl.DateTimeFormatOptions;
    const formattedDate = dt.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  return (
    <>
      {/* Loader */}
      {messageStatus === "loading" && <Loader open={loaderOpen}></Loader>}
      {/* Error alert */}
      {messageStatus === "failed" && (
        <AlertButton
          open={alertOpen}
          setOpen={() => setAlterOpen(!alertOpen)}
          errorMessage={messageError}
        ></AlertButton>
      )}
      {/* {userError  && (
        <AlertButton
          open={alertOpen}
          setOpen={() => setAlterOpen(!alertOpen)}
          errorMessage={userError}
        ></AlertButton>
      )} */}

      {/* Refresh icon */}
      <RefreshIcon
        sx={{
          marginTop: "1vw",
          marginLeft: "1vw",
          marginBottom: "1vw",
        }}
        onClick={() => getMessageData()}
      ></RefreshIcon>

      {/* Render messages */}
      <Box>
        {messages?.length > 0 &&
          messages.map((message: any) => (
            <Paper
              elevation={0}
              key={message.id}
              // sx={{
              //   borderBottom: "1px solid lightgrey",
              //   borderTop: "1px solid lightgrey",
              //   backgroundColor: "#F8FCFF",
              // }}
              className="border-b border-t border-gray-200 bg-blue-50"
            >
              <List className="p-2">
                <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-2">
                  <StarBorderOutlinedIcon className="mb-2 md:mb-0 md:mr-2" />
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    inputProps={{ "aria-label": "controlled" }}
                    className="mb-2 md:mb-0 md:mr-2"
                  />
                  <Link
                    href={`/mail/msgbody/${message.message_id}`}
                    className="flex-1 w-full md:w-auto"
                  >
                    <ListItem className="w-full">
                      <div className="flex flex-col md:flex-row justify-between w-full space-y-2 md:space-y-0">
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          className="whitespace-nowrap"
                        >
                          To:{message?.sender}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          className="whitespace-nowrap"
                        >
                          {message.header ? message.header : "(No Subject)"}
                        </Typography>
                        <div className="w-full md:w-auto overflow-hidden text-ellipsis whitespace-nowrap">
                          <Typography variant="body1" color="textSecondary">
                            {message.snippet}
                          </Typography>
                        </div>
                        <div className="w-full md:w-1/3 text-right">
                          <Typography variant="body1">
                            {get_date_and_month(message.date)}
                          </Typography>
                        </div>
                      </div>
                    </ListItem>
                  </Link>
                </div>
              </List>
            </Paper>
          ))}
        <Pagination
          count={pages} // Set the total number of pages
          onChange={handlePageChange} // Handle page change event
          sx={{ marginTop: "1rem" }} // Ensure pagination stays below messages
        />
      </Box>

      {/* Pagination */}
      {/* <Pagination
        count={pages} // Set the total number of pages
        onChange={handlePageChange} // Handle page change event
      /> */}
      {/* <Box sx={{ marginTop: 0, paddingTop: 0 }}>
        <MiddlePagination
          page={paginationPage}
          setPage={setPage}
        ></MiddlePagination>
      </Box> */}
    </>
  );
};

export default Middle;
