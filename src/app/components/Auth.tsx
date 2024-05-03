// "use client";
// import React, { useEffect } from "react";
// import PropTypes from "prop-types";
// import { Button } from "@mui/material";
// import axios from "axios";
// // import getConfig from "next/config";
// import {
//   GoogleLogin,
//   GoogleOAuthProvider,
//   useGoogleLogin,
// } from "@react-oauth/google";
// import LoginForm from "./Signin";
// // const { publicRuntimeConfig } = getConfig();

// const Signin = () => {
//   const googleLogin = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       console.log("Google login successful", tokenResponse);
//       console.log(tokenResponse);
//       // console.log(publicRuntimeConfig.CLIENT_ID);

//       const { data } = await axios.post("https://oauth2.googleapis.com/token", {
//         code: tokenResponse["code"],
//         client_id:
//           "189496678458-fpihrhl6pae85mhtq0tsra89cpguccja.apps.googleusercontent.com",
//         client_secret: "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",
//         redirect_uri: "http://localhost:3000",
//         grant_type: "authorization_code",
//       });

//       //   res.json(data);
//       console.log(data);
//       console.log(process.env.CLIENT_ID);

//       localStorage.setItem("my_token", JSON.stringify(data));
//       // const res = await axios.post(
//       //   'http://127.0.0.1:8000/api/google-auth-verify/',
//       //   data
//       // );
//       // console.log(res);
//     },
//     onError: () => {
//       console.error("Google login failed");
//       // Handle login errors here
//     },
//     flow: "auth-code", // Use 'auth-code' for the authorization code flow
//   });
//   const getdata = async () => {
//     if (localStorage.getItem("my_token")) {
//       const data = localStorage.getItem("my_token");
//       console.log(data);
//       // const res = await axios.post(
//       //   'http://127.0.0.1:8000/api/google-auth-verify/',
//       //   JSON.parse(data)
//       // );
//       // console.log(res);
//     }
//   };
//   useEffect(() => {
//     getdata();
//   }, []);
//   return (
//     <>
//       <div style={{ position: "absolute", left: "28%", padding: "110px" }}>
//         <div
//           style={{
//             border: "1px solid grey",
//             padding: "20px",
//             textAlign: "center",
//             borderRadius: "5px",
//             minHeight: "310px",
//             maxWidth: "350px",
//           }}
//         >
//           <img style={{ width: "70px" }} src={""} />
//           <h2 style={{ fontWeight: "200" }}>
//             Create your google clone account
//           </h2>
//           <LoginForm></LoginForm>
//           <h3 style={{ fontWeight: "200" }}>Click the signin button</h3>
//           <Button onClick={() => googleLogin()} variant="contained">
//             Signin with google
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// };

// Signin.propTypes = {};

// export default Signin;
"use client";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import LoginForm from "./Signin";
import { useDispatch, useSelector } from "react-redux";
import { TokenExchangeAndRegisterUser } from "../reduxToolKit/userSlice";
const Signin = () => {
  const dispatch: any = useDispatch();
  const { user_cred, status, error } = useSelector((state: any) => state.user);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      dispatch(TokenExchangeAndRegisterUser(tokenResponse));
    },
    onError: () => {
      console.error("Google login failed");
    },
    flow: "auth-code",
  });
  console.log(user_cred);

  // const refreshAccessToken = async () => {
  //   const refreshToken = JSON.parse(

  //     // localStorage.getItem("my_token")
  //   ).refresh_token;
  //   try {
  //     const { data } = await axios.post("https://oauth2.googleapis.com/token", {
  //       refresh_token: refreshToken,
  //       client_id:
  //         "189496678458-fpihrhl6pae85mhtq0tsra89cpguccja.apps.googleusercontent.com",
  //       client_secret: "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",
  //       grant_type: "refresh_token",
  //     });

  //     console.log(data);

  //     // Update the stored token data with the new access token
  //     localStorage.setItem("my_token", JSON.stringify(data));

  //     // Use the new access token for further API requests
  //     const accessToken = data.access_token;
  //     // Make API requests using the new access token...
  //   } catch (error) {
  //     console.error("Error refreshing access token:", error);
  //   }
  // };

  useEffect(() => {
    // console.log(user_cred);
    // Check for existing token on component mount
    // if (localStorage.getItem("my_token")) {
    //   console.log("Token found:", localStorage.getItem("my_token"));
    // }
  }, []);

  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Create Your Google Clone Account
          </Typography>
          <LoginForm />
          <Typography variant="body1" align="center" gutterBottom>
            Or sign in with
          </Typography>
          <Button
            onClick={() => googleLogin()}
            variant="contained"
            color="primary"
            fullWidth
          >
            Sign in with Google
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

Signin.propTypes = {};

export default Signin;
