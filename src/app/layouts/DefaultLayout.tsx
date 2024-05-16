// // "use client";
// // import React, { useEffect } from "react";
// // import { AppBar, Toolbar, Typography, Container, Grid } from "@mui/material";
// // import { styled } from "@mui/system";
// // import SideNav from "../components/SideNav";
// // import Middle from "../components/Middle";
// // import { useDispatch, useSelector } from "react-redux";
// // import { fetchMessages } from "../reduxToolKit/messageSlice";

// // const DefaultLayout: React.FC = ({ children }: any) => {
// //   const dispatch: any = useDispatch();
// //   const { messages, messageStatus, messageError } = useSelector(
// //     (state: any) => state.message
// //   );
// //   const { user_google_cred, userStatus, userError } = useSelector(
// //     (state: any) => state.user
// //   );

// //   useEffect(() => {
// //     // dispatch(fetchMessages(user_google_cred));
// //   }, [dispatch]);
// //   console.log(messages);
// //   console.log(user_google_cred);
// //   console.log(Object.keys(user_google_cred).length);

// //   return (
// //     <>
// //       {/* <Auth></Auth> */}
// //       {/* <Container sx={{ backgroundColor: "blue", marginTop: "10vh" }}> */}
// //       <Grid container>
// //         <Grid item xs={12} md={3}>
// //           <SideNav />
// //         </Grid>
// //         <Grid item xs={12} md={9}>
// //           <Grid container justifyContent="center">
// //             <Grid item xs={12} md={9} sx={{ backgroundColor: "red", mx: 30 }}>
// //               <Middle message_data={messages} />
// //             </Grid>
// //           </Grid>
// //         </Grid>
// //       </Grid>
// //       {/* </Container> */}
// //     </>
// //   );
// // };

// // export default DefaultLayout;

// // // const Main = styled('main')(({ theme }) => ({
// // //   flexGrow: 1,
// // //   [theme.breakpoints.up('md')]: {
// // //     marginLeft: '20rem',
// // //   },
// // // }));

// "use client";
// import React, { useEffect } from "react";
// import SideNav from "../components/SideNav";
// import Middle from "../components/Middle";
// import { AppBar, Toolbar, Typography, Container, Grid } from "@mui/material";
// import { Box } from "@mui/system";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMessages } from "../reduxToolKit/messageSlice";
// import { usePathname, useRouter } from "next/navigation";
// const appBarStyles = {
//   position: "fixed",
// };

// const mainContainerStyles = {
//   marginTop: "75px", // Adjust this value according to your app bar height
//   display: "flex",
//   marginLeft: "0px",
//   height: "calc(100vh - 64px)", // Adjust this value according to your app bar height
// };

// const contentContainerStyles = {
//   flexGrow: 1,
// };

// const contentGridStyles = {};

// const DefaultLayout: React.FC = ({ children }: any) => {
//   // const dispatch: any = useDispatch();
//   // const { messages, messageStatus, messageError } = useSelector(
//   //   (state: any) => state.message
//   // );
//   // const { user_google_cred, userStatus, userError } = useSelector(
//   //   (state: any) => state.user
//   // );

//   // useEffect(() => {
//   //   dispatch(fetchMessages({ creds: user_google_cred, queryLabel: "inbox" }));
//   // }, []);
//   // console.log(messages);
//   const router = useRouter();

//   // console.log(user_google_cred);
//   const renderMiddleContent = (): any => {
//     const pathname = usePathname();
//     console.log(pathname);

//     switch (pathname) {
//       case "/":
//         return <Middle message_data="inbox"></Middle>;
//       case "/inbox" || "/":
//         return <Middle message_data="inbox"></Middle>;
//       case "/spam":
//         return <Middle message_data="spam"></Middle>;
//       case "/allmail":
//         return <Middle message_data="All Mail"></Middle>;
//       case "/sent":
//         return <Middle message_data="Sent"></Middle>;
//       case "/login":
//         return router.push("/auth/login");
//       default:
//         return <p>not found</p>;
//     }
//   };
//   return (
//     <>
//       <AppBar position="fixed" sx={appBarStyles}>
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Gmail1
//           </Typography>
//           {/* Add other app bar contents here */}
//         </Toolbar>
//       </AppBar>
//       <Box sx={mainContainerStyles}>
//         <SideNav />
//         <Grid
//           display="flex"
//           container
//           justifyContent="center"
//           sx={contentContainerStyles}
//         >
//           <Grid item xs={12}>
//             {renderMiddleContent()}
//             {/* <Middle message_data={messages || []} /> */}
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default DefaultLayout;
"use client";
import React, { createContext, useState } from "react";
import SideNav from "../components/SideAndTopBar/SideNav";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { getAuthCookies } from "../../../lib/CookiStore";
import MyWebSocketComponent from "../components/Socket/WebsocketComponant";
import SearchBar from "../components/SideAndTopBar/SearchBar";
import SideBar from "../components/SideBar";
import GmailComponent from "../components/GmailComponant";
import { Box } from "@mui/system";
import { Provider } from "react-redux";
import { Paper } from "@mui/material";
// import {makeStyles} from "@mui/styles"

// Define the layout styles
const MainContent = styled("div")({
  flex: 1,

  // transition: "margin-left 0.3 ease-in-out", // Adjust padding as needed
});

const containerStyle = {
  transition: "margin-left 0.3s ease",
  backgroundColor: "#faf9f5",
};
const DefaultLayout = ({ children }: any) => {
  const [open, setOpen] = useState<boolean>(true);

  // Handler to toggle the drawer open/close state
  const toggleDrawer = () => {
    console.log("called from search bar");

    setOpen(!open);
  };

  const router = useRouter();
  let isAuthenticated = "";
  const auth = async () => {
    isAuthenticated = await getAuthCookies("isAuthenticated");
    console.log(isAuthenticated);
    console.log("isAuthenticated", isAuthenticated);
    if (isAuthenticated == "false" || !isAuthenticated) {
      router.push("/auth/login");
    }
  };
  React.useEffect(() => {
    auth();
  }, [isAuthenticated]); // const marginLeft = open ? "10rem" : "0.5rem";
  return (
    <>
      {/* <SideBar open={open}></SideBar> */}

      <SearchBar open={open} toggleDrawer={toggleDrawer}></SearchBar>
      <Box display="flex">
        <SideNav open={open} />
        <Box flexGrow={1} sx={containerStyle} ml={open ? 2 : 0}>
          <MyWebSocketComponent></MyWebSocketComponent>

          {children}
        </Box>
      </Box>
    </>
  );
};

export default DefaultLayout;
