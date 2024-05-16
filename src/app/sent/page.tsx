"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../redux/SLICE/MessageSlice/messageSlice";
import Middle from "../components/MiddleAllHeader/Middle";

const page = () => {
  const dispatch: any = useDispatch();
  const { messages, messageStatus, messageError } = useSelector(
    (state: any) => state.message
  );
  const { user_google_cred, userStatus, userError } = useSelector(
    (state: any) => state.user
  );

  return <div>{/* <Middle message_data={messages || []}></Middle> */}</div>;
};

export default page;
