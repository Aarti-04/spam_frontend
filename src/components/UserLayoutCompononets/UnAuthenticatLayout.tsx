import LoginPage from "@/app/(user)/auth/login/page";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import Signin from "../Login/Signin";

const UnAuthenticateLayout = ({ children }: any) => {
  return (
    <>
      {/* <LoginPage></LoginPage> */}
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
      >
        <Signin></Signin>
        {/* <h1>hello</h1> */}
      </GoogleOAuthProvider>
    </>
  );
};

export default UnAuthenticateLayout;
