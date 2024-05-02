"use client";
import React, { useEffect } from "react";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { TokenExchange, GetAccessToken } from "../../reduxToolKit/userSlice";
import logout from "../../reduxToolKit/userSlice";
const Logout = () => {
  const dispatch = useDispatch();
  const { user_cred, status, error } = useSelector((state: any) => state.user);
  console.log(user_cred);

  useEffect(() => {
    dispatch(GetAccessToken(user_cred["refresh_token"]));
  }, []);
  return <div>page</div>;
};

export default Logout;
