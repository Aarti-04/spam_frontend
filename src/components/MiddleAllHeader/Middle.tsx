// "use client";
// import {
//   Box,
//   Paper,
//   List,
//   ListItem,
//   Typography,
//   Checkbox,
//   Pagination,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   IconButton,
//   Menu,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import { fetchMessages } from "@/app/redux/THUNK/MESSAGE-THUNK/messageslicethunk";
// import { useDispatch, useSelector } from "react-redux";
// import Loader from "../Loader";
// import AlertButton from "../Alert";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useAppDispatch, useAppSelector } from "@/app/redux/STORE/store";
// import BodyUpperSection from "../EmailBody/BodyUpperSection";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// interface mailSectionLabelType {
//   mailSectionLabel: string;
// }

// const Middle = ({ mailSectionLabel }: mailSectionLabelType) => {
//   const [loaderOpen, setLoaderOpen] = useState<boolean>(true);
//   const [alertOpen, setAlertOpen] = useState<boolean>(true);
//   const [checked, setChecked] = useState(false);
//   const [pages, setPages] = useState<number>(0);
//   const [itemsPerPage, setItemsPerPage] = useState<number>(10);
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const { messages, messageCount, messageStatus, messageError } =
//     useAppSelector((state) => state.message);

//   const getMessageData = async (page = 1, itemsPerPage = 10) => {
//     await dispatch(
//       fetchMessages({
//         queryLabel: mailSectionLabel,
//         page,
//         itemsPerPage,
//       })
//     );
//     setPages(Math.ceil(messageCount / itemsPerPage));
//   };

//   useEffect(() => {
//     getMessageData(currentPage, itemsPerPage);
//   }, [mailSectionLabel, itemsPerPage]);

//   const handlePageChange = (
//     event: React.ChangeEvent<unknown>,
//     value: number
//   ) => {
//     setCurrentPage(value);
//     getMessageData(value, itemsPerPage);
//   };

//   const handleItemsPerPageChange: any = (
//     event: React.ChangeEvent<{ value: unknown }>
//   ) => {
//     setItemsPerPage(event.target.value as number);
//     setCurrentPage(1); // Reset to first page when items per page changes
//   };

//   const get_date_and_month = (date: any) => {
//     const dt = new Date(date);
//     const options = {
//       day: "2-digit",
//       month: "long",
//     } as Intl.DateTimeFormatOptions;
//     const formattedDate = dt.toLocaleDateString("en-US", options);
//     return formattedDate;
//   };

//   return (
//     <>
//       {messageStatus === "loading" && <Loader open={loaderOpen}></Loader>}
//       {messageStatus === "failed" && (
//         <AlertButton
//           open={alertOpen}
//           setOpen={() => setAlertOpen(!alertOpen)}
//           errorMessage={messageError}
//         ></AlertButton>
//       )}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "left",
//           overflowX: "hidden",
//           padding: "1.5rem",
//           backgroundColor: "#f0f4f9",
//         }}
//       >
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           width="100%"
//           maxWidth="800px"
//         >
//           {/* <BodyUpperSection></BodyUpperSection> */}
//           <Box display="flex" alignItems="center">
//             <RefreshIcon
//               sx={{
//                 cursor: "pointer",
//                 marginRight: "1rem", // Adjust spacing as needed
//               }}
//               onClick={() => getMessageData(currentPage, itemsPerPage)}
//             />
//             <Checkbox
//               checked={checked}
//               onChange={(event) => setChecked(event.target.checked)}
//               inputProps={{ "aria-label": "controlled" }}
//             />
//           </Box>
//           <Box display="flex" alignItems="center">
//             <Pagination
//               count={pages}
//               page={currentPage}
//               onChange={handlePageChange}
//               shape="rounded"
//               showFirstButton
//               showLastButton
//             />
//             <FormControl variant="outlined" size="small">
//               <InputLabel id="items-per-page-select-label">
//                 Items per page
//               </InputLabel>
//               <Select
//                 labelId="items-per-page-select-label"
//                 value={itemsPerPage}
//                 onChange={handleItemsPerPageChange}
//                 label="Items per page"
//               >
//                 <MenuItem value={5}>5</MenuItem>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={15}>15</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//         </Box>

