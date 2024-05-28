// // "use client";
// // import {
// //   Box,
// //   Paper,
// //   List,
// //   ListItem,
// //   Typography,
// //   Checkbox,
// //   Pagination,
// //   Select,
// //   MenuItem,
// //   FormControl,
// //   InputLabel,
// //   IconButton,
// //   Menu,
// // } from "@mui/material";
// // import React, { useEffect, useState } from "react";
// // import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
// // import RefreshIcon from "@mui/icons-material/Refresh";
// // import { fetchMessages } from "@/app/redux/THUNK/MESSAGE-THUNK/messageslicethunk";
// // import { useDispatch, useSelector } from "react-redux";
// // import Loader from "../Loader";
// // import AlertButton from "../Alert";
// // import { useRouter } from "next/navigation";
// // import Link from "next/link";
// // import { useAppDispatch, useAppSelector } from "@/app/redux/STORE/store";
// // import BodyUpperSection from "../EmailBody/BodyUpperSection";
// // import MoreVertIcon from "@mui/icons-material/MoreVert";
// // interface mailSectionLabelType {
// //   mailSectionLabel: string;
// // }

// // const Middle = ({ mailSectionLabel }: mailSectionLabelType) => {
// //   const [loaderOpen, setLoaderOpen] = useState<boolean>(true);
// //   const [alertOpen, setAlertOpen] = useState<boolean>(true);
// //   const [checked, setChecked] = useState(false);
// //   const [pages, setPages] = useState<number>(0);
// //   const [itemsPerPage, setItemsPerPage] = useState<number>(10);
// //   const [currentPage, setCurrentPage] = useState<number>(1);

// //   const dispatch = useAppDispatch();
// //   const router = useRouter();
// //   const { messages, messageCount, messageStatus, messageError } =
// //     useAppSelector((state) => state.message);

// //   const getMessageData = async (page = 1, itemsPerPage = 10) => {
// //     await dispatch(
// //       fetchMessages({
// //         queryLabel: mailSectionLabel,
// //         page,
// //         itemsPerPage,
// //       })
// //     );
// //     setPages(Math.ceil(messageCount / itemsPerPage));
// //   };

// //   useEffect(() => {
// //     getMessageData(currentPage, itemsPerPage);
// //   }, [mailSectionLabel, itemsPerPage]);

// //   const handlePageChange = (
// //     event: React.ChangeEvent<unknown>,
// //     value: number
// //   ) => {
// //     setCurrentPage(value);
// //     getMessageData(value, itemsPerPage);
// //   };

// //   const handleItemsPerPageChange: any = (
// //     event: React.ChangeEvent<{ value: unknown }>
// //   ) => {
// //     setItemsPerPage(event.target.value as number);
// //     setCurrentPage(1); // Reset to first page when items per page changes
// //   };

// //   const get_date_and_month = (date: any) => {
// //     const dt = new Date(date);
// //     const options = {
// //       day: "2-digit",
// //       month: "long",
// //     } as Intl.DateTimeFormatOptions;
// //     const formattedDate = dt.toLocaleDateString("en-US", options);
// //     return formattedDate;
// //   };

