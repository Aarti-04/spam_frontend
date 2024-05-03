"use client";
import React, { useEffect } from "react";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import {
  GetAccessTokenUsingRefreshToken,
  logoutUser,
} from "../../reduxToolKit/userSlice";
import logout from "../../reduxToolKit/userSlice";
const Logout = () => {
  // const dispatch = useDispatch();
  // const { user_google_cred, status, error } = useSelector((state: any) => state.user);
  // console.log(user_google_cred);

  // useEffect(() => {
  //   dispatch(GetAccessTokenUsingRefreshToken(user_google_cred['refresh_token']));
  // }, []);
  const dispatch: any = useDispatch();
  const { messages, messageStatus, messageError } = useSelector(
    (state: any) => state.message
  );
  const { user_google_cred, user_token, userStatus, userError } = useSelector(
    (state: any) => state.user
  );
  console.log(user_token);

  useEffect(() => {
    dispatch(logoutUser(user_token));
  }, []);
  console.log(messages);
  return <div>page</div>;
};

export default Logout;
