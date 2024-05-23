"use client";
import React, { createContext, useEffect, useState } from "react";
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
import UnAuthenticateLayout from "./UnAuthenticatLayout";

// Define the layout styles
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const auth = async () => {
    const authentication = await getAuthCookies("isAuthenticated");
    setIsAuthenticated(authentication);
  };
  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
    auth();
  });
  return (
    <>
      {isAuthenticated == false ? (
        <UnAuthenticateLayout></UnAuthenticateLayout>
      ) : (
        <>
          <SearchBar open={open} toggleDrawer={toggleDrawer}></SearchBar>
          <MyWebSocketComponent></MyWebSocketComponent>
          <Box display="flex">
            <SideNav open={open} />
            <Box flexGrow={1} sx={containerStyle} ml={open ? 2 : 0}>
              {children}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default DefaultLayout;
