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
import { Box, Paper, List, ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import { fetchMessages } from "../reduxToolKit/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import EmailMessage from "../emailmessage/page";
import Loader from "./Loader";
import AlertButton from "./Alert";
import Pagination from "@mui/material/Pagination";
import MiddlePagination from "./MiddlePagination";
import { useRouter } from "next/navigation";
import MailBody1 from "./MailBody1";
import Link from "next/link";

const Middle = ({ message_data }: any) => {
  const [loaderOpen, setLoaderOpen] = useState<boolean>(true);
  const [alertOpen, setAlterOpen] = useState<boolean>(true);
  const dispatch: any = useDispatch();
  const router = useRouter();
  const [paginationPage, setPage] = React.useState(2);
  const { messages, status, error, messageCount } = useSelector(
    (state: any) => state.message
  );
  const { user_google_cred, user_token, userStatus, userError } = useSelector(
    (state: any) => state.user
  );
  const pages = Math.ceil(messageCount / 10);
  console.log(pages);

  console.log(messageCount);

  const getdata = async () => {
    await dispatch(
      fetchMessages({
        creds: user_google_cred,
        user_token: user_token,
        queryLabel: message_data,
      })
    );
  };

  useEffect(() => {
    getdata();
  }, [message_data]);

  const handlePageChange: any = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // Fetch data for the selected page
    // You might need to modify your Redux action to pass the page number as well
    dispatch(
      fetchMessages({
        creds: user_google_cred,
        user_token: user_token,
        queryLabel: message_data,
        page: value,
      })
    );
  };

  return (
    <>
      {/* Loader */}
      {/* {status === "loading" && status !== "succeeded" && (
        <Loader open={loaderOpen} loaderOpen={setLoaderOpen}></Loader>
      )} */}
      {/* Error alert */}
      {status === "failed" && status !== "succeeded" && (
        <AlertButton open={alertOpen} setOpen={setAlterOpen}></AlertButton>
      )}

      {/* Refresh icon */}
      <RefreshIcon
        sx={{
          marginTop: "1vw",
          marginLeft: "1vw",
          marginBottom: "1vw",
        }}
        onClick={() => getdata()}
      ></RefreshIcon>

      {/* Render messages */}
      <Box>
        {messages.length > 0 &&
          messages.map((message: any) => (
            <Paper
              elevation={0}
              key={message.id}
              sx={{
                borderBottom: "1px solid lightgrey",
                borderTop: "1px solid lightgrey",
                backgroundColor: "#F8FCFF",
              }}
            >
              <List>
                <Link href={`/msgbody/${message.message_id}`}>
                  <ListItem>
                    <StarBorderOutlinedIcon></StarBorderOutlinedIcon>
                    <span>{message.header}</span>
                  </ListItem>
                </Link>
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
