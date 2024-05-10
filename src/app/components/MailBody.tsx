// "use client";
// import React, { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import { height } from "@mui/system";
// import axios from "axios";
// const Inbox = () => {
//   const [mailData, setMailData] = useState([]);
//   const [show, setShow] = useState(false);
//   const creds = localStorage.getItem("my_token");
//   // console.log(creds);

//   const getMail = async () => {
//     const creds = localStorage.getItem("my_token");
//     console.log(creds);
//     const { access_token } = JSON.parse(creds);
//     const url = "http://127.0.0.1:8000/api/mailread/";
//     const queryLabel = "Inbox";
//     const accessToken = access_token;
//     const res = await axios.get(url, {
//       params: {
//         querylable: queryLabel,
//         access_token: accessToken,
//       },
//     });
//     console.log(res);
//   };
//   useEffect(() => {
//     getMail();
//   }, []);
//   // console.log("hello");

//   return (
//     // <div style={{ marginLeft: "2.9vw", width: "75vw" }}>
//     //   <img
//     //     src={refresh}
//     //     style={{
//     //       width: "1.5vw",
//     //       height: "1.5vw",
//     //       marginLeft: "1.5vw",
//     //       marginTop: "2vw",
//     //     }}
//     //   />
//     //   {props.search
//     //     ? mailData
//     //         .filter((data) => data.sender == props.search)
//     //         .map((data) => {
//     //           return (
//     //             <>
//     //               <Paper
//     //                 onMouseEnter={() => setShow(true)}
//     //                 onMouseLeave={() => setShow(false)}
//     //                 elevation={0}
//     //                 style={{
//     //                   backgroundColor: "#F8FCFF",
//     //                   borderBottom: "1px solid #EFEFEF",
//     //                   borderTop: "1px solid #EFEFEF",
//     //                 }}
//     //               >
//     //                 <ListItem>
//     //                   {data.starred ? (
//     //                     <img
//     //                       src={yellow}
//     //                       style={{
//     //                         cursor: "pointer",
//     //                         width: "1.4vw",
//     //                         height: "1.4vw",
//     //                       }}
//     //                     />
//     //                   ) : (
//     //                     <img
//     //                       onClick={() => starred(data)}
//     //                       src={star}
//     //                       style={{
//     //                         cursor: "pointer",
//     //                         width: "1.4vw",
//     //                         height: "1.4vw",
//     //                       }}
//     //                     />
//     //                   )}
//     //                   <span
//     //                     style={{
//     //                       fontSize: "1.3vw",
//     //                       marginLeft: "1.2vw",
//     //                       fontWeight: "500",
//     //                     }}
//     //                   >
//     //                     {data.sender}
//     //                     <span
//     //                       style={{
//     //                         marginLeft: "12vw",
//     //                         fontWeight: "200",
//     //                         marginLeft: "1vw",
//     //                         cursor: "pointer",
//     //                       }}
//     //                     >
//     //                       {data.email}
//     //                     </span>
//     //                   </span>
//     //                   {show && (
//     //                     <img
//     //                       onClick={() => snoozed(data)}
//     //                       src={snooze}
//     //                       style={{
//     //                         marginLeft: "1vw",
//     //                         width: "1.3vw",
//     //                         height: "1.3vw",
//     //                         cursor: "pointer",
//     //                       }}
//     //                     />
//     //                   )}
//     //                   {show && (
//     //                     <img
//     //                       onClick={() => deleteMail(data)}
//     //                       src={remove}
//     //                       style={{ width: "1.1vw", height: "1.1vw" }}
//     //                     />
//     //                   )}
//     //                 </ListItem>
//     //               </Paper>
//     //             </>
//     //           );
//     //         })
//     //     : mailData.map((data) => {
//     //         return (
//     //           <>
//     //             <Paper
//     //               onMouseEnter={() => setShow(true)}
//     //               onMouseLeave={() => setShow(false)}
//     //               elevation={0}
//     //               style={{
//     //                 backgroundColor: "#F8FCFF",
//     //                 borderBottom: "1px solid #EFEFEF",
//     //                 borderTop: "1px solid #EFEFEF",
//     //               }}
//     //             >
//     //               <ListItem>
//     //                 {data.starred ? (
//     //                   <img
//     //                     src={yellow}
//     //                     style={{
//     //                       cursor: "pointer",
//     //                       width: "1.4vw",
//     //                       height: "1.4vw",
//     //                     }}
//     //                   />
//     //                 ) : (
//     //                   <img
//     //                     onClick={() => starred(data)}
//     //                     src={star}
//     //                     style={{
//     //                       cursor: "pointer",
//     //                       width: "1.4vw",
//     //                       height: "1.4vw",
//     //                     }}
//     //                   />
//     //                 )}
//     //                 <span
//     //                   style={{
//     //                     fontSize: "1.3vw",
//     //                     marginLeft: "1.2vw",
//     //                     fontWeight: "500",
//     //                   }}
//     //                 >
//     //                   {data.sender}
//     //                   <span style={{ marginLeft: "12vw", fontWeight: "200" }}>
//     //                     {data.email}
//     //                   </span>
//     //                 </span>
//     //                 {show && (
//     //                   <img
//     //                     onClick={() => snoozed(data)}
//     //                     src={snooze}
//     //                     style={{
//     //                       marginLeft: "1vw",
//     //                       width: "1.3vw",
//     //                       height: "1.3vw",
//     //                       cursor: "pointer",
//     //                     }}
//     //                   />
//     //                 )}
//     //                 {show && (
//     //                   <img
//     //                     onClick={() => deleteMail(data)}
//     //                     src={remove}
//     //                     style={{
//     //                       width: "1.1vw",
//     //                       height: "1.1vw",
//     //                       marginLeft: "1vw",
//     //                       cursor: "pointer",
//     //                     }}
//     //                   />
//     //                 )}
//     //               </ListItem>
//     //             </Paper>
//     //           </>
//     //         );
//     //       })}

//     <h6 style={{ fontWeight: "400", marginLeft: "28vw", fontSize: "1vw" }}>
//       Terms · Privacy · Program Policies
//     </h6>
//     // </div>
//   );
// };

// export default Inbox;