// //   return (
// //     <>
// //       {messageStatus === "loading" && <Loader open={loaderOpen}></Loader>}
// //       {messageStatus === "failed" && (
// //         <AlertButton
// //           open={alertOpen}
// //           setOpen={() => setAlertOpen(!alertOpen)}
// //           errorMessage={messageError}
// //         ></AlertButton>
// //       )}
// //       <Box
// //         sx={{
// //           display: "flex",
// //           flexDirection: "column",
// //           alignItems: "left",
// //           overflowX: "hidden",
// //           padding: "1.5rem",
// //           backgroundColor: "#f0f4f9",
// //         }}
// //       >
// //         <Box
// //           display="flex"
// //           justifyContent="space-between"
// //           alignItems="center"
// //           width="100%"
// //           maxWidth="800px"
// //         >
// //           {/* <BodyUpperSection></BodyUpperSection> */}
// //           <Box display="flex" alignItems="center">
// //             <RefreshIcon
// //               sx={{
// //                 cursor: "pointer",
// //                 marginRight: "1rem", // Adjust spacing as needed
// //               }}
// //               onClick={() => getMessageData(currentPage, itemsPerPage)}
// //             />
// //             <Checkbox
// //               checked={checked}
// //               onChange={(event) => setChecked(event.target.checked)}
// //               inputProps={{ "aria-label": "controlled" }}
// //             />
// //           </Box>
// //           <Box display="flex" alignItems="center">
// //             <Pagination
// //               count={pages}
// //               page={currentPage}
// //               onChange={handlePageChange}
// //               shape="rounded"
// //               showFirstButton
// //               showLastButton
// //             />
// //             <FormControl variant="outlined" size="small">
// //               <InputLabel id="items-per-page-select-label">
// //                 Items per page
// //               </InputLabel>
// //               <Select
// //                 labelId="items-per-page-select-label"
// //                 value={itemsPerPage}
// //                 onChange={handleItemsPerPageChange}
// //                 label="Items per page"
// //               >
// //                 <MenuItem value={5}>5</MenuItem>
// //                 <MenuItem value={10}>10</MenuItem>
// //                 <MenuItem value={15}>15</MenuItem>
// //               </Select>
// //             </FormControl>
// //           </Box>
// //         </Box>

// //         {messages?.length > 0 &&
// //           messages.map((message: any) => (
// //             <Paper
// //               elevation={0}
// //               key={message.id}
// //               sx={{
// //                 width: "100%",
// //                 maxWidth: "500rem",
// //                 marginBottom: "1rem",
// //                 padding: "1rem",
// //                 borderTop: "1px solid #ccc",
// //                 // border: "1px solid #ccc",
// //               }}
// //             >
// //               <List>
// //                 <ListItem>
// //                   <Box
// //                     sx={{
// //                       display: "flex",
// //                       alignItems: "center",
// //                       width: "100%",
// //                     }}
// //                   >
// //                     <Box
// //                       sx={{
// //                         display: "flex",
// //                         alignItems: "center",
// //                         marginRight: "1rem",
// //                       }}
// //                     >
// //                       <StarBorderOutlinedIcon sx={{ marginRight: "8px" }} />
// //                       <Checkbox
// //                         checked={checked}
// //                         onChange={(event) => setChecked(event.target.checked)}
// //                         inputProps={{ "aria-label": "controlled" }}
// //                         sx={{ marginRight: "8px" }}
// //                       />
// //                     </Box>
// //                     <Box
// //                       sx={{
// //                         display: "flex",
// //                         flex: 1,
// //                         justifyContent: "space-between",
// //                         alignItems: "center",
// //                         overflow: "hidden",
// //                       }}
// //                     >
// //                       <Box
// //                         sx={{
// //                           display: "flex",
// //                           flexDirection: "column",
// //                           overflow: "hidden",
// //                         }}
// //                       >
// //                         <Link
// //                           href={`/mail/msgbody/${message.message_id}`}
// //                           passHref
// //                         >
// //                           <Typography
// //                             variant="body1"
// //                             color="textPrimary"
// //                             sx={{
// //                               // whiteSpace: "nowrap",
// //                               overflow: "hidden",
// //                               textOverflow: "ellipsis",
// //                               cursor: "pointer",
// //                             }}
// //                           >
// //                             {mailSectionLabel == "sent"
// //                               ? `To: ${message?.recipient}`
// //                               : message?.sender}{" "}
// //                             - {message.header ? message.header : "(No Subject)"}{" "}
// //                             -{message.snippet}
// //                           </Typography>
// //                         </Link>
// //                       </Box>
// //                       <Typography
// //                         variant="body1"
// //                         sx={{
// //                           whiteSpace: "nowrap",
// //                           overflow: "hidden",
// //                           textOverflow: "ellipsis",
// //                           textAlign: "right",
// //                           marginLeft: "1rem",
// //                         }}
// //                       >
// //                         {get_date_and_month(message.date)}
// //                       </Typography>
// //                     </Box>
// //                   </Box>
// //                 </ListItem>
// //               </List>
// //             </Paper>
// //           ))}
// //       </Box>
// //     </>
// //   );
// // };

