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
//     flow: "auth-code", // Use 'auth-code' htmlFor the authorization code flow
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
'use client';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import LoginForm from './LoginForm';
import { useDispatch, useSelector } from 'react-redux';
// import {  } from "../../redux/SLICE/UserSlice/userSlice";
import { useRouter } from 'next/navigation';
import { TokenExchangeAndRegisterUser } from '@/app/redux/THUNK/USER-THUNK/userslicethunk';
import { useAppSelector } from '@/app/redux/STORE/store';
import Loader from '../Loader';
import Image from 'next/image';
// import { useCookies } from 'next-client-cookies';

const Signin = () => {
  console.log('Signin called');

  const dispatch: any = useDispatch();
  const { user_google_cred, user_token, userStatus, userError } =
    useAppSelector((state: any) => state.user);
  // const cookieStore = cookies()
  const router = useRouter();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);

      await dispatch(TokenExchangeAndRegisterUser(tokenResponse));
      router.push('/mail/inbox');
    },
    onError: () => {
      console.error('Google login failed');
    },
    flow: 'auth-code',
    // scope: "https://www.googleapis.com/auth/gmail.send",
  });
  console.log(user_google_cred);
  console.log(user_token);

  // const refreshAccessToken = async () => {
  //   const refreshToken = JSON.parse(

  //     // localStorage.getItem("user_google_cred")
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

  //     // Use the new access token htmlFor further API requests
  //     const accessToken = data.access_token;
  //     // Make API requests using the new access token...
  //   } catch (error) {
  //     console.error("Error refreshing access token:", error);
  //   }
  // };
  return (
    <>
      {userStatus == 'loading' && (
        <>
          <Loader open={true}></Loader>
        </>
      )}
      {/* <Container maxWidth="sm">
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
              Login To Spam detector
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
      </Container> */}
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4">Login</h2>
          <form className="space-y-4">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="password"
                  type="password"
                  placeholder="●●●●●●●●●●"
                />
              </div>
            </div>
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Login
            </button>
            <div className="flex items-center justify-center mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => googleLogin()}
              >
                <i className="fab fa-google mr-2"></i> Login with Google
              </button>
            </div>
          </form>
          <p className="text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <a className="text-orange-500 hover:text-orange-700" href="#">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

Signin.propTypes = {};

export default Signin;
