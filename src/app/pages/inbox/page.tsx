"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../reduxToolKit/messageSlice";
import Middle from "../../components/Middle";
import { Grid } from "@mui/material";

const page = () => {
  const dispatch: any = useDispatch();
  const { messages, messageStatus, messageError } = useSelector(
    (state: any) => state.message
  );
  const { user_google_cred, userStatus, userError } = useSelector(
    (state: any) => state.user
  );

  useEffect(() => {
    dispatch(fetchMessages(user_google_cred));
  }, [dispatch]);
  return (
    <Grid item xs={12}>
      <Middle message_data={messages || []} />
    </Grid>
  );
};

export default page;