// // export default Middle;
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
  Grid,
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
  const { userStatus } = useAppSelector((state) => state.user);

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
    console.log("use effect called");
    console.log("hey inbox");

    getMessageData(currentPage, itemsPerPage);
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
      {/* {messageStatus === "loading" && <Loader open={loaderOpen}></Loader>} */}
      {userStatus == "loading" && (
        <>
          {/* <Loader open={true}></Loader> */}
          sign in loading
        </>
      )}
      {messageStatus == "loading" && <p>Middle loading</p>}
      {messageStatus == "failed" && (
        <AlertButton
          open={alertOpen}
          setOpen={() => setAlertOpen(!alertOpen)}
          errorMessage={messageError}
        ></AlertButton>
      )}
      {messageStatus === "success" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            overflowX: "hidden",
            padding: "1.7rem",
            backgroundColor: "white",
            borderRadius: "20px",
            margin: "10px",
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
                  marginBottom: "0.2rem",
                  padding: "0.2rem",
                  borderTop: "1px solid #ccc",
                  // height: "50px",
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
                              -{" "}
                              {message.header ? message.header : "(No Subject)"}{" "}
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
      )}
      {messageStatus == "failed" && <Box>{messageError}</Box>}
    </>
  );
};

export default Middle;
// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';

// const columns = [
//   { id: 'date', label: 'Date', minWidth: 100 },
//   { id: 'subject', label: 'Subject', minWidth: 200 },
//   { id: 'from', label: 'From', minWidth: 150 },
//   { id: 'to', label: 'To', minWidth: 150 },
//   { id: 'star', label: 'Star', minWidth: 50 },
// ];

// function createData(date, subject, from, to, star) {
//   return { date, subject, from, to, star };
// }

// const rows = [
//   createData(
//     '24-MAY-2024',
//     'HDFC Securities CONSOLIDATED Statement for Acc No S294510',
//     'HDFC Sec Ltd',
//     'vishva9412@gmail.com',
//     false
//   ),
//   createData(
//     '23-MAY-2024',
//     'HDFC Securities CONSOLIDATED Statement for Acc No S294510',
//     'HDFC Sec Ltd',
//     'vishva9412@gmail.com',
//     true
//   ),
//   createData(
//     '22-MAY-2024',
//     'HDFC Bank InstaAler. 2',
//     'HDFC Bank',
//     'vishva9412@gmail.com',
//     false
//   ),
//   createData(
//     '21-MAY-2024',
//     'Account update for your HDFC Bank A/c',
//     'HDFC Bank',
//     'vishva9412@gmail.com',
//     false
//   ),
//   createData(
//     '20-MAY-2024',
//     'Transaction OTP',
//     'HDFC Bank',
//     'vishva9412@gmail.com',
//     false
//   ),
// ];

// export default function StickyHeadTable() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event: any, newPage: any) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: any) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <>
//       <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//         <TableContainer sx={{ maxHeight: 440 }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell
//                     key={column.id}
//                     align={column.align}
//                     style={{
//                       minWidth: column.minWidth,
//                       backgroundColor: '#f5f5f5',
//                     }}
//                   >
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row: any) => {
//                   return (
//                     <TableRow
//                       hover
//                       role="checkbox"
//                       tabIndex={-1}
//                       key={row.code}
//                     >
//                       {columns.map((column) => {
//                         const value = row[column.id];
//                         return (
//                           <TableCell key={column.id} align={column.align}>
//                             {column.format && typeof value === 'number'
//                               ? column.format(value)
//                               : value}
//                           </TableCell>
//                         );
//                       })}
//                     </TableRow>
//                   );
//                 })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </>
//   );
// }