//         {messages?.length > 0 &&
//           messages.map((message: any) => (
//             <Paper
//               elevation={0}
//               key={message.id}
//               sx={{
//                 width: "100%",
//                 maxWidth: "500rem",
//                 marginBottom: "1rem",
//                 padding: "1rem",
//                 borderTop: "1px solid #ccc",
//                 // border: "1px solid #ccc",
//               }}
//             >
//               <List>
//                 <ListItem>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       width: "100%",
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         marginRight: "1rem",
//                       }}
//                     >
//                       <StarBorderOutlinedIcon sx={{ marginRight: "8px" }} />
//                       <Checkbox
//                         checked={checked}
//                         onChange={(event) => setChecked(event.target.checked)}
//                         inputProps={{ "aria-label": "controlled" }}
//                         sx={{ marginRight: "8px" }}
//                       />
//                     </Box>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flex: 1,
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         overflow: "hidden",
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           display: "flex",
//                           flexDirection: "column",
//                           overflow: "hidden",
//                         }}
//                       >
//                         <Link
//                           href={`/mail/msgbody/${message.message_id}`}
//                           passHref
//                         >
//                           <Typography
//                             variant="body1"
//                             color="textPrimary"
//                             sx={{
//                               // whiteSpace: "nowrap",
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                               cursor: "pointer",
//                             }}
//                           >
//                             {mailSectionLabel == "sent"
//                               ? `To: ${message?.recipient}`
//                               : message?.sender}{" "}
//                             - {message.header ? message.header : "(No Subject)"}{" "}
//                             -{message.snippet}
//                           </Typography>
//                         </Link>
//                       </Box>
//                       <Typography
//                         variant="body1"
//                         sx={{
//                           whiteSpace: "nowrap",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           textAlign: "right",
//                           marginLeft: "1rem",
//                         }}
//                       >
//                         {get_date_and_month(message.date)}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </ListItem>
//               </List>
//             </Paper>
//           ))}
//       </Box>
//     </>
//   );
// };

// export default Middle;
import {
  Box,
  Paper,
  List,
  ListItem,
  Typography,
  Checkbox,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Menu,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import { fetchMessages } from "@/app/redux/THUNK/MESSAGE-THUNK/messageslicethunk";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import AlertButton from "../Alert";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux/STORE/store";
import BodyUpperSection from "../EmailBody/BodyUpperSection";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface mailSectionLabelType {
  mailSectionLabel: string;
}

const Middle = ({ mailSectionLabel }: mailSectionLabelType) => {
  const [loaderOpen, setLoaderOpen] = useState<boolean>(true);
  const [alertOpen, setAlertOpen] = useState<boolean>(true);
  const [checked, setChecked] = useState(false);
  const [pages, setPages] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { messages, messageCount, messageStatus, messageError } =
    useAppSelector((state) => state.message);

  const getMessageData = async (page = 1, itemsPerPage = 10) => {
    await dispatch(
      fetchMessages({
        queryLabel: mailSectionLabel,
        page,
        itemsPerPage,
      })
    );
    setPages(Math.ceil(messageCount / itemsPerPage));
  };

  useEffect(() => {
    getMessageData(currentPage, itemsPerPage);
    setCurrentPage(1);
    // setItemsPerPage(10);
  }, [mailSectionLabel, currentPage, itemsPerPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleItemsPerPageChange: any = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setItemsPerPage(event.target.value as number);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const get_date_and_month = (date: any) => {
    const dt = new Date(date);
    const options = {
      day: "2-digit",
      month: "long",
    } as Intl.DateTimeFormatOptions;
    const formattedDate = dt.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  return (
    <>
      {messageStatus === "loading" && <Loader open={loaderOpen}></Loader>}
      {messageStatus === "failed" && (
        <AlertButton
          open={alertOpen}
          setOpen={() => setAlertOpen(!alertOpen)}
          errorMessage={messageError}
        ></AlertButton>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          overflowX: "hidden",
          padding: "1.5rem",
          backgroundColor: "#f0f4f9",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          maxWidth="800px"
        >
          <Box display="flex" alignItems="center">
            <RefreshIcon
              sx={{
                cursor: "pointer",
                marginRight: "1rem", // Adjust spacing as needed
              }}
              onClick={() => getMessageData(currentPage, itemsPerPage)}
            />
            <Checkbox
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Pagination
              count={pages}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
              showFirstButton
              showLastButton
            />
            <FormControl variant="outlined" size="small">
              <InputLabel id="items-per-page-select-label">
                Items per page
              </InputLabel>
              <Select
                labelId="items-per-page-select-label"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                label="Items per page"
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {messages?.length > 0 &&
          messages.map((message: any) => (
            <Paper
              elevation={0}
              key={message.id}
              sx={{
                width: "100%",
                maxWidth: "500rem",
                marginBottom: "1rem",
                padding: "1rem",
                borderTop: "1px solid #ccc",
              }}
            >
              <List>
                <ListItem>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "1rem",
                      }}
                    >
                      <StarBorderOutlinedIcon sx={{ marginRight: "8px" }} />
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        inputProps={{ "aria-label": "controlled" }}
                        sx={{ marginRight: "8px" }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "space-between",
                        alignItems: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          overflow: "hidden",
                        }}
                      >
                        <Link
                          href={`/mail/msgbody/${message.message_id}`}
                          passHref
                        >
                          <Typography
                            variant="body1"
                            color="textPrimary"
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              cursor: "pointer",
                            }}
                          >
                            {mailSectionLabel === "sent"
                              ? `To: ${message?.recipient}`
                              : message?.sender}{" "}
                            - {message.header ? message.header : "(No Subject)"}{" "}
                            - {message.snippet}
                          </Typography>
                        </Link>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign: "right",
                          marginLeft: "1rem",
                        }}
                      >
                        {get_date_and_month(message.date)}
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
              </List>
            </Paper>
          ))}
      </Box>
    </>
  );
};

export default Middle;
