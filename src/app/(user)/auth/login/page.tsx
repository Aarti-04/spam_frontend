import Signin from "@/components/Login/Signin";
import UnAuthenticateLayout from "@/components/UserLayoutCompononets/UnAuthenticatLayout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

const LoginPage = () => {
  return (
    <main>
      {/* <UnAuthenticateLayout></UnAuthenticateLayout> */}
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
      >
        <Signin></Signin>
      </GoogleOAuthProvider>
    </main>
  );
};

export default LoginPage;
