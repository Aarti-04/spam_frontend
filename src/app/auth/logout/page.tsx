"use client";
import React, { useEffect } from "react";
// import {
//   GetAccessTokenUsingRefreshToken,
//   logoutUser,
// } from "../../redux/SLICE/UserSlice/userSlice";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/redux/THUNK/USER-THUNK/userslicethunk";
import { useAppDispatch } from "@/app/redux/STORE/store";
import Loader from "@/app/components/Loader";
const Logout = () => {
  // const dispatch = useDispatch();
  // const { user_google_cred, status, error } = useSelector((state: any) => state.user);
  // console.log(user_google_cred);

  // useEffect(() => {
  //   dispatch(GetAccessTokenUsingRefreshToken(user_google_cred['refresh_token']));
  // }, []);
  const router = useRouter();
  const dispatch: any = useAppDispatch();

  useEffect(() => {
    dispatch(logoutUser());
    console.log("logout called");

    router.push("/");
  }, []);
  return <Loader open={true}></Loader>;
};

export default Logout;
