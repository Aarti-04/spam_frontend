"use client";
import React, { useEffect } from "react";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import {
  GetAccessTokenUsingRefreshToken,
  logoutUser,
} from "../../redux/SLICE/UserSlice/userSlice";
import logout from "../../redux/SLICE/UserSlice/userSlice";
import { useRouter } from "next/navigation";
const Logout = () => {
  // const dispatch = useDispatch();
  // const { user_google_cred, status, error } = useSelector((state: any) => state.user);
  // console.log(user_google_cred);

  // useEffect(() => {
  //   dispatch(GetAccessTokenUsingRefreshToken(user_google_cred['refresh_token']));
  // }, []);
  const router = useRouter();
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
    router.push("/");
  }, []);
  console.log(messages);
  return <div>page</div>;
};

export default Logout;
