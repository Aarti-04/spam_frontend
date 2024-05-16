import Signin from "@/app/components/Login/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

const LoginPage = () => {
  return (
    <main>
      <GoogleOAuthProvider clientId="189496678458-fpihrhl6pae85mhtq0tsra89cpguccja.apps.googleusercontent.com">
        <Signin></Signin>
      </GoogleOAuthProvider>
    </main>
  );
};

export default LoginPage;
