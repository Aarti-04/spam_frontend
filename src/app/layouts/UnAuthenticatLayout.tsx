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
import LoginPage from "../auth/login/page";
const containerStyle = {
  transition: "margin-left 0.3s ease",
  backgroundColor: "#faf9f5",
};
const UnAuthenticateLayout = () => {
  return (
    <>
      <LoginPage></LoginPage>
    </>
  );
};

export default UnAuthenticateLayout;
