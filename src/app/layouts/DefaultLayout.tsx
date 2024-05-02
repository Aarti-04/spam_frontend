// "use client";
// import React, { useEffect } from "react";
// import { AppBar, Toolbar, Typography, Container, Grid } from "@mui/material";
// import { styled } from "@mui/system";
// import SideNav from "../components/SideNav";
// import Middle from "../components/Middle";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMessages } from "../reduxToolKit/messageSlice";

// const DefaultLayout: React.FC = ({ children }: any) => {
//   const dispatch: any = useDispatch();
//   const { messages, messageStatus, messageError } = useSelector(
//     (state: any) => state.message
//   );
//   const { user_cred, userStatus, userError } = useSelector(
//     (state: any) => state.user
//   );

//   useEffect(() => {
//     // dispatch(fetchMessages(user_cred));
//   }, [dispatch]);
//   console.log(messages);
//   console.log(user_cred);
//   console.log(Object.keys(user_cred).length);

//   return (
//     <>
//       {/* <Auth></Auth> */}
//       {/* <Container sx={{ backgroundColor: "blue", marginTop: "10vh" }}> */}
//       <Grid container>
//         <Grid item xs={12} md={3}>
//           <SideNav />
//         </Grid>
//         <Grid item xs={12} md={9}>
//           <Grid container justifyContent="center">
//             <Grid item xs={12} md={9} sx={{ backgroundColor: "red", mx: 30 }}>
//               <Middle message_data={messages} />
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//       {/* </Container> */}
//     </>
//   );
// };

// export default DefaultLayout;

// // const Main = styled('main')(({ theme }) => ({
// //   flexGrow: 1,
// //   [theme.breakpoints.up('md')]: {
// //     marginLeft: '20rem',
// //   },
// // }));

"use client";
import React, { useEffect } from "react";
import SideNav from "../components/SideNav";
import Middle from "../components/Middle";
import { AppBar, Toolbar, Typography, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../reduxToolKit/messageSlice";
const appBarStyles = {
  position: "fixed",
};

const mainContainerStyles = {
  marginTop: "75px", // Adjust this value according to your app bar height
  display: "flex",
  marginLeft: "0px",
  height: "calc(100vh - 64px)", // Adjust this value according to your app bar height
};

const contentContainerStyles = {
  flexGrow: 1,
};

const contentGridStyles = {};

const DefaultLayout: React.FC = ({ children }: any) => {
  const dispatch: any = useDispatch();
  const { messages, messageStatus, messageError } = useSelector(
    (state: any) => state.message
  );
  const { user_cred, userStatus, userError } = useSelector(
    (state: any) => state.user
  );

  useEffect(() => {
    dispatch(fetchMessages(user_cred));
  }, [dispatch]);
  // console.log(user_cred);

  return (
    <>
      <AppBar position="fixed" sx={appBarStyles}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gmail1
          </Typography>
          {/* Add other app bar contents here */}
        </Toolbar>
      </AppBar>
      <Box sx={mainContainerStyles}>
        <SideNav />
        <Grid
          display="flex"
          container
          justifyContent="center"
          sx={contentContainerStyles}
        >
          <Grid item xs={12} sx={contentGridStyles}>
            <Middle message_data={messages || []} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DefaultLayout;
