"use client";
import React, { createContext, useEffect, useState } from "react";
import SideNav from "../SideAndTopBar/SideNav";
import { getAuthCookies } from "../../../lib/CookiStore";
import MyWebSocketComponent from "../Socket/WebsocketComponant";
import SearchBar from "../SideAndTopBar/SearchBar";
import GmailComponent from "../GmailComponant";
import { Box } from "@mui/system";
import Loader from "../Loader";
import UnAuthenticateLayout from "./UnAuthenticatLayout";

//layout styles
const containerStyle = {
  transition: "margin-left 0.3s ease",
  // marginttop: "20%",
  // backgroundColor: "#faf9f5",
};
const DefaultLayout = ({ children }: any) => {
  const [open, setOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  // Handler to toggle the drawer open/close state
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const auth = async () => {
    const authentication = await getAuthCookies("isAuthenticated");
    setIsAuthenticated(authentication);
    setLoading(false);
  };
  useEffect(() => {
    auth();
  }, []);
  if (loading) {
    return (
      <div>
        <Loader open={true}></Loader>
      </div>
    );
  }
  return (
    <>
      {isAuthenticated == false ? (
        <UnAuthenticateLayout></UnAuthenticateLayout>
      ) : (
        <>
          <SearchBar open={open} toggleDrawer={toggleDrawer}></SearchBar>
          <MyWebSocketComponent></MyWebSocketComponent>
          <Box display="flex">
            {open && <SideNav />}
            <Box flexGrow={1} sx={containerStyle} my={1} ml={open ? 2 : 0}>
              {children}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default DefaultLayout;
