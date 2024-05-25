import Signin from "@/components/Login/Signin";
import UnAuthenticateLayout from "@/components/UserLayoutCompononets/UnAuthenticatLayout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

const LoginPage = () => {
  return (
    <main>
      <UnAuthenticateLayout></UnAuthenticateLayout>
    </main>
  );
};

export default LoginPage;
