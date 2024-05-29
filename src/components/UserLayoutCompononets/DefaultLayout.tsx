// "use client";
// import React, { createContext, useEffect, useState } from "react";
// import SideNav from "../SideAndTopBar/SideNav";
// import { getAuthCookies } from "../../../lib/CookiStore";
// import MyWebSocketComponent from "../Socket/WebsocketComponant";
// import SearchBar from "../SideAndTopBar/SearchBar";
// import GmailComponent from "../GmailComponant";
// import { Box } from "@mui/system";
// import Loader from "../Loader";
// import UnAuthenticateLayout from "./UnAuthenticatLayout";

// //layout styles
// const containerStyle = {
//   transition: "margin-left 0.5s ease",
//   // marginttop: "20%",
// };
// const DefaultLayout = ({ children }: any) => {
//   const [open, setOpen] = useState<boolean>(true);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Handler to toggle the drawer open/close state
//   const toggleDrawer = () => {
//     setOpen(!open);
//   };
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const auth = async () => {
//     const authentication = await getAuthCookies("isAuthenticated");
//     setIsAuthenticated(authentication);
//     setLoading(false);
//   };
//   useEffect(() => {
//     auth();
//     console.log("isAuthenticatedi", isAuthenticated);
//   }, [isAuthenticated]);
//   if (loading) {
//     return (
//       <div>
//         {/* <Loader open={true}></Loader> */}
//         loading
//       </div>
//     );
//   }
//   return (
//     <>
//       {isAuthenticated == false ? (
//         <UnAuthenticateLayout></UnAuthenticateLayout>
//       ) : (
//         <>
//           <SearchBar open={open} toggleDrawer={toggleDrawer}></SearchBar>
//           <MyWebSocketComponent></MyWebSocketComponent>
//           <Box display="flex" sx={{ backgroundColor: "#f6f8fc" }}>
//             {open && <SideNav />}
//             <Box flexGrow={1} sx={containerStyle} my={1} ml={open ? 2 : 0}>
//               {children}
//             </Box>
//           </Box>
//         </>
//       )}
//     </>
//   );
// };

// export default DefaultLayout;

"use client";
import React, { useEffect, useState } from "react";
import SideNav from "../SideAndTopBar/SideNav";
import { getAuthCookies } from "../../../lib/CookiStore";
import MyWebSocketComponent from "../Socket/WebsocketComponant";
import SearchBar from "../SideAndTopBar/SearchBar";
import { Box } from "@mui/system";
import Loader from "../Loader";
import UnAuthenticateLayout from "./UnAuthenticatLayout";

// Fixed width for the sidebar
const drawerWidth = 80;

const containerStyle = {
  transition: "margin-left 0.5s ease",
};

const DefaultLayout = ({ children }: any) => {
  const [open, setOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Handler to toggle the drawer open/close state
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const auth = async () => {
    const authentication = await getAuthCookies("isAuthenticated");
    setIsAuthenticated(authentication);
    setLoading(false);
  };

  useEffect(() => {
    auth();
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <>
      {isAuthenticated == false ? (
        <UnAuthenticateLayout>{children}</UnAuthenticateLayout>
      ) : (
        <>
          <SearchBar open={open} toggleDrawer={toggleDrawer} />
          <MyWebSocketComponent />
          <Box display="flex" sx={{ backgroundColor: "#f6f8fc" }}>
            {open && <SideNav />}
            {/* Ensure SideNav is always rendered with a fixed width */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 1,
                marginLeft: open ? `${drawerWidth / 2}px` : `10px`,
                transition: "margin-left 0.5s ease",
              }}
            >
              {children}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default DefaultLayout;
